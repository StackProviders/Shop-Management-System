import { useShop } from '@/hooks/use-shop'
import { useCurrentUser } from '@/hooks/use-user'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Building2,
    Users,
    Package,
    DollarSign,
    BarChart3,
    Settings,
    LogOut,
    ArrowLeft
} from 'lucide-react'
import { ShopRole } from '@/types/shop'
import {
    canAccessReports,
    canAccessInventory,
    canManageShop
} from '@/utils/permissions'

export function ShopDashboard() {
    const { currentShop, userShops } = useShop()
    const user = useCurrentUser()

    if (!currentShop || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        No Shop Selected
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Please select a shop to access the dashboard
                    </p>
                    <Button onClick={() => (window.location.href = '/shops')}>
                        Select Shop
                    </Button>
                </div>
            </div>
        )
    }

    const getRoleColor = (role: ShopRole) => {
        switch (role) {
            case ShopRole.OWNER:
                return 'bg-purple-100 text-purple-800'
            case ShopRole.ADMIN:
                return 'bg-red-100 text-red-800'
            case ShopRole.SALES_MANAGER:
                return 'bg-blue-100 text-blue-800'
            case ShopRole.MANAGER:
                return 'bg-green-100 text-green-800'
            case ShopRole.ACCOUNTING:
                return 'bg-yellow-100 text-yellow-800'
            case ShopRole.SALES_STAFF:
                return 'bg-indigo-100 text-indigo-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const handleLogout = async () => {
        // Implement logout logic
        window.location.href = '/auth'
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = '/shops')
                                }
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Shops
                            </Button>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {currentShop.shopName}
                                </h1>
                                <div className="flex items-center space-x-2">
                                    <Badge
                                        className={getRoleColor(
                                            currentShop.role
                                        )}
                                    >
                                        {currentShop.role.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                        {currentShop.isOwner
                                            ? 'Owner'
                                            : currentShop.isAdmin
                                              ? 'Administrator'
                                              : 'Member'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                Welcome, {user.name || user.email}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Quick Stats Cards */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Sales
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,345</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Orders
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Revenue
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Feature Cards Based on Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Inventory Management */}
                    {canAccessInventory(currentShop.role) && (
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <Package className="h-5 w-5 text-blue-600" />
                                    <CardTitle>Inventory</CardTitle>
                                </div>
                                <CardDescription>
                                    Manage your products and stock levels
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    Manage Inventory
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Sales Management */}
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                <CardTitle>Sales</CardTitle>
                            </div>
                            <CardDescription>
                                Process sales and manage transactions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">
                                Process Sales
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Reports */}
                    {canAccessReports(currentShop.role) && (
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5 text-purple-600" />
                                    <CardTitle>Reports</CardTitle>
                                </div>
                                <CardDescription>
                                    View analytics and business insights
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    View Reports
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Team Management */}
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-orange-600" />
                                <CardTitle>Team</CardTitle>
                            </div>
                            <CardDescription>
                                Manage team members and permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">
                                Manage Team
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Shop Settings */}
                    {canManageShop(currentShop.role) && (
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <Settings className="h-5 w-5 text-gray-600" />
                                    <CardTitle>Settings</CardTitle>
                                </div>
                                <CardDescription>
                                    Configure shop settings and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    Shop Settings
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Scanner */}
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Building2 className="h-5 w-5 text-indigo-600" />
                                <CardTitle>Barcode Scanner</CardTitle>
                            </div>
                            <CardDescription>
                                Scan products and manage inventory
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={() =>
                                    (window.location.href = '/scanner')
                                }
                            >
                                Open Scanner
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Your Shops Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Your Shops
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userShops.map((shop) => (
                            <Card
                                key={shop.shopId}
                                className={`cursor-pointer transition-all hover:shadow-lg ${
                                    currentShop.shopId === shop.shopId
                                        ? 'ring-2 ring-blue-500'
                                        : ''
                                }`}
                                onClick={() => {
                                    // Switch to this shop
                                    window.location.reload()
                                }}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            {shop.shopName}
                                        </CardTitle>
                                        <Badge
                                            className={getRoleColor(shop.role)}
                                        >
                                            {shop.role.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        {shop.isOwner
                                            ? 'Owner'
                                            : shop.isAdmin
                                              ? 'Administrator'
                                              : 'Member'}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
