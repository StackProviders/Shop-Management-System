import { collection, query, where, getFirestore } from 'firebase/firestore'

export const stockTransactionsQueries = {
    byItem: (shopId: string, itemId: string) => {
        const db = getFirestore()
        return query(
            collection(db, 'stockTransactions'),
            where('itemId', '==', itemId)
        )
    }
}
