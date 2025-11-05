export interface CustomWarrantyPeriod {
    label: string
    days: number
}

export interface CustomFieldName {
    name: string
    printInInvoice: boolean
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
        brandPrintInInvoice: boolean
        warrantyPrintInInvoice: boolean
    }
    warrantyPeriods: string[]
    customWarrantyPeriods: CustomWarrantyPeriod[]
    customFieldNames?: CustomFieldName[]
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
        brandPrintInInvoice?: boolean
        warrantyPrintInInvoice?: boolean
    }
    warrantyPeriods?: string[]
    customWarrantyPeriods?: CustomWarrantyPeriod[]
    customFieldNames?: CustomFieldName[]
}
