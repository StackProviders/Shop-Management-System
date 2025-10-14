import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react'
import { getUserShops, createShop as createShopService } from '@/services/shop'
import { UserShopAccess, Shop, ShopRole } from '@/types/shop'
import { useCurrentUser } from '@/hooks/use-user'

interface ShopContextType {
    userShops: UserShopAccess[]
    currentShop: UserShopAccess | null
    setCurrentShop: (shop: UserShopAccess | null) => void
    loading: boolean
    error: string | null
    refreshShops: () => Promise<void>
    createShop: (
        shopData: Omit<Shop, 'id' | 'createdAt' | 'updatedAt' | 'members'>
    ) => Promise<void>
}

const ShopContext = createContext<ShopContextType | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
    const [userShops, setUserShops] = useState<UserShopAccess[]>([])
    const [currentShop, setCurrentShop] = useState<UserShopAccess | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const user = useCurrentUser()

    const refreshShops = async () => {
        if (!user) {
            setUserShops([])
            setCurrentShop(null)
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)
            const shops = await getUserShops(user.uid)
            setUserShops(shops)

            // Set current shop if none is selected
            if (!currentShop && shops.length > 0) {
                setCurrentShop(shops[0])
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to load shops'
            )
        } finally {
            setLoading(false)
        }
    }

    const createShop = async (
        shopData: Omit<Shop, 'id' | 'createdAt' | 'updatedAt' | 'members'>
    ) => {
        if (!user) throw new Error('User not authenticated')

        const newShop = await createShopService({
            ...shopData,
            ownerId: user.uid,
            members: [
                {
                    userId: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    role: ShopRole.OWNER,
                    joinedAt: new Date(),
                    permissions: []
                }
            ]
        })

        // Refresh shops to include the new one
        await refreshShops()

        // Set the new shop as current
        const shopAccess = userShops.find((s) => s.shopId === newShop.id)
        if (shopAccess) {
            setCurrentShop(shopAccess)
        }
    }

    useEffect(() => {
        refreshShops()
    }, [user])

    // Load current shop from localStorage on mount
    useEffect(() => {
        const savedShopId = localStorage.getItem('currentShopId')
        if (savedShopId && userShops.length > 0) {
            const shop = userShops.find((s) => s.shopId === savedShopId)
            if (shop) {
                setCurrentShop(shop)
            }
        }
    }, [userShops])

    // Save current shop to localStorage
    useEffect(() => {
        if (currentShop) {
            localStorage.setItem('currentShopId', currentShop.shopId)
        }
    }, [currentShop])

    const value: ShopContextType = {
        userShops,
        currentShop,
        setCurrentShop,
        loading,
        error,
        refreshShops,
        createShop
    }

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
    const context = useContext(ShopContext)
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider')
    }
    return context
}
