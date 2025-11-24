'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { ResponsiveModal } from '@/components'
import { CreateShopForm } from './create-shop-form'
import { useShopActions } from '../hooks'
import { shopApi } from '../api'
import type { ShopFormData } from '@/lib/validations'
import type { Shop } from '../types'

interface EditShopModalProps {
    shopId: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSuccess?: () => void
}

export function EditShopModal({
    shopId,
    open: controlledOpen,
    onOpenChange,
    onSuccess
}: EditShopModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [shopData, setShopData] = useState<Shop | null>(null)
    const open = controlledOpen ?? internalOpen
    const setOpen = onOpenChange ?? setInternalOpen
    const { updateShop } = useShopActions()

    useEffect(() => {
        if (open && shopId) {
            shopApi
                .getShop(shopId)
                .then(setShopData)
                .catch(() => {
                    toast.error('Failed to load shop details')
                    setOpen(false)
                })
        }
    }, [open, shopId, setOpen])

    const handleSubmit = async (data: ShopFormData) => {
        await updateShop(shopId, data)
        toast.success('Shop updated', {
            description: 'Shop has been updated successfully.'
        })
        setOpen(false)
        onSuccess?.()
    }

    if (!shopData) return null

    return (
        <ResponsiveModal
            title="Edit Shop"
            description="Update your shop information below"
            open={open}
            onOpenChange={setOpen}
        >
            <CreateShopForm
                onSubmit={handleSubmit}
                onCancel={() => setOpen(false)}
                initialData={{
                    shopname: shopData.shopname,
                    logo_url: shopData.logo_url || '',
                    phone_number: shopData.phone_number || '',
                    email: shopData.email || '',
                    shop_type: shopData.shop_type || '',
                    shop_category: shopData.shop_category || '',
                    shop_address: shopData.shop_address || '',
                    signature: shopData.signature || '',
                    status: shopData.status
                }}
            />
        </ResponsiveModal>
    )
}
