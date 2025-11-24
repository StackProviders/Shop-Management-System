import { useFirestoreCollectionData } from 'reactfire'
import { stockTransactionsQueries } from '../api/stock-transactions.api'
import type { StockTransaction } from '../types/stock-transaction'
import { useMemo } from 'react'
import { Timestamp } from 'firebase/firestore'

export function useStockTransactions(shopId: string, itemId: string) {
    const q = stockTransactionsQueries.byItem(shopId, itemId)

    const { status, data } = useFirestoreCollectionData(q, {
        idField: 'id'
    })

    const filteredTransactions = useMemo(
        () =>
            ((data as StockTransaction[]) ?? [])
                .filter((t) => t.shopId === shopId)
                .sort((a, b) => {
                    const dateA =
                        a.createdAt instanceof Timestamp
                            ? a.createdAt.toDate()
                            : new Date(a.createdAt)
                    const dateB =
                        b.createdAt instanceof Timestamp
                            ? b.createdAt.toDate()
                            : new Date(b.createdAt)
                    return dateB.getTime() - dateA.getTime()
                }),
        [data, shopId]
    )

    return {
        transactions: filteredTransactions,
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
