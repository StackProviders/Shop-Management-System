// ============= COMPLETE DATA MODELS =============
// This file contains all TypeScript interfaces for the Shop Management System

// ============= CORE TYPES =============
export type ShopRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer'
export type ItemType = 'product' | 'service'
export type PartyType = 'customer' | 'supplier' | 'both'
export type PaymentStatus = 'paid' | 'partial' | 'unpaid'
export type TransactionStatus = 'draft' | 'confirmed' | 'cancelled'
export type PaymentMethod =
    | 'cash'
    | 'card'
    | 'upi'
    | 'bank_transfer'
    | 'cheque'
    | 'other'
export type DiscountType = 'fixed' | 'percentage'
export type StockTransactionType =
    | 'purchase'
    | 'sale'
    | 'adjustment'
    | 'opening'
    | 'return'
    | 'transfer'
export type SerialNumberStatus = 'in_stock' | 'sold' | 'returned' | 'damaged'
export type LocationType = 'warehouse' | 'store' | 'godown' | 'other'
export type AccountType =
    | 'asset'
    | 'liability'
    | 'equity'
    | 'income'
    | 'expense'
export type NotificationType =
    | 'low_stock'
    | 'payment_due'
    | 'payment_received'
    | 'system'
    | 'custom'
export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

// ============= SHOP =============
export interface Shop {
    id: string
    shopName: string
    email?: string
    phoneNumber?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    website?: string
    description?: string
    logo?: string
    ownerId: string
    settings: ShopSettings
    createdAt: Date
    updatedAt: Date
}

export interface ShopSettings {
    currency: string
    timezone: string
    dateFormat: string
    fiscalYearStart: string
    taxEnabled: boolean
    multiLocationEnabled: boolean
    lowStockAlertEnabled: boolean
}

export interface CreateShopData {
    shopName: string
    email?: string
    phoneNumber?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
}

// ============= ITEMS =============
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
    position?: string
    serialNumberTracking: boolean
    barcode?: string
    customFields?: Record<string, string | number | boolean | Date>
    description?: string
    taxRate?: number
    hsnCode?: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateItemData {
    name: string
    itemCode: string
    type: ItemType
    salePrice: number
    purchasePrice: number
    mrp?: number
    categories?: string[]
    unit: string
    images?: string[]
    stockManagement?: boolean
    openingStock?: number
    minStockAlert?: number
    position?: string
    serialNumberTracking?: boolean
    barcode?: string
    customFields?: Record<string, string | number | boolean | Date>
    description?: string
    taxRate?: number
    hsnCode?: string
}

export interface UpdateItemData extends Partial<CreateItemData> {
    currentStock?: number
}

// ============= CATEGORIES =============
export interface Category {
    id: string
    shopId: string
    name: string
    parentId?: string
    description?: string
    image?: string
    sortOrder: number
    createdAt: Date
}

export interface CreateCategoryData {
    name: string
    parentId?: string
    description?: string
    image?: string
    sortOrder?: number
}

// ============= STOCK =============
export interface StockTransaction {
    id: string
    shopId: string
    itemId: string
    locationId?: string
    type: StockTransactionType
    quantity: number
    balanceAfter: number
    referenceType?: string
    referenceId?: string
    serialNumbers?: string[]
    unitPrice: number
    totalAmount: number
    notes?: string
    createdAt: Date
    createdBy: string
}

export interface SerialNumber {
    id: string
    shopId: string
    itemId: string
    serialNumber: string
    status: SerialNumberStatus
    locationId?: string
    purchaseId?: string
    purchaseDate: Date
    purchasePrice: number
    saleId?: string
    saleDate?: Date
    salePrice?: number
    warranty?: {
        startDate: Date
        endDate: Date
        terms?: string
    }
    createdAt: Date
    updatedAt: Date
}

export interface StockAdjustment {
    id: string
    shopId: string
    locationId?: string
    adjustmentNumber: string
    items: StockAdjustmentItem[]
    reason: 'damaged' | 'expired' | 'lost' | 'found' | 'correction' | 'other'
    notes?: string
    createdAt: Date
    createdBy: string
}

export interface StockAdjustmentItem {
    itemId: string
    itemName: string
    currentStock: number
    adjustedStock: number
    difference: number
    serialNumbers?: string[]
}

export interface StockTransfer {
    id: string
    shopId: string
    transferNumber: string
    fromLocationId: string
    toLocationId: string
    items: StockTransferItem[]
    status: 'pending' | 'in_transit' | 'completed' | 'cancelled'
    notes?: string
    createdAt: Date
    createdBy: string
    completedAt?: Date
    completedBy?: string
}

export interface StockTransferItem {
    itemId: string
    itemName: string
    quantity: number
    serialNumbers?: string[]
}

// ============= PARTIES =============
export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

export interface Party {
    id: string
    shopId: string
    type: PartyType
    name: string
    companyName?: string
    email?: string
    phoneNumber: string
    alternatePhone?: string
    gstin?: string
    pan?: string
    billingAddress: Address
    shippingAddress?: Address
    openingBalance: number
    currentBalance: number
    creditLimit?: number
    creditDays?: number
    notes?: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
}

export interface CreatePartyData {
    type: PartyType
    name: string
    companyName?: string
    email?: string
    phoneNumber: string
    alternatePhone?: string
    gstin?: string
    pan?: string
    billingAddress: Address
    shippingAddress?: Address
    openingBalance?: number
    creditLimit?: number
    creditDays?: number
    notes?: string
    tags?: string[]
}

// ============= SALES =============
export interface TaxDetail {
    name: string
    rate: number
    amount: number
}

export interface SaleItem {
    itemId: string
    itemName: string
    itemCode: string
    quantity: number
    unit: string
    unitPrice: number
    discount: number
    discountType: DiscountType
    tax: number
    taxRate: number
    total: number
    serialNumbers?: string[]
    barcode?: string
}

export interface Sale {
    id: string
    shopId: string
    locationId?: string
    saleNumber: string
    invoiceNumber?: string
    partyId?: string
    partyName?: string
    items: SaleItem[]
    subtotal: number
    discount: number
    discountType: DiscountType
    tax: number
    taxDetails: TaxDetail[]
    shippingCharges: number
    otherCharges: number
    roundOff: number
    total: number
    paymentStatus: PaymentStatus
    paidAmount: number
    dueAmount: number
    dueDate?: Date
    paymentMethod?: string
    notes?: string
    termsAndConditions?: string
    status: TransactionStatus
    createdAt: Date
    createdBy: string
    updatedAt: Date
}

export interface CreateSaleData {
    partyId?: string
    partyName?: string
    items: Omit<SaleItem, 'total'>[]
    discount?: number
    discountType?: DiscountType
    shippingCharges?: number
    otherCharges?: number
    paidAmount?: number
    dueDate?: Date
    paymentMethod?: string
    notes?: string
    termsAndConditions?: string
}

// ============= PURCHASES =============
export interface PurchaseItem {
    itemId: string
    itemName: string
    itemCode: string
    quantity: number
    unit: string
    unitPrice: number
    discount: number
    discountType: DiscountType
    tax: number
    taxRate: number
    total: number
    serialNumbers?: string[]
}

export interface Purchase {
    id: string
    shopId: string
    locationId?: string
    purchaseNumber: string
    billNumber?: string
    partyId?: string
    partyName?: string
    items: PurchaseItem[]
    subtotal: number
    discount: number
    discountType: DiscountType
    tax: number
    taxDetails: TaxDetail[]
    shippingCharges: number
    otherCharges: number
    roundOff: number
    total: number
    paymentStatus: PaymentStatus
    paidAmount: number
    dueAmount: number
    dueDate?: Date
    paymentMethod?: string
    notes?: string
    status: TransactionStatus
    createdAt: Date
    createdBy: string
    updatedAt: Date
}

export interface CreatePurchaseData {
    partyId?: string
    partyName?: string
    billNumber?: string
    items: Omit<PurchaseItem, 'total'>[]
    discount?: number
    discountType?: DiscountType
    shippingCharges?: number
    otherCharges?: number
    paidAmount?: number
    dueDate?: Date
    paymentMethod?: string
    notes?: string
}

// ============= QUOTATIONS =============
export interface QuotationItem {
    itemId: string
    itemName: string
    description?: string
    quantity: number
    unit: string
    unitPrice: number
    discount: number
    tax: number
    total: number
}

export interface Quotation {
    id: string
    shopId: string
    quotationNumber: string
    partyId?: string
    partyName?: string
    items: QuotationItem[]
    subtotal: number
    discount: number
    tax: number
    total: number
    validUntil: Date
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'converted'
    convertedToSaleId?: string
    notes?: string
    termsAndConditions?: string
    createdAt: Date
    createdBy: string
    updatedAt: Date
}

export interface CreateQuotationData {
    partyId?: string
    partyName?: string
    items: Omit<QuotationItem, 'total'>[]
    discount?: number
    validUntil: Date
    notes?: string
    termsAndConditions?: string
}

// ============= PAYMENTS =============
export interface Payment {
    id: string
    shopId: string
    paymentNumber: string
    type: 'payment_in' | 'payment_out'
    partyId?: string
    partyName?: string
    amount: number
    paymentMethod: PaymentMethod
    paymentDate: Date
    referenceNumber?: string
    referenceType?: 'sale' | 'purchase' | 'expense'
    referenceId?: string
    notes?: string
    attachments?: string[]
    createdAt: Date
    createdBy: string
}

export interface CreatePaymentData {
    type: 'payment_in' | 'payment_out'
    partyId?: string
    partyName?: string
    amount: number
    paymentMethod: PaymentMethod
    paymentDate: Date
    referenceNumber?: string
    referenceType?: 'sale' | 'purchase' | 'expense'
    referenceId?: string
    notes?: string
    attachments?: string[]
}

// ============= EXPENSES =============
export interface RecurringConfig {
    frequency: RecurringFrequency
    interval: number
    startDate: Date
    endDate?: Date
    nextDate: Date
}

export interface Expense {
    id: string
    shopId: string
    expenseNumber: string
    categoryId: string
    categoryName: string
    amount: number
    paymentMethod: string
    expenseDate: Date
    partyId?: string
    partyName?: string
    description?: string
    notes?: string
    attachments?: string[]
    recurring: boolean
    recurringConfig?: RecurringConfig
    createdAt: Date
    createdBy: string
}

export interface ExpenseCategory {
    id: string
    shopId: string
    name: string
    description?: string
    parentId?: string
    createdAt: Date
}

export interface CreateExpenseData {
    categoryId: string
    amount: number
    paymentMethod: string
    expenseDate: Date
    partyId?: string
    description?: string
    notes?: string
    attachments?: string[]
    recurring?: boolean
    recurringConfig?: RecurringConfig
}

// ============= RETURNS =============
export interface ReturnItem {
    itemId: string
    itemName: string
    quantity: number
    unitPrice: number
    tax: number
    total: number
    serialNumbers?: string[]
}

export interface SaleReturn {
    id: string
    shopId: string
    returnNumber: string
    saleId: string
    saleNumber: string
    partyId?: string
    partyName?: string
    items: ReturnItem[]
    subtotal: number
    tax: number
    total: number
    refundAmount: number
    refundMethod: string
    reason: string
    notes?: string
    status: 'pending' | 'completed' | 'cancelled'
    createdAt: Date
    createdBy: string
}

export interface PurchaseReturn {
    id: string
    shopId: string
    returnNumber: string
    purchaseId: string
    purchaseNumber: string
    partyId?: string
    partyName?: string
    items: ReturnItem[]
    subtotal: number
    tax: number
    total: number
    refundAmount: number
    reason: string
    notes?: string
    status: 'pending' | 'completed' | 'cancelled'
    createdAt: Date
    createdBy: string
}

export interface CreateSaleReturnData {
    saleId: string
    items: Omit<ReturnItem, 'total'>[]
    refundAmount: number
    refundMethod: string
    reason: string
    notes?: string
}

export interface CreatePurchaseReturnData {
    purchaseId: string
    items: Omit<ReturnItem, 'total'>[]
    refundAmount: number
    reason: string
    notes?: string
}

// ============= LOCATIONS =============
export interface Location {
    id: string
    shopId: string
    name: string
    type: LocationType
    address?: Address
    contactPerson?: string
    phoneNumber?: string
    email?: string
    isDefault: boolean
    createdAt: Date
}

export interface CreateLocationData {
    name: string
    type: LocationType
    address?: Address
    contactPerson?: string
    phoneNumber?: string
    email?: string
    isDefault?: boolean
}

// ============= TAXES =============
export interface TaxComponent {
    name: string
    rate: number
}

export interface Tax {
    id: string
    shopId: string
    name: string
    rate: number
    type: 'percentage' | 'fixed'
    isDefault: boolean
    components?: TaxComponent[]
    createdAt: Date
}

export interface CreateTaxData {
    name: string
    rate: number
    type: 'percentage' | 'fixed'
    isDefault?: boolean
    components?: TaxComponent[]
}

// ============= PRICING RULES =============
export interface PricingRule {
    id: string
    shopId: string
    name: string
    type: 'bulk' | 'customer_specific' | 'promotional'
    itemIds?: string[]
    categoryIds?: string[]
    partyIds?: string[]
    minQuantity?: number
    discountType: DiscountType
    discountValue: number
    validFrom: Date
    validUntil?: Date
    isActive: boolean
    priority: number
    createdAt: Date
}

export interface CreatePricingRuleData {
    name: string
    type: 'bulk' | 'customer_specific' | 'promotional'
    itemIds?: string[]
    categoryIds?: string[]
    partyIds?: string[]
    minQuantity?: number
    discountType: DiscountType
    discountValue: number
    validFrom: Date
    validUntil?: Date
    priority?: number
}

// ============= ACCOUNTING =============
export interface Account {
    id: string
    shopId: string
    accountCode: string
    accountName: string
    accountType: AccountType
    parentId?: string
    openingBalance: number
    currentBalance: number
    description?: string
    isSystem: boolean
    createdAt: Date
}

export interface JournalEntryLine {
    accountId: string
    accountName: string
    debit: number
    credit: number
    description?: string
}

export interface JournalEntry {
    id: string
    shopId: string
    entryNumber: string
    entryDate: Date
    referenceType?: string
    referenceId?: string
    description: string
    entries: JournalEntryLine[]
    totalDebit: number
    totalCredit: number
    status: 'draft' | 'posted'
    createdAt: Date
    createdBy: string
}

export interface CreateAccountData {
    accountCode: string
    accountName: string
    accountType: AccountType
    parentId?: string
    openingBalance?: number
    description?: string
}

export interface CreateJournalEntryData {
    entryDate: Date
    referenceType?: string
    referenceId?: string
    description: string
    entries: JournalEntryLine[]
}

// ============= NOTIFICATIONS =============
export interface Notification {
    id: string
    shopId: string
    userId: string
    type: NotificationType
    title: string
    message: string
    data?: Record<string, string | number | boolean>
    isRead: boolean
    createdAt: Date
}

export interface CreateNotificationData {
    userId: string
    type: NotificationType
    title: string
    message: string
    data?: Record<string, string | number | boolean>
}

// ============= SETTINGS =============
export interface CustomFieldDefinition {
    id: string
    name: string
    type: 'text' | 'number' | 'date' | 'dropdown'
    required: boolean
    options?: string[]
}

export interface ItemSettings {
    id: string
    shopId: string
    enableDescription: boolean
    enableMRP: boolean
    enableBarcode: boolean
    enableCustomFields: boolean
    enableSerialNumbers: boolean
    customFields: CustomFieldDefinition[]
    defaultUnit: string
    autoGenerateItemCode: boolean
    itemCodePrefix: string
    updatedAt: Date
}

export interface UpdateItemSettingsData {
    enableDescription?: boolean
    enableMRP?: boolean
    enableBarcode?: boolean
    enableCustomFields?: boolean
    enableSerialNumbers?: boolean
    customFields?: CustomFieldDefinition[]
    defaultUnit?: string
    autoGenerateItemCode?: boolean
    itemCodePrefix?: string
}

// ============= REPORTS =============
export interface DateRange {
    startDate: Date
    endDate: Date
}

export interface SalesReportData {
    totalSales: number
    totalItems: number
    totalTax: number
    totalDiscount: number
    netSales: number
    salesByDate: { date: string; amount: number }[]
    topItems: { itemName: string; quantity: number; amount: number }[]
    topCustomers: { partyName: string; amount: number }[]
}

export interface StockReportData {
    totalItems: number
    totalValue: number
    lowStockItems: Item[]
    outOfStockItems: Item[]
    stockByCategory: { categoryName: string; quantity: number; value: number }[]
}

export interface ProfitLossData {
    revenue: number
    costOfGoodsSold: number
    grossProfit: number
    expenses: number
    netProfit: number
    profitMargin: number
}
