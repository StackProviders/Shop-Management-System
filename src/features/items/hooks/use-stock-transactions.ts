import { useFirestoreCollectionData } from 'reactfire'
import { stockTransactionsQueries } from '../api/stock-transactions.api'
import type { StockTransaction } from '../types/stock-transaction'
import { useMemo } from 'react'

export function useStockTransactions(shopId: string, itemId: string) {
    const q = stockTransactionsQueries.byItem(shopId, itemId)

    const { status, data } = useFirestoreCollectionData(q, {
        idField: 'id'
    })

    const filteredTransactions = useMemo(
        () =>
            ((data as StockTransaction[]) ?? [])
                .filter((t) => t.shopId === shopId)
                .sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                ),
        [data, shopId]
    )

    return {
        transactions: filteredTransactions,
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
