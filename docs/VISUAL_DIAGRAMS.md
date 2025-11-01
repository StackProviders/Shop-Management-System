# VISUAL SYSTEM DIAGRAMS

## 📊 DATABASE ENTITY RELATIONSHIP DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE DATABASE SCHEMA                             │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │    SHOPS     │
                              ├──────────────┤
                              │ id (PK)      │
                              │ shopName     │
                              │ ownerId      │
                              │ settings     │
                              └──────┬───────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
         ┌──────────▼─────┐  ┌──────▼──────┐  ┌─────▼──────┐
         │     ITEMS      │  │   PARTIES   │  │  LOCATIONS │
         ├────────────────┤  ├─────────────┤  ├────────────┤
         │ id (PK)        │  │ id (PK)     │  │ id (PK)    │
         │ shopId (FK)    │  │ shopId (FK) │  │ shopId (FK)│
         │ name           │  │ name        │  │ name       │
         │ itemCode       │  │ type        │  │ type       │
         │ type           │  │ phoneNumber │  │ address    │
         │ salePrice      │  │ email       │  │ isDefault  │
         │ purchasePrice  │  │ balance     │  └────────────┘
         │ currentStock   │  │ creditLimit │
         │ barcode        │  └─────┬───────┘
         │ serialTracking │        │
         └────────┬───────┘        │
                  │                │
      ┌───────────┼────────────────┼───────────────┐
      │           │                │               │
┌─────▼──────┐ ┌─▼────────────┐ ┌─▼──────────┐ ┌─▼──────────┐
│CATEGORIES  │ │STOCK         │ │   SALES    │ │ PURCHASES  │
├────────────┤ │TRANSACTIONS  │ ├────────────┤ ├────────────┤
│ id (PK)    │ ├──────────────┤ │ id (PK)    │ │ id (PK)    │
│ shopId(FK) │ │ id (PK)      │ │ shopId(FK) │ │ shopId(FK) │
│ name       │ │ shopId (FK)  │ │ partyId(FK)│ │ partyId(FK)│
│ parentId   │ │ itemId (FK)  │ │ saleNumber │ │ purchaseNo │
└────────────┘ │ type         │ │ items[]    │ │ items[]    │
               │ quantity     │ │ total      │ │ total      │
               │ balanceAfter │ │ status     │ │ status     │
               └──────────────┘ └─────┬──────┘ └─────┬──────┘
                                      │              │
                    ┌─────────────────┼──────────────┼─────────┐
                    │                 │              │         │
            ┌───────▼──────┐  ┌───────▼──────┐  ┌───▼──────┐ │
            │  QUOTATIONS  │  │   PAYMENTS   │  │ EXPENSES │ │
            ├──────────────┤  ├──────────────┤  ├──────────┤ │
            │ id (PK)      │  │ id (PK)      │  │ id (PK)  │ │
            │ shopId (FK)  │  │ shopId (FK)  │  │ shopId   │ │
            │ partyId (FK) │  │ partyId (FK) │  │ category │ │
            │ items[]      │  │ amount       │  │ amount   │ │
            │ status       │  │ type         │  │ date     │ │
            │ validUntil   │  │ method       │  └──────────┘ │
            └──────────────┘  └──────────────┘               │
                                                              │
                    ┌─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
  ┌─────▼──────┐ ┌─▼────────┐ ┌▼──────────┐
  │SALE RETURN │ │PURCHASE  │ │  TAXES    │
  ├────────────┤ │ RETURN   │ ├───────────┤
  │ id (PK)    │ ├──────────┤ │ id (PK)   │
  │ shopId(FK) │ │ id (PK)  │ │ shopId(FK)│
  │ saleId(FK) │ │ shopId   │ │ name      │
  │ items[]    │ │ purchaseId│ │ rate      │
  │ refund     │ │ items[]  │ │ type      │
  └────────────┘ │ refund   │ └───────────┘
                 └──────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│SERIAL        │  │STOCK         │  │PRICING       │  │ACCOUNTS      │
│NUMBERS       │  │ADJUSTMENTS   │  │RULES         │  │              │
├──────────────┤  ├──────────────┤  ├──────────────┤  ├──────────────┤
│ id (PK)      │  │ id (PK)      │  │ id (PK)      │  │ id (PK)      │
│ shopId (FK)  │  │ shopId (FK)  │  │ shopId (FK)  │  │ shopId (FK)  │
│ itemId (FK)  │  │ items[]      │  │ name         │  │ accountCode  │
│ serialNumber │  │ reason       │  │ type         │  │ accountName  │
│ status       │  │ notes        │  │ discount     │  │ accountType  │
│ purchaseId   │  └──────────────┘  │ validFrom    │  │ balance      │
│ saleId       │                    │ validUntil   │  └──────────────┘
└──────────────┘                    └──────────────┘
```

## 🔄 COMPLETE DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TRANSACTION FLOWS                                    │
└─────────────────────────────────────────────────────────────────────────────┘

1. PURCHASE FLOW
   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ Create   │───►│ Validate │───►│  Update  │───►│  Create  │───►│  Update  │
   │ Purchase │    │  Items   │    │   Item   │    │  Stock   │    │  Party   │
   │          │    │  Stock   │    │  Stock   │    │Transaction│   │ Balance  │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
        │               │                │               │               │
        └───────────────┴────────────────┴───────────────┴───────────────┘
                                    │
                            ┌───────▼────────┐
                            │  TRANSACTION   │
                            │   (Atomic)     │
                            │                │
                            │ • Purchase Doc │
                            │ • Stock Update │
                            │ • Party Update │
                            │ • Serial Nos   │
                            └────────────────┘

2. SALE FLOW
   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ Create   │───►│  Check   │───►│  Reduce  │───►│  Create  │───►│  Update  │
   │   Sale   │    │  Stock   │    │   Item   │    │  Stock   │    │  Party   │
   │          │    │Available │    │  Stock   │    │Transaction│   │ Balance  │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
        │               │                │               │               │
        └───────────────┴────────────────┴───────────────┴───────────────┘
                                    │
                            ┌───────▼────────┐
                            │  TRANSACTION   │
                            │   (Atomic)     │
                            │                │
                            │ • Sale Doc     │
                            │ • Stock Update │
                            │ • Party Update │
                            │ • Serial Nos   │
                            │ • Journal Entry│
                            └────────────────┘

3. PAYMENT FLOW
   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ Create   │───►│  Update  │───►│  Create  │───►│  Create  │
   │ Payment  │    │  Party   │    │ Payment  │    │ Journal  │
   │          │    │ Balance  │    │   Doc    │    │  Entry   │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘
        │               │                │               │
        └───────────────┴────────────────┴───────────────┘
                            │
                    ┌───────▼────────┐
                    │  TRANSACTION   │
                    │   (Atomic)     │
                    └────────────────┘

4. RETURN FLOW
   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ Create   │───►│ Validate │───►│  Update  │───►│  Create  │───►│  Update  │
   │  Return  │    │ Original │    │   Item   │    │  Stock   │    │  Party   │
   │          │    │   Sale   │    │  Stock   │    │Transaction│   │ Balance  │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘

5. QUOTATION TO SALE FLOW
   ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ Quotation│───►│ Convert  │───►│  Create  │
   │ Accepted │    │   to     │    │   Sale   │
   │          │    │  Sale    │    │          │
   └──────────┘    └──────────┘    └──────────┘
```

## 🏗️ FEATURE MODULE ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FEATURE STRUCTURE                                    │
└─────────────────────────────────────────────────────────────────────────────┘

src/features/
│
├── auth/                    ✅ IMPLEMENTED
│   ├── api/
│   ├── components/
│   ├── hooks/
│   └── types/
│
├── shop/                    ✅ IMPLEMENTED
│   ├── api/
│   ├── components/
│   ├── hooks/
│   └── types/
│
├── inventory/               🔄 IN PROGRESS
│   ├── api/
│   │   ├── items.api.ts
│   │   ├── categories.api.ts
│   │   ├── stock.api.ts
│   │   └── serial-numbers.api.ts
│   ├── components/
│   │   ├── items/
│   │   │   ├── item-list.tsx
│   │   │   ├── item-form.tsx
│   │   │   ├── item-card.tsx
│   │   │   └── item-search.tsx
│   │   ├── stock/
│   │   │   ├── stock-history.tsx
│   │   │   ├── adjustment-form.tsx
│   │   │   └── transfer-form.tsx
│   │   └── categories/
│   │       └── category-tree.tsx
│   ├── hooks/
│   │   ├── use-items.ts
│   │   ├── use-item-actions.ts
│   │   ├── use-stock-actions.ts
│   │   └── use-categories.ts
│   ├── stores/
│   │   └── use-item-store.ts
│   └── types/
│       └── index.ts
│
├── parties/                 ⏳ NEXT
│   ├── api/
│   ├── components/
│   ├── hooks/
│   └── types/
│
├── sales/                   ⏳ PHASE 1
│   ├── api/
│   ├── components/
│   ├── hooks/
│   └── types/
│
├── purchases/               ⏳ PHASE 1
├── payments/                ⏳ PHASE 2
├── expenses/                ⏳ PHASE 2
├── quotations/              ⏳ PHASE 2
├── returns/                 ⏳ PHASE 3
├── locations/               ⏳ PHASE 3
├── taxes/                   ⏳ PHASE 3
├── pricing/                 ⏳ PHASE 3
├── accounting/              ⏳ PHASE 4
├── reports/                 ⏳ PHASE 4
└── notifications/           ⏳ PHASE 4
```

## 📱 RESPONSIVE UI ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RESPONSIVE LAYOUTS                                   │
└─────────────────────────────────────────────────────────────────────────────┘

DESKTOP (>768px)                    MOBILE (<768px)
┌─────────────────────────┐        ┌──────────────────┐
│ ┌─────┬───────────────┐ │        │  ┌────────────┐  │
│ │     │   Header      │ │        │  │   Header   │  │
│ │     ├───────────────┤ │        │  └────────────┘  │
│ │ S   │               │ │        │  ┌────────────┐  │
│ │ i   │               │ │        │  │            │  │
│ │ d   │    Content    │ │        │  │  Content   │  │
│ │ e   │               │ │        │  │            │  │
│ │ b   │               │ │        │  │            │  │
│ │ a   │               │ │        │  └────────────┘  │
│ │ r   │               │ │        │  ┌────────────┐  │
│ │     │               │ │        │  │ Bottom Nav │  │
│ └─────┴───────────────┘ │        │  └────────────┘  │
└─────────────────────────┘        └──────────────────┘

MODAL PATTERNS
Desktop: Dialog (Center)           Mobile: Drawer (Bottom)
┌─────────────────────────┐        ┌──────────────────┐
│                         │        │                  │
│    ┌───────────┐        │        │                  │
│    │           │        │        │                  │
│    │  Dialog   │        │        │  ┌────────────┐ │
│    │           │        │        │  │            │ │
│    └───────────┘        │        │  │   Drawer   │ │
│                         │        │  │            │ │
└─────────────────────────┘        │  └────────────┘ │
                                   └──────────────────┘
```

## 🔐 SECURITY & PERMISSIONS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PERMISSION MATRIX                                    │
└─────────────────────────────────────────────────────────────────────────────┘

                    Owner  Admin  Manager  Staff  Viewer
Shop Management      ✓      ✓       ✗       ✗      ✗
Member Management    ✓      ✓       ✗       ✗      ✗
Items - View         ✓      ✓       ✓       ✓      ✓
Items - Create       ✓      ✓       ✓       ✗      ✗
Items - Edit         ✓      ✓       ✓       ✗      ✗
Items - Delete       ✓      ✓       ✗       ✗      ✗
Sales - View         ✓      ✓       ✓       ✓      ✓
Sales - Create       ✓      ✓       ✓       ✓      ✗
Sales - Edit         ✓      ✓       ✓       ✗      ✗
Sales - Delete       ✓      ✓       ✗       ✗      ✗
Purchases - View     ✓      ✓       ✓       ✗      ✗
Purchases - Create   ✓      ✓       ✓       ✗      ✗
Reports - View       ✓      ✓       ✓       ✗      ✗
Reports - Export     ✓      ✓       ✗       ✗      ✗
Accounting - View    ✓      ✓       ✗       ✗      ✗
Accounting - Edit    ✓      ✗       ✗       ✗      ✗
```

## 📊 IMPLEMENTATION ROADMAP

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT PHASES                                   │
└─────────────────────────────────────────────────────────────────────────────┘

PHASE 1: MVP (Weeks 1-3)
├─ ✅ Authentication
├─ ✅ Shop Management
├─ 🔄 Inventory Module
│   ├─ Items CRUD
│   ├─ Categories
│   ├─ Stock Management
│   └─ Barcode Scanning
├─ ⏳ Parties Module
│   ├─ Customer Management
│   └─ Supplier Management
├─ ⏳ Basic Sales
└─ ⏳ Basic Purchases

PHASE 2: Core Features (Weeks 4-7)
├─ Payments
├─ Quotations
├─ Stock Adjustments
├─ Basic Reports
│   ├─ Sales Report
│   ├─ Purchase Report
│   └─ Stock Report
└─ Notifications

PHASE 3: Advanced (Weeks 8-12)
├─ Expenses
├─ Returns (Sale & Purchase)
├─ Multi-location
├─ Taxes
├─ Pricing Rules
└─ Advanced Reports
    ├─ Profit/Loss
    ├─ Party Ledger
    └─ Tax Reports

PHASE 4: Enterprise (Weeks 13-20)
├─ Accounting Module
│   ├─ Chart of Accounts
│   ├─ Journal Entries
│   ├─ Ledger
│   └─ Financial Statements
├─ Stock Transfers
├─ Recurring Expenses
├─ Advanced Analytics
└─ Integrations
```

## 🎯 QUERY OPTIMIZATION

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FIRESTORE OPTIMIZATION                               │
└─────────────────────────────────────────────────────────────────────────────┘

1. ALWAYS FILTER BY shopId FIRST
   ✓ where('shopId', '==', shopId)
   ✗ Direct collection query

2. USE COMPOSITE INDEXES
   ✓ shopId + type + createdAt
   ✓ shopId + status + createdAt
   ✗ Multiple separate where clauses

3. LIMIT RESULTS
   ✓ limit(50)
   ✗ Fetching all documents

4. PAGINATION
   ✓ startAfter(lastDoc)
   ✗ Offset-based pagination

5. DENORMALIZATION
   ✓ Store itemName in sale items
   ✗ Join queries

6. BATCH OPERATIONS
   ✓ documentId() IN [ids] (max 10)
   ✗ Multiple single reads

7. REAL-TIME SUBSCRIPTIONS
   ✓ Only for active screens
   ✗ Global subscriptions

8. CACHING
   ✓ ReactFire cache
   ✗ No caching strategy
```

This complete architecture provides a clear roadmap for implementing all features systematically.
