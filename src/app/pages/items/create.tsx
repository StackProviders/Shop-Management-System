import { useNavigate } from '@tanstack/react-router'
import { ItemForm, useCategories, useItemActions } from '@/features/items'
import type { CreateItemData } from '@/features/items'
import { useShopContext } from '@/features/shop'

export default function CreateItemPage() {
    const navigate = useNavigate()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { createItem } = useItemActions(shopId)
    const { categories } = useCategories(shopId)

    const handleAddItem = async (data: CreateItemData) => {
        await createItem(data)
        navigate({ to: '/items' })
    }

    const handleCancel = () => {
        navigate({ to: '/items' })
    }

    return (
        <ItemForm
            categories={categories}
            onSubmit={handleAddItem}
            onCancel={handleCancel}
        />
    )
}
