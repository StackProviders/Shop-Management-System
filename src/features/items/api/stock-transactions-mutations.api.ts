import { collection, doc, Timestamp, getFirestore } from 'firebase/firestore'
import { setDocWithTimeout } from '@/lib/firestore-utils'
import type { StockTransactionType } from '../types/stock-transaction'

export const createStockTransaction = async (
    shopId: string,
    itemId: string,
    type: StockTransactionType,
    quantity: number,
    pricePerUnit: number,
    options?: {
        invoiceRef?: string
        partyName?: string
        status?: 'Paid' | 'Unpaid' | 'Partial'
    }
) => {
    const db = getFirestore()
    const newDocRef = doc(collection(db, 'stockTransactions'))
    await setDocWithTimeout(newDocRef, {
        shopId,
        itemId,
        type,
        quantity,
        pricePerUnit,
        invoiceRef: options?.invoiceRef || '',
        partyName: options?.partyName || type,
        status: options?.status || '',
        createdAt: Timestamp.now()
    })
    return newDocRef.id
}
