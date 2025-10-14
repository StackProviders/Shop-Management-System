import { useState } from 'react'
import { useShop } from '@/hooks/use-shop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Building2, Users, Settings } from 'lucide-react'
import { ShopRole } from '@/types/shop'
import { LogoutButton } from '../auth'

export function ShopSelectionPage() {
    const {
        userShops,
        currentShop,
        setCurrentShop,
        loading,
        error,
        createShop
    } = useShop()
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newShopName, setNewShopName] = useState('')
    const [newShopDescription, setNewShopDescription] = useState('')
    const [creating, setCreating] = useState(false)

    const handleCreateShop = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newShopName.trim()) return

        try {
            setCreating(true)
            await createShop({
                name: newShopName.trim(),
                description: newShopDescription.trim() || undefined,
                ownerId: '', // This will be set by the createShop function
                settings: {
                    currency: 'USD',
                    timezone: 'UTC',
                    businessHours: {
                        open: '09:00',
                        close: '18:00',
                        days: [1, 2, 3, 4, 5] // Monday to Friday
                    },
                    features: {
                        inventory: true,
                        sales: true,
                        reports: true,
                        multiLocation: false
                    }
                }
            })

            setNewShopName('')
            setNewShopDescription('')
            setShowCreateForm(false)
        } catch (error) {
            console.error('Failed to create shop:', error)
        } finally {
            setCreating(false)
        }
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Shops
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Select a shop to manage or create a new one
                    </p>
                    <LogoutButton variant="destructive" size="lg" />
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        {error}
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {userShops.map((shop) => (
                        <Card
                            key={shop.shopId}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                                currentShop?.shopId === shop.shopId
                                    ? 'ring-2 ring-blue-500'
                                    : ''
                            }`}
                            onClick={() => setCurrentShop(shop)}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="h-5 w-5 text-gray-500" />
                                        <CardTitle className="text-lg">
                                            {shop.shopName}
                                        </CardTitle>
                                    </div>
                                    <Badge className={getRoleColor(shop.role)}>
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
                            <CardContent>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-4 w-4" />
                                        <span>Team</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Create New Shop Card */}
                    <Card
                        className="cursor-pointer transition-all hover:shadow-lg border-dashed border-2 border-gray-300 hover:border-blue-400"
                        onClick={() => setShowCreateForm(true)}
                    >
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Plus className="h-8 w-8 text-gray-400 mb-2" />
                            <h3 className="text-lg font-medium text-gray-900">
                                Create New Shop
                            </h3>
                            <p className="text-sm text-gray-500 text-center">
                                Start managing a new business location
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {currentShop && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Selected Shop: {currentShop.shopName}
                            </CardTitle>
                            <CardDescription>
                                You have {currentShop.role.replace('_', ' ')}{' '}
                                access to this shop
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-4">
                                <Button
                                    onClick={() =>
                                        (window.location.href = '/dashboard')
                                    }
                                >
                                    Go to Dashboard
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        (window.location.href = '/settings')
                                    }
                                >
                                    Shop Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Create Shop Modal */}
                {showCreateForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Create New Shop</CardTitle>
                                <CardDescription>
                                    Set up a new shop to start managing your
                                    business
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleCreateShop}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Input
                                            type="text"
                                            placeholder="Shop name"
                                            value={newShopName}
                                            onChange={(e) =>
                                                setNewShopName(e.target.value)
                                            }
                                            disabled={creating}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            type="text"
                                            placeholder="Description (optional)"
                                            value={newShopDescription}
                                            onChange={(e) =>
                                                setNewShopDescription(
                                                    e.target.value
                                                )
                                            }
                                            disabled={creating}
                                        />
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button
                                            type="submit"
                                            disabled={
                                                creating || !newShopName.trim()
                                            }
                                            className="flex-1"
                                        >
                                            {creating && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Create Shop
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setShowCreateForm(false)
                                            }
                                            disabled={creating}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
