import { useFirestore } from 'reactfire'
import { useCrudOperations } from '@/features/shared'
import type { Sale, CreateSaleData } from '../types'
import {
    runTransaction,
    doc,
    collection,
    serverTimestamp,
    query,
    where,
    getDocs,
    type DocumentReference,
    type DocumentData,
    type FieldValue
} from 'firebase/firestore'
import type {
    Item,
    SerialNumber,
    StockTransaction
} from '@/features/items/types'

export function useSaleMutations(shopId: string) {
    const { update, remove } = useCrudOperations<Sale>('sales', shopId)

    const db = useFirestore() // ReactFire hook

    const createSale = async (data: CreateSaleData) => {
        // Pre-fetch Serial Number Document References (to get IDs)
        // We do this before the transaction because we need to query by fields to find the ID,
        // and queries inside transactions are limited/complex for dynamic lists.
        const serialDocRefs: Record<string, DocumentReference[]> = {}

        for (const item of data.items) {
            if (item.serialNo && item.itemId) {
                const serials = Array.isArray(item.serialNo)
                    ? item.serialNo
                    : [item.serialNo]
                if (serials.length === 0) continue

                // Firestore 'in' query supports up to 10 items. Batching needed if > 10.
                const q = query(
                    collection(db, 'serialNumbers'),
                    where('shopId', '==', shopId),
                    where('itemId', '==', item.itemId),
                    where('serialNo', 'in', serials)
                )

                const snapshot = await getDocs(q)
                const refs = snapshot.docs.map((d) => d.ref)

                // Validate we found all serials
                if (snapshot.size !== serials.length) {
                    const foundSerials = new Set(
                        snapshot.docs.map((d) => d.data().serialNo)
                    )
                    const missing = serials.filter((s) => !foundSerials.has(s))
                    throw new Error(
                        `Serial numbers not found for ${item.itemName}: ${missing.join(', ')}`
                    )
                }

                serialDocRefs[item.itemId] = refs
            }
        }

        return await runTransaction(db, async (transaction) => {
            // =========================================
            // PHASE 1: READS (Must be done first)
            // =========================================
            const itemReads: {
                ref: DocumentReference
                data: Item
                saleItemIndex: number
            }[] = []
            const serialReads: {
                ref: DocumentReference
                data: SerialNumber
                saleItemIndex: number
            }[] = []

            for (let i = 0; i < data.items.length; i++) {
                const item = data.items[i]

                // 1. Read Item Data
                if (item.itemId) {
                    const itemRef = doc(db, 'items', item.itemId)
                    const itemDoc = await transaction.get(itemRef)
                    if (!itemDoc.exists()) {
                        throw new Error(`Item ${item.itemName} not found`)
                    }
                    itemReads.push({
                        ref: itemRef,
                        data: itemDoc.data() as Item,
                        saleItemIndex: i
                    })
                }

                // 2. Read Serial Data
                if (item.serialNo && item.itemId) {
                    const refs = serialDocRefs[item.itemId] || []
                    for (const ref of refs) {
                        const serialDoc = await transaction.get(ref)
                        if (!serialDoc.exists()) {
                            throw new Error(`Serial number document missing`)
                        }
                        serialReads.push({
                            ref,
                            data: serialDoc.data() as SerialNumber,
                            saleItemIndex: i
                        })
                    }
                }
            }

            // =========================================
            // PHASE 2: LOGIC & PREPARATION
            // =========================================
            const invoiceNumber =
                data.invoiceNumber ||
                `INV-${Math.floor(100000 + Math.random() * 900000)}`
            const subtotal = data.items.reduce(
                (sum, item) => sum + item.total,
                0
            )
            const discount = data.discount || 0
            const tax = data.items.reduce((sum, item) => {
                const taxAmount = item.total * ((item.taxRate || 0) / 100)
                return sum + taxAmount
            }, 0)
            const total = subtotal - discount + tax

            // Prepare Sale Document
            const saleRef = doc(collection(db, 'sales'))
            const saleData: Sale = {
                id: saleRef.id,
                shopId,
                ...data,
                invoiceNumber,
                subtotal,
                discount,
                tax,
                total,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            // Prepare Updates
            const stockUpdates: { ref: DocumentReference; newStock: number }[] =
                []
            const transactionLogs: DocumentData[] = []
            const serialUpdates: {
                ref: DocumentReference
                updates: { isSold: boolean; soldAt: FieldValue; saleId: string }
            }[] = []

            // A. Process Stock Deductions
            for (const read of itemReads) {
                const saleItem = data.items[read.saleItemIndex]
                const itemData = read.data

                if (itemData.stockManagement) {
                    const newStock = itemData.currentStock - saleItem.quantity
                    if (newStock < 0) {
                        throw new Error(
                            `Insufficient stock for ${saleItem.itemName}. Available: ${itemData.currentStock}`
                        )
                    }
                    stockUpdates.push({ ref: read.ref, newStock })

                    // Prepare Stock Log
                    const stockTransRef = doc(
                        collection(db, 'stockTransactions')
                    )
                    const stockTrans: StockTransaction = {
                        id: stockTransRef.id,
                        shopId,
                        itemId: saleItem.itemId,
                        quantity: saleItem.quantity,
                        type: 'Sale',
                        pricePerUnit: saleItem.price,
                        invoiceRef: invoiceNumber,
                        partyName: data.partyName,
                        createdAt: new Date()
                    }
                    transactionLogs.push({
                        ref: stockTransRef,
                        data: stockTrans
                    })
                }
            }

            // B. Process Serial Updates
            for (const read of serialReads) {
                const saleItem = data.items[read.saleItemIndex]
                if (read.data.isSold) {
                    throw new Error(
                        `Serial number ${read.data.serialNo} for ${saleItem.itemName} is already sold.`
                    )
                }
                serialUpdates.push({
                    ref: read.ref,
                    updates: {
                        isSold: true,
                        soldAt: serverTimestamp(),
                        saleId: saleRef.id
                    }
                })
            }

            // =========================================
            // PHASE 3: WRITES (Atomic Commit)
            // =========================================

            // 1. Update Stock
            for (const update of stockUpdates) {
                transaction.update(update.ref, {
                    currentStock: update.newStock
                })
            }

            // 2. Create Transaction Logs
            for (const log of transactionLogs) {
                transaction.set(log.ref, {
                    ...log.data,
                    createdAt: serverTimestamp(),
                    date: serverTimestamp()
                })
            }

            // 3. Update Serials
            for (const update of serialUpdates) {
                transaction.update(update.ref, update.updates)
            }

            // 4. Create Sale
            const cleanSaleData = JSON.parse(JSON.stringify(saleData))
            transaction.set(saleRef, {
                ...cleanSaleData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })

            return saleRef.id
        })
    }

    return { createSale, updateSale: update, deleteSale: remove }
}
