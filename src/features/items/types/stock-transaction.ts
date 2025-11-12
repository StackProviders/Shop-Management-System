export type StockTransactionType =
    | 'Opening Stock'
    | 'Purchase'
    | 'Sale'
    | 'Adjustment'

export interface StockTransaction {
    id: string
    shopId: string
    itemId: string
    type: StockTransactionType
    quantity: number
    pricePerUnit: number
    invoiceRef?: string
    partyName?: string
    status?: 'Paid' | 'Unpaid' | 'Partial'
    createdAt: Date
}
