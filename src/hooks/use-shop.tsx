import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react'
import useSWR from 'swr'
import { shopStore, STORE_KEYS, storeHelpers } from '@/lib/store'
import { getUserShops, createShop as createShopService } from '@/services/shop'
import { UserShopAccess, Shop } from '@/types/shop'
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
    const [currentShop, setCurrentShop] = useState<UserShopAccess | null>(null)
    const user = useCurrentUser()

    const {
        data: userShops = [],
        error,
        isLoading,
        mutate
    } = useSWR<UserShopAccess[]>(
        user ? ['user-shops', user.uid] : null,
        () => getUserShops(user!.uid),
        { revalidateOnFocus: true, revalidateOnReconnect: true }
    )

    const createShop = async (
        shopData: Omit<Shop, 'id' | 'createdAt' | 'updatedAt' | 'members'>
    ) => {
        if (!user) throw new Error('User not authenticated')
        const newShop = await createShopService(user.uid, shopData)
        await mutate()
        const shopAccess = userShops.find((s) => s.shopId === newShop.id)
        if (shopAccess) setCurrentShop(shopAccess)
    }

    useEffect(() => {
        if (!currentShop && userShops.length > 0) {
            storeHelpers
                .get<string>(shopStore, STORE_KEYS.CURRENT_SHOP_ID)
                .then((savedShopId) => {
                    const shop = savedShopId
                        ? userShops.find((s) => s.shopId === savedShopId)
                        : userShops[0]
                    if (shop) setCurrentShop(shop)
                })
        }
    }, [userShops, currentShop])

    useEffect(() => {
        if (currentShop) {
            storeHelpers.set(
                shopStore,
                STORE_KEYS.CURRENT_SHOP_ID,
                currentShop.shopId
            )
        }
    }, [currentShop])

    const value: ShopContextType = {
        userShops,
        currentShop,
        setCurrentShop,
        loading: isLoading,
        error: error?.message ?? null,
        refreshShops: async () => {
            await mutate()
        },
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
