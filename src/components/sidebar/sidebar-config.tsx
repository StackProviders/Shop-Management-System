import {
    IconBellRinging,
    IconBuildingStore,
    IconChartBar,
    IconChartLine,
    IconCoin,
    IconCreditCard,
    IconFileInvoice,
    IconHome,
    IconKey,
    IconPackage,
    IconPlus,
    IconReceipt,
    IconReportMoney,
    IconRotateClockwise2,
    IconSettings,
    IconShoppingBag,
    IconShoppingCart,
    IconTrendingDown,
    IconTrendingUp,
    IconUser,
    IconUsers,
    IconWallet,
    IconWebhook
} from '@tabler/icons-react'
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    BadgeDollarSign,
    FileText,
    Smartphone,
    TrendingUp,
    Undo2,
    Warehouse
} from 'lucide-react'
import type { SidebarItem } from './types'
import { getSecurityCount } from './badge-helpers'

export const sidebarItems: SidebarItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: IconHome,
        route: '/'
    },
    {
        id: 'parties',
        label: 'Parties',
        icon: IconUsers,
        route: '/parties'
    },
    {
        id: 'todos',
        label: 'Todos',
        icon: IconUsers,
        route: '/todos'
    },
    {
        id: 'items',
        label: 'Items',
        icon: IconPackage,
        route: '/item'
    },
    {
        id: 'inventory',
        label: 'Inventory',
        icon: Warehouse,
        route: '/inventory'
    },
    {
        id: 'sales',
        label: 'Sales',
        icon: IconTrendingUp,
        subItems: [
            {
                id: 'sales-list',
                label: 'All Sales',
                icon: IconFileInvoice,
                route: '/sales'
            },
            {
                id: 'add-sale',
                label: 'New Sale',
                icon: IconPlus,
                route: '/sales/add'
            },
            {
                id: 'sale-return',
                label: 'Sale Returns',
                icon: Undo2,
                route: '/sales/return'
            }
        ]
    },
    {
        id: 'purchases',
        label: 'Purchases',
        icon: IconShoppingCart,
        subItems: [
            {
                id: 'purchase-list',
                label: 'All Purchases',
                icon: IconReceipt,
                route: '/purchase'
            },
            {
                id: 'add-purchase',
                label: 'New Purchase',
                icon: IconPlus,
                route: '/purchase/add'
            },
            {
                id: 'purchase-return',
                label: 'Purchase Returns',
                icon: IconRotateClockwise2,
                route: '/purchase/return'
            }
        ]
    },
    {
        id: 'payments',
        label: 'Payments',
        icon: IconWallet,
        subItems: [
            {
                id: 'payment-in',
                label: 'Payment In',
                icon: ArrowDownToLine,
                route: '/payment/in'
            },
            {
                id: 'payment-out',
                label: 'Payment Out',
                icon: ArrowUpFromLine,
                route: '/payment/out'
            }
        ]
    },
    {
        id: 'expenses',
        label: 'Expenses',
        icon: IconTrendingDown,
        route: '/expenses'
    },
    {
        id: 'mobile-banking',
        label: 'Mobile Banking',
        icon: Smartphone,
        subItems: [
            {
                id: 'bkash',
                label: 'bKash',
                icon: IconCoin,
                route: '/mobile-banking/bkash'
            },
            {
                id: 'nagad',
                label: 'Nagad',
                icon: IconCoin,
                route: '/mobile-banking/nagad'
            },
            {
                id: 'rocket',
                label: 'Rocket',
                icon: IconCoin,
                route: '/mobile-banking/rocket'
            }
        ]
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: IconChartBar,
        badge: getSecurityCount,
        subItems: [
            {
                id: 'sales-report',
                label: 'Sales Report',
                icon: TrendingUp,
                route: '/reports/sales'
            },
            {
                id: 'purchase-report',
                label: 'Purchase Report',
                icon: IconShoppingBag,
                route: '/reports/purchase'
            },
            {
                id: 'profit-loss',
                label: 'Profit & Loss',
                icon: IconReportMoney,
                route: '/reports/profit-loss'
            },
            {
                id: 'inventory-report',
                label: 'Inventory Report',
                icon: FileText,
                route: '/reports/inventory'
            },
            {
                id: 'party-statement',
                label: 'Party Statement',
                icon: BadgeDollarSign,
                route: '/reports/party-statement'
            },
            {
                id: 'cash-flow',
                label: 'Cash Flow',
                icon: IconChartLine,
                route: '/reports/cash-flow'
            }
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: IconSettings,
        subItems: [
            {
                id: 'shop-settings',
                label: 'Shop Settings',
                icon: IconBuildingStore,
                route: '/settings/shop'
            },
            {
                id: 'profile',
                label: 'Profile',
                icon: IconUser,
                route: '/settings/profile'
            },
            {
                id: 'billing',
                label: 'Billing',
                icon: IconCreditCard,
                route: '/settings/billing'
            },
            {
                id: 'notifications',
                label: 'Notifications',
                icon: IconBellRinging,
                route: '/settings/notifications'
            },
            {
                id: 'webhooks',
                label: 'Webhooks',
                icon: IconWebhook,
                route: '/settings/webhooks'
            },
            {
                id: 'api-keys',
                label: 'API Keys',
                icon: IconKey,
                route: '/settings/api-keys'
            }
        ]
    }
]
