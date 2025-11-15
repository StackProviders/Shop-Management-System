import { useNavigate } from '@tanstack/react-router'
import { SaleForm, useSaleMutations, type SaleFormData } from '@/features/sales'
import { useItems } from '@/features/items'
import { useShopContext } from '@/features/shop'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateSalePage() {
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
        <div className="h-full overflow-auto">
            <div className="py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Sale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SaleForm items={items} onSubmit={handleCreateSale} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
