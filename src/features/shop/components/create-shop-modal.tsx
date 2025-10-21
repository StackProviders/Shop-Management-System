import { useState } from 'react'
import { toast } from 'sonner'
import { ResponsiveDialog } from '@/components/modal'
import { CreateShopForm } from './create-shop-form'
import { useShopActions } from '../hooks'
import { useCurrentUser } from '@/features/auth'
import type { ShopFormData } from '@/lib/validations'

interface CreateShopModalProps {
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSuccess?: () => void
}

export function CreateShopModal({
    trigger,
    open: controlledOpen,
    onOpenChange,
    onSuccess
}: CreateShopModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const open = controlledOpen ?? internalOpen
    const setOpen = onOpenChange ?? setInternalOpen
    const { createShop } = useShopActions()
    const user = useCurrentUser()

    const handleSubmit = async (data: ShopFormData) => {
        if (!user?.uid) throw new Error('User not authenticated')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { status, ...shopData } = data
        await createShop(user.uid, shopData)
        toast.success('Shop created', {
            description: `"${data.shopname}" has been created successfully.`
        })
        setOpen(false)
        onSuccess?.()
    }

    return (
        <ResponsiveDialog
            trigger={trigger}
            title="Create Shop"
            description="Enter shop details to create a new shop"
            open={open}
            onOpenChange={setOpen}
        >
            <CreateShopForm
                onSubmit={handleSubmit}
                onCancel={() => setOpen(false)}
            />
        </ResponsiveDialog>
    )
}
