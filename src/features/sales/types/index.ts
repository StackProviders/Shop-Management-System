export interface SaleItem {
    itemId: string
    itemName: string
    quantity: number
    price: number
    discount?: number
    taxRate?: number
    total: number
}

export interface SaleItemRow extends SaleItem {
    id: string
    serialNo?: string | string[]
    colour?: string
    material?: string
    warranty?: { label: string; days: number }
    unit?: string
    [key: string]: unknown
}

export interface Sale {
    id: string
    shopId: string
    invoiceNumber: string
    partyId?: string
    partyName?: string
    items: SaleItem[]
    subtotal: number
    discount: number
    tax: number
    total: number
    paymentStatus: 'paid' | 'unpaid' | 'partial'
    paymentMethod?: 'cash' | 'card' | 'upi' | 'other'
    notes?: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateSaleData {
    partyId?: string
    partyName?: string
    items: SaleItem[]
    discount?: number
    paymentStatus: 'paid' | 'unpaid' | 'partial'
    paymentMethod?: 'cash' | 'card' | 'upi' | 'other'
    notes?: string
}
