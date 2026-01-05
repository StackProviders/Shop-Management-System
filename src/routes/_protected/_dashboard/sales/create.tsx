import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SaleForm, useSaleMutations, type SaleFormData } from '@/features/sales'
import { useItems } from '@/features/items'
import { useShopContext } from '@/features/shop'
import { toast } from 'sonner'

export const Route = createFileRoute('/_protected/_dashboard/sales/create')({
    component: CreateSaleRouteComponent
})

function CreateSaleRouteComponent() {
    const navigate = useNavigate()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { items } = useItems(shopId)
    const { createSale } = useSaleMutations(shopId)

    const handleCreateSale = async (data: SaleFormData) => {
        try {
            await createSale(data)
            toast.success('Sale created successfully')
            navigate({ to: '/sales' })
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to create sale'
            )
        }
    }

    return (
        <div className="h-full">
            <SaleForm items={items} onSubmit={handleCreateSale} />
        </div>
    )
}
