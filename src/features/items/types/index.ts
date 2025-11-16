export type ItemType = 'product' | 'service'

export interface CustomField {
    name: string
    value: string
    printInInvoice: boolean
}

export * from './serial-number'
export * from './stock-transaction'

export interface Item {
    id: string
    shopId: string
    name: string
    itemCode: string
    type: ItemType
    salePrice: number
    purchasePrice: number
    mrp?: number
    categories: string[]
    unit: string
    images: string[]
    stockManagement: boolean
    currentStock: number
    openingStock: number
    minStockAlert: number
    barcode?: string
    description?: string
    taxRate?: number
    customFields?: CustomField[]
    serialNoTracking?: boolean
    status?: 'draft' | 'active' | 'inactive'
    createdAt: Date
    updatedAt: Date
}

export interface Category {
    id: string
    shopId: string
    name: string
    sortOrder: number
    createdAt: Date
}

export interface Unit {
    id: string
    shopId: string
    fullName: string
    shortName: string
    createdAt: Date
}

export interface CreateItemData {
    name: string
    itemCode?: string
    type: ItemType
    salePrice: number
    purchasePrice: number
    mrp?: number
    categories?: string[]
    unit?: string
    description?: string
    stockManagement?: boolean
    openingStock?: number
    minStockAlert?: number
    barcode?: string
    taxRate?: number
}

export interface CreateCategoryData {
    name: string
    sortOrder?: number
}

export interface CreateUnitData {
    fullName: string
    shortName: string
}
