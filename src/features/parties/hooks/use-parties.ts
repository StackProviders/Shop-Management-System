import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Party } from '../types'

export function useParties(shopId: string) {
    const [parties, setParties] = useState<Party[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!shopId) {
            setParties([])
            setIsLoading(false)
            return
        }

        const q = query(
            collection(db, 'parties'),
            where('shopId', '==', shopId)
        )

        const unsubscribe = onSnapshot(
            q,
            { includeMetadataChanges: true },
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate()
                })) as Party[]

                setParties(data.sort((a, b) => a.name.localeCompare(b.name)))
                setIsLoading(false)
                setError(null)
            },
            (err) => {
                setError(err)
                setIsLoading(false)
            }
        )

        return () => unsubscribe()
    }, [shopId])

    return {
        parties,
        isLoading,
        error,
        refresh: () => {}
    }
}
