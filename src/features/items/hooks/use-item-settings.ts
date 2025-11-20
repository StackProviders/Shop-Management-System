import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import type { ItemSettings } from '../types/settings'

export function useItemSettings(shopId: string) {
    const firestore = useFirestore()

    // Use a dummy ref when shopId is missing to satisfy Rules of Hooks without crashing
    const refId = shopId || 'fallback'
    const settingsRef = doc(firestore, 'itemSettings', refId)

    const { status, data } = useFirestoreDocData(settingsRef, {
        idField: 'id'
    })

    if (!shopId) {
        return {
            settings: getDefaultSettings(''),
            isLoading: false
        }
    }

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
            warranty: false,
            brandPrintInInvoice: false,
            warrantyPrintInInvoice: false
        },
        warrantyPeriods: ['1-year', '2-years'],
        customWarrantyPeriods: [],
        customFieldNames: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
