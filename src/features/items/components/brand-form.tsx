'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { Form } from '@/components/ui/form'
import {
    FormInput,
    FormImageUpload
} from '@/components/common/forms/form-fields'
import { useBrandMutations } from '../hooks/use-brand-mutations'
import { useShopContext } from '@/features/shop'
import { deleteImage } from '@/lib/storage'
import { brandSchema, type BrandFormData } from '../validations'
import type { Brand } from '../types/brand'

interface BrandFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    brand?: Brand
}

export function BrandForm({ open, onOpenChange, brand }: BrandFormProps) {
    const { currentShop } = useShopContext()
    const { createBrand, updateBrand } = useBrandMutations(
        currentShop?.shopId || ''
    )
    const initialLogoRef = useRef('')
    const uploadedLogosRef = useRef<Set<string>>(new Set())

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: { name: '', logoUrl: '' }
    })

    const uploadPath = useMemo(
        () => `brands/${currentShop?.shopId}`,
        [currentShop?.shopId]
    )

    useEffect(() => {
        if (open) {
            const defaultValues = brand
                ? { name: brand.name, logoUrl: brand.logoUrl || '' }
                : { name: '', logoUrl: '' }
            form.reset(defaultValues)
            initialLogoRef.current = brand?.logoUrl || ''
            uploadedLogosRef.current.clear()
        }
    }, [open, brand, form])

    useEffect(() => {
        const subscription = form.watch((value) => {
            const currentLogo = value.logoUrl || ''
            if (currentLogo && currentLogo !== initialLogoRef.current) {
                uploadedLogosRef.current.add(currentLogo)
            }
        })
        return () => subscription.unsubscribe()
    }, [form])

    const cleanupUnusedImages = useCallback(async (excludeUrl?: string) => {
        const promises = Array.from(uploadedLogosRef.current)
            .filter((url) => url !== excludeUrl)
            .map((url) => deleteImage(url).catch(() => {}))
        await Promise.all(promises)
        uploadedLogosRef.current.clear()
    }, [])

    const handleClose = useCallback(
        async (isOpen: boolean) => {
            if (!isOpen) {
                await cleanupUnusedImages()
            }
            onOpenChange(isOpen)
        },
        [onOpenChange, cleanupUnusedImages]
    )

    const onSubmit = useCallback(
        async (data: BrandFormData) => {
            if (brand) {
                await updateBrand(brand.id, data)
                if (
                    initialLogoRef.current &&
                    initialLogoRef.current !== data.logoUrl
                ) {
                    deleteImage(initialLogoRef.current).catch(() => {})
                }
            } else {
                await createBrand(data)
            }
            await cleanupUnusedImages(data.logoUrl)
            form.reset()
            onOpenChange(false)
        },
        [
            brand,
            createBrand,
            updateBrand,
            cleanupUnusedImages,
            form,
            onOpenChange
        ]
    )

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={handleClose}
            title={brand ? 'Edit Brand' : 'Add New Brand'}
            formId="brand-form"
            submitLabel={brand ? 'Update' : 'Create'}
            isSubmitting={form.formState.isSubmitting}
        >
            <Form {...form}>
                <form
                    id="brand-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormInput<BrandFormData>
                        name="name"
                        label="Brand Name"
                        placeholder="Enter brand name"
                        required
                    />

                    <FormImageUpload<BrandFormData>
                        name="logoUrl"
                        label="Brand Logo"
                        uploadPath={uploadPath}
                    />
                </form>
            </Form>
        </ResponsiveModal>
    )
}
