import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import type { ItemSettings } from '../types/settings'

export function useItemSettings(shopId: string) {
    const firestore = useFirestore()
    const settingsRef = doc(firestore, 'itemSettings', shopId)

    const { status, data } = useFirestoreDocData(settingsRef, {
        idField: 'id'
    })

    return {
        settings: (data as ItemSettings) || getDefaultSettings(shopId),
        isLoading: status === 'loading'
    }
}

function getDefaultSettings(shopId: string): ItemSettings {
    return {
        id: shopId,
        shopId,
        serialNoTracking: false,
        mrpPrice: false,
        customFields: false,
        description: true,
        category: true,
        barcodeScan: false,
        wholesalePrice: false,
        customFieldSettings: {
            colour: true,
            material: true,
            mfgDate: true,
            expDate: true,
            size: true,
            brand: true,
            warranty: false
        },
        warrantyPeriods: ['1-year', '2-years'],
        customWarrantyPeriods: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
