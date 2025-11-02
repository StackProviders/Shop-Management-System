export interface CustomWarrantyPeriod {
    label: string
    days: number
}

export interface ItemSettings {
    id: string
    shopId: string
    serialNoTracking: boolean
    mrpPrice: boolean
    customFields: boolean
    description: boolean
    category: boolean
    barcodeScan: boolean
    wholesalePrice: boolean
    customFieldSettings: {
        colour: boolean
        material: boolean
        mfgDate: boolean
        expDate: boolean
        size: boolean
        brand: boolean
        warranty: boolean
    }
    warrantyPeriods: string[]
    customWarrantyPeriods: CustomWarrantyPeriod[]
    createdAt: Date
    updatedAt: Date
}

export interface UpdateItemSettingsData {
    serialNoTracking?: boolean
    mrpPrice?: boolean
    customFields?: boolean
    description?: boolean
    category?: boolean
    barcodeScan?: boolean
    wholesalePrice?: boolean
    customFieldSettings?: {
        colour?: boolean
        material?: boolean
        mfgDate?: boolean
        expDate?: boolean
        size?: boolean
        brand?: boolean
        warranty?: boolean
    }
    warrantyPeriods?: string[]
    customWarrantyPeriods?: CustomWarrantyPeriod[]
}
