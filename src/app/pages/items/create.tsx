import { useNavigate, useSearch } from '@tanstack/react-router'
import { ItemForm, useCategories, useItemActions } from '@/features/items'
import type { CreateItemData } from '@/features/items'
import { useShopContext } from '@/features/shop'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'

export default function CreateItemPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/items/create' })
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { createItem } = useItemActions(shopId)
    const { categories } = useCategories(shopId)
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromItems === true,
        '/items'
    )

    const handleAddItem = async (data: CreateItemData) => {
        await createItem(data)
        navigate({ to: '/items', replace: isIntercepting })
    }

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/items"
            modalType="responsive"
            fullPageClassName="h-full overflow-y-auto"
            modalProps={{
                showHeader: false,
                className: '!max-w-6xl',
                contentClassName: 'p-0'
            }}
        >
            <ItemForm
                categories={categories}
                onSubmit={handleAddItem}
                onCancel={handleClose}
            />
        </InterceptingRoute>
    )
}
