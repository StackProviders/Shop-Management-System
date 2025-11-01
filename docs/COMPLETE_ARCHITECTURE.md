# COMPLETE SHOP MANAGEMENT SYSTEM ARCHITECTURE

## 📊 COMPLETE DATABASE SCHEMA

### Core Collections

```typescript
// ============= SHOPS =============
interface Shop {
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

interface ShopSettings {
    currency: string
    timezone: string
    dateFormat: string
    fiscalYearStart: string
    taxEnabled: boolean
    multiLocationEnabled: boolean
    lowStockAlertEnabled: boolean
}

// ============= ITEMS =============
interface Item {
    id: string
    shopId: string
    name: string
    itemCode: string
    type: 'product' | 'service'
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
    customFields?: Record<string, any>
    description?: string
    taxRate?: number
    hsnCode?: string
    createdAt: Date
    updatedAt: Date
}

// ============= CATEGORIES =============
interface Category {
    id: string
    shopId: string
    name: string
    parentId?: string
    description?: string
    image?: string
    sortOrder: number
    createdAt: Date
}

// ============= STOCK TRANSACTIONS =============
interface StockTransaction {
    id: string
    shopId: string
    itemId: string
    locationId?: string
    type: 'purchase' | 'sale' | 'adjustment' | 'opening' | 'return' | 'transfer'
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

// ============= SERIAL NUMBERS =============
interface SerialNumber {
    id: string
    shopId: string
    itemId: string
    serialNumber: string
    status: 'in_stock' | 'sold' | 'returned' | 'damaged'
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

// ============= PARTIES =============
interface Party {
    id: string
    shopId: string
    type: 'customer' | 'supplier' | 'both'
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

interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

// ============= SALES =============
interface Sale {
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
    discountType: 'fixed' | 'percentage'
    tax: number
    taxDetails: TaxDetail[]
    shippingCharges: number
    otherCharges: number
    roundOff: number
    total: number
    paymentStatus: 'paid' | 'partial' | 'unpaid'
    paidAmount: number
    dueAmount: number
    dueDate?: Date
    paymentMethod?: string
    notes?: string
    termsAndConditions?: string
    status: 'draft' | 'confirmed' | 'cancelled'
    createdAt: Date
    createdBy: string
    updatedAt: Date
}

interface SaleItem {
    itemId: string
    itemName: string
    itemCode: string
    quantity: number
    unit: string
    unitPrice: number
    discount: number
    discountType: 'fixed' | 'percentage'
    tax: number
    taxRate: number
    total: number
    serialNumbers?: string[]
    barcode?: string
}

interface TaxDetail {
    name: string
    rate: number
    amount: number
}

// ============= PURCHASES =============
interface Purchase {
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
    discountType: 'fixed' | 'percentage'
    tax: number
    taxDetails: TaxDetail[]
    shippingCharges: number
    otherCharges: number
    roundOff: number
    total: number
    paymentStatus: 'paid' | 'partial' | 'unpaid'
    paidAmount: number
    dueAmount: number
    dueDate?: Date
    paymentMethod?: string
    notes?: string
    status: 'draft' | 'confirmed' | 'cancelled'
    createdAt: Date
    createdBy: string
    updatedAt: Date
}

interface PurchaseItem {
    itemId: string
    itemName: string
    itemCode: string
    quantity: number
    unit: string
    unitPrice: number
    discount: number
    discountType: 'fixed' | 'percentage'
    tax: number
    taxRate: number
    total: number
    serialNumbers?: string[]
}

// ============= QUOTATIONS =============
interface Quotation {
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

interface QuotationItem {
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

// ============= PAYMENTS =============
interface Payment {
    id: string
    shopId: string
    paymentNumber: string
    type: 'payment_in' | 'payment_out'
    partyId?: string
    partyName?: string
    amount: number
    paymentMethod:
        | 'cash'
        | 'card'
        | 'upi'
        | 'bank_transfer'
        | 'cheque'
        | 'other'
    paymentDate: Date
    referenceNumber?: string
    referenceType?: 'sale' | 'purchase' | 'expense'
    referenceId?: string
    notes?: string
    attachments?: string[]
    createdAt: Date
    createdBy: string
}

// ============= EXPENSES =============
interface Expense {
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

interface ExpenseCategory {
    id: string
    shopId: string
    name: string
    description?: string
    parentId?: string
    createdAt: Date
}

interface RecurringConfig {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
    interval: number
    startDate: Date
    endDate?: Date
    nextDate: Date
}

// ============= RETURNS =============
interface SaleReturn {
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

interface PurchaseReturn {
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

interface ReturnItem {
    itemId: string
    itemName: string
    quantity: number
    unitPrice: number
    tax: number
    total: number
    serialNumbers?: string[]
}

// ============= STOCK ADJUSTMENTS =============
interface StockAdjustment {
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

interface StockAdjustmentItem {
    itemId: string
    itemName: string
    currentStock: number
    adjustedStock: number
    difference: number
    serialNumbers?: string[]
}

// ============= STOCK TRANSFERS =============
interface StockTransfer {
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

interface StockTransferItem {
    itemId: string
    itemName: string
    quantity: number
    serialNumbers?: string[]
}

// ============= LOCATIONS =============
interface Location {
    id: string
    shopId: string
    name: string
    type: 'warehouse' | 'store' | 'godown' | 'other'
    address?: Address
    contactPerson?: string
    phoneNumber?: string
    email?: string
    isDefault: boolean
    createdAt: Date
}

// ============= TAXES =============
interface Tax {
    id: string
    shopId: string
    name: string
    rate: number
    type: 'percentage' | 'fixed'
    isDefault: boolean
    components?: TaxComponent[]
    createdAt: Date
}

interface TaxComponent {
    name: string
    rate: number
}

// ============= PRICING RULES =============
interface PricingRule {
    id: string
    shopId: string
    name: string
    type: 'bulk' | 'customer_specific' | 'promotional'
    itemIds?: string[]
    categoryIds?: string[]
    partyIds?: string[]
    minQuantity?: number
    discountType: 'percentage' | 'fixed'
    discountValue: number
    validFrom: Date
    validUntil?: Date
    isActive: boolean
    priority: number
    createdAt: Date
}

// ============= ACCOUNTING =============
interface Account {
    id: string
    shopId: string
    accountCode: string
    accountName: string
    accountType: 'asset' | 'liability' | 'equity' | 'income' | 'expense'
    parentId?: string
    openingBalance: number
    currentBalance: number
    description?: string
    isSystem: boolean
    createdAt: Date
}

interface JournalEntry {
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

interface JournalEntryLine {
    accountId: string
    accountName: string
    debit: number
    credit: number
    description?: string
}

// ============= NOTIFICATIONS =============
interface Notification {
    id: string
    shopId: string
    userId: string
    type: 'low_stock' | 'payment_due' | 'payment_received' | 'system' | 'custom'
    title: string
    message: string
    data?: Record<string, any>
    isRead: boolean
    createdAt: Date
}

// ============= SETTINGS =============
interface ItemSettings {
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

interface CustomFieldDefinition {
    id: string
    name: string
    type: 'text' | 'number' | 'date' | 'dropdown'
    required: boolean
    options?: string[]
}
```

## 🏗️ FIRESTORE COLLECTION STRUCTURE

```
shops/{shopId}
├── settings: ShopSettings

items/{itemId}
├── shopId (indexed)
├── barcode (indexed)
├── itemCode (indexed)

categories/{categoryId}
├── shopId (indexed)

stockTransactions/{transactionId}
├── shopId (indexed)
├── itemId (indexed)

serialNumbers/{serialNumberId}
├── shopId (indexed)
├── itemId (indexed)
├── serialNumber (indexed)

parties/{partyId}
├── shopId (indexed)
├── type (indexed)

sales/{saleId}
├── shopId (indexed)
├── partyId (indexed)
├── saleNumber (indexed)

purchases/{purchaseId}
├── shopId (indexed)
├── partyId (indexed)

quotations/{quotationId}
├── shopId (indexed)
├── status (indexed)

payments/{paymentId}
├── shopId (indexed)
├── partyId (indexed)
├── type (indexed)

expenses/{expenseId}
├── shopId (indexed)
├── categoryId (indexed)

expenseCategories/{categoryId}
├── shopId (indexed)

saleReturns/{returnId}
├── shopId (indexed)
├── saleId (indexed)

purchaseReturns/{returnId}
├── shopId (indexed)
├── purchaseId (indexed)

stockAdjustments/{adjustmentId}
├── shopId (indexed)

stockTransfers/{transferId}
├── shopId (indexed)
├── fromLocationId (indexed)
├── toLocationId (indexed)

locations/{locationId}
├── shopId (indexed)

taxes/{taxId}
├── shopId (indexed)

pricingRules/{ruleId}
├── shopId (indexed)
├── isActive (indexed)

accounts/{accountId}
├── shopId (indexed)
├── accountType (indexed)

journalEntries/{entryId}
├── shopId (indexed)
├── status (indexed)

notifications/{notificationId}
├── shopId (indexed)
├── userId (indexed)
├── isRead (indexed)

itemSettings/{shopId}
```

## 📋 COMPOSITE INDEXES REQUIRED

```typescript
// items
shopId ASC, type ASC, createdAt DESC
shopId ASC, categories ARRAY, createdAt DESC
shopId ASC, currentStock ASC, stockManagement ASC
shopId ASC, barcode ASC
shopId ASC, itemCode ASC

// stockTransactions
shopId ASC, itemId ASC, createdAt DESC
shopId ASC, type ASC, createdAt DESC
shopId ASC, locationId ASC, createdAt DESC

// serialNumbers
shopId ASC, itemId ASC, status ASC
shopId ASC, serialNumber ASC
shopId ASC, status ASC, createdAt DESC

// parties
shopId ASC, type ASC, name ASC
shopId ASC, currentBalance ASC

// sales
shopId ASC, createdAt DESC
shopId ASC, partyId ASC, createdAt DESC
shopId ASC, paymentStatus ASC, createdAt DESC
shopId ASC, status ASC, createdAt DESC

// purchases
shopId ASC, createdAt DESC
shopId ASC, partyId ASC, createdAt DESC
shopId ASC, paymentStatus ASC, createdAt DESC

// payments
shopId ASC, type ASC, createdAt DESC
shopId ASC, partyId ASC, createdAt DESC

// expenses
shopId ASC, categoryId ASC, createdAt DESC
shopId ASC, expenseDate DESC

// quotations
shopId ASC, status ASC, createdAt DESC
shopId ASC, validUntil ASC

// notifications
shopId ASC, userId ASC, isRead ASC, createdAt DESC
```

## 🎯 COMPLETE FEATURE STRUCTURE

```
src/features/
├── auth/                    # ✅ Implemented
├── shop/                    # ✅ Implemented
├── shared/                  # ✅ Implemented
│
├── inventory/               # 🔄 In Progress
│   ├── api/
│   │   ├── items.api.ts
│   │   ├── categories.api.ts
│   │   ├── stock-transactions.api.ts
│   │   ├── serial-numbers.api.ts
│   │   ├── adjustments.api.ts
│   │   ├── transfers.api.ts
│   │   └── settings.api.ts
│   ├── components/
│   │   ├── items/
│   │   ├── stock/
│   │   ├── categories/
│   │   └── settings/
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── parties/                 # ⏳ To Implement
│   ├── api/
│   │   └── parties.api.ts
│   ├── components/
│   │   ├── party-list.tsx
│   │   ├── party-form.tsx
│   │   ├── party-details.tsx
│   │   └── party-ledger.tsx
│   ├── hooks/
│   │   ├── use-parties.ts
│   │   └── use-party-actions.ts
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── sales/                   # ⏳ To Implement
│   ├── api/
│   │   ├── sales.api.ts
│   │   └── quotations.api.ts
│   ├── components/
│   │   ├── sale-form.tsx
│   │   ├── sale-list.tsx
│   │   ├── sale-details.tsx
│   │   ├── quotation-form.tsx
│   │   └── pos-screen.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── purchases/               # ⏳ To Implement
│   ├── api/
│   │   └── purchases.api.ts
│   ├── components/
│   │   ├── purchase-form.tsx
│   │   ├── purchase-list.tsx
│   │   └── purchase-details.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── payments/                # ⏳ To Implement
│   ├── api/
│   │   └── payments.api.ts
│   ├── components/
│   │   ├── payment-form.tsx
│   │   ├── payment-list.tsx
│   │   └── payment-details.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── expenses/                # ⏳ To Implement
│   ├── api/
│   │   ├── expenses.api.ts
│   │   └── categories.api.ts
│   ├── components/
│   │   ├── expense-form.tsx
│   │   ├── expense-list.tsx
│   │   └── category-manager.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── returns/                 # ⏳ To Implement
│   ├── api/
│   │   ├── sale-returns.api.ts
│   │   └── purchase-returns.api.ts
│   ├── components/
│   │   ├── sale-return-form.tsx
│   │   └── purchase-return-form.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── locations/               # ⏳ To Implement
│   ├── api/
│   │   └── locations.api.ts
│   ├── components/
│   │   ├── location-list.tsx
│   │   └── location-form.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── taxes/                   # ⏳ To Implement
│   ├── api/
│   │   └── taxes.api.ts
│   ├── components/
│   │   ├── tax-list.tsx
│   │   └── tax-form.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── pricing/                 # ⏳ To Implement
│   ├── api/
│   │   └── pricing-rules.api.ts
│   ├── components/
│   │   ├── pricing-rule-list.tsx
│   │   └── pricing-rule-form.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── accounting/              # ⏳ To Implement
│   ├── api/
│   │   ├── accounts.api.ts
│   │   └── journal-entries.api.ts
│   ├── components/
│   │   ├── chart-of-accounts.tsx
│   │   ├── journal-entry-form.tsx
│   │   ├── ledger.tsx
│   │   ├── trial-balance.tsx
│   │   └── balance-sheet.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
├── reports/                 # ⏳ To Implement
│   ├── api/
│   │   └── reports.api.ts
│   ├── components/
│   │   ├── sales-report.tsx
│   │   ├── purchase-report.tsx
│   │   ├── stock-report.tsx
│   │   ├── profit-loss.tsx
│   │   ├── party-report.tsx
│   │   └── tax-report.tsx
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── index.ts
│
└── notifications/           # ⏳ To Implement
    ├── api/
    │   └── notifications.api.ts
    ├── components/
    │   ├── notification-list.tsx
    │   └── notification-bell.tsx
    ├── hooks/
    ├── stores/
    ├── types/
    └── index.ts
```

## 🔄 DATA RELATIONSHIPS

```
Shop (1) ──────────── (N) Items
Shop (1) ──────────── (N) Parties
Shop (1) ──────────── (N) Sales
Shop (1) ──────────── (N) Purchases
Shop (1) ──────────── (N) Locations
Shop (1) ──────────── (N) Accounts

Item (1) ──────────── (N) StockTransactions
Item (1) ──────────── (N) SerialNumbers
Item (N) ──────────── (N) Categories

Party (1) ──────────── (N) Sales
Party (1) ──────────── (N) Purchases
Party (1) ──────────── (N) Payments

Sale (1) ──────────── (N) Payments
Sale (1) ──────────── (1) SaleReturn

Purchase (1) ──────────── (N) Payments
Purchase (1) ──────────── (1) PurchaseReturn

Location (1) ──────────── (N) StockTransactions
Location (1) ──────────── (N) StockTransfers (from)
Location (1) ──────────── (N) StockTransfers (to)

Account (1) ──────────── (N) JournalEntryLines
```

## 📊 IMPLEMENTATION PHASES

### Phase 1: MVP (Weeks 1-3)

- ✅ Authentication
- ✅ Shop Management
- 🔄 Inventory (Items, Categories, Stock)
- ⏳ Parties (Customers, Suppliers)
- ⏳ Basic Sales
- ⏳ Basic Purchases

### Phase 2: Core Features (Weeks 4-7)

- Payments
- Quotations
- Stock Adjustments
- Barcode Scanning
- Basic Reports
- Notifications

### Phase 3: Advanced (Weeks 8-12)

- Expenses
- Returns
- Multi-location
- Taxes
- Pricing Rules
- Advanced Reports

### Phase 4: Enterprise (Weeks 13-20)

- Accounting
- Journal Entries
- Financial Reports
- Recurring Expenses
- Stock Transfers
- Advanced Analytics

## 🎯 QUERY OPTIMIZATION STRATEGIES

1. **Always use shopId filter first**
2. **Limit results with limit()**
3. **Use pagination for large datasets**
4. **Cache with SWR/ReactFire**
5. **Denormalize frequently accessed data**
6. **Use batch operations for multiple reads**
7. **Implement real-time only for active screens**
8. **Unsubscribe when components unmount**

## 🔐 SECURITY RULES

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function hasShopAccess(shopId) {
      return isAuthenticated() &&
             exists(/databases/$(database)/documents/shopMembers/$(request.auth.uid + '_' + shopId));
    }

    function hasPermission(shopId, permission) {
      let member = get(/databases/$(database)/documents/shopMembers/$(request.auth.uid + '_' + shopId));
      return permission in member.data.permissions;
    }

    // Items
    match /items/{itemId} {
      allow read: if hasShopAccess(resource.data.shopId);
      allow create: if hasShopAccess(request.resource.data.shopId) &&
                       hasPermission(request.resource.data.shopId, 'items.create');
      allow update: if hasShopAccess(resource.data.shopId) &&
                       hasPermission(resource.data.shopId, 'items.edit');
      allow delete: if hasShopAccess(resource.data.shopId) &&
                       hasPermission(resource.data.shopId, 'items.delete');
    }

    // Sales
    match /sales/{saleId} {
      allow read: if hasShopAccess(resource.data.shopId);
      allow create: if hasShopAccess(request.resource.data.shopId) &&
                       hasPermission(request.resource.data.shopId, 'sales.create');
      allow update: if hasShopAccess(resource.data.shopId) &&
                       hasPermission(resource.data.shopId, 'sales.edit');
    }

    // Apply similar rules for all collections
  }
}
```

This architecture provides a complete, scalable foundation for the shop management system with all critical features integrated.
