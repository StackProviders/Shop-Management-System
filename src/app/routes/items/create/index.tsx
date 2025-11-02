import { useNavigate } from 'react-router'
import {
    ItemForm,
    useCategories,
    useItemActions,
    useUnits
} from '@/features/items'
import type { CreateItemData } from '@/features/items'
import { useShopContext } from '@/features/shop'

export default function CreateItemPage() {
    const navigate = useNavigate()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { createItem } = useItemActions(shopId)
    const { categories } = useCategories(shopId)
    const { units } = useUnits(shopId)

    const handleAddItem = async (data: CreateItemData) => {
        await createItem(data)
        navigate('/items')
    }

    const handleCancel = () => {
        navigate('/items')
    }

    return (
        <ItemForm
            categories={categories}
            units={units}
            onSubmit={handleAddItem}
            onCancel={handleCancel}
        />
    )
}
