import {
    FileText,
    ArrowDownLeft,
    RotateCcw,
    ClipboardList,
    FileCheck,
    FilePlus,
    Truck,
    ShoppingCart,
    ArrowUpRight,
    Package,
    Receipt,
    ArrowLeftRight,
    ShoppingBag
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface QuickActionItem {
    icon: LucideIcon
    label: string
    href: string
}

export interface QuickActionGroup {
    title: string
    items: QuickActionItem[]
}

export const QUICK_ACTIONS: QuickActionGroup[] = [
    {
        title: 'Sale Transactions',
        items: [
            { icon: FileText, label: 'Sale Invoice', href: '/sale-invoice' },
            { icon: ArrowDownLeft, label: 'Payment-In', href: '/payment-in' },
            { icon: RotateCcw, label: 'Credit Note', href: '/credit-note' },
            { icon: ClipboardList, label: 'Sale Order', href: '/sale-order' },
            { icon: FileCheck, label: 'Estimate', href: '/estimate' },
            {
                icon: FilePlus,
                label: 'Proforma Invoice',
                href: '/proforma-invoice'
            },
            {
                icon: Truck,
                label: 'Delivery Challan',
                href: '/delivery-challan'
            }
        ]
    },
    {
        title: 'Purchase Transactions',
        items: [
            { icon: ShoppingCart, label: 'Purchase', href: '/purchase' },
            { icon: ArrowUpRight, label: 'Payment-Out', href: '/payment-out' },
            { icon: RotateCcw, label: 'Debit Note', href: '/debit-note' },
            {
                icon: Package,
                label: 'Purchase Order',
                href: '/purchase-order'
            }
        ]
    },
    {
        title: 'Other Transactions',
        items: [
            { icon: Receipt, label: 'Expenses', href: '/expenses' },
            {
                icon: ArrowLeftRight,
                label: 'Party Transfer',
                href: '/party-transfer'
            }
        ]
    }
]

export const DEFAULT_BOTTOM_ACTIONS: QuickActionItem[] = [
    { icon: ShoppingCart, label: 'Purchase', href: '/purchase' },
    { icon: ShoppingBag, label: 'Sale', href: '/sale-invoice' }
]
