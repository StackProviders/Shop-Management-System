import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/upload/image-upload'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon, X } from 'lucide-react'
import { useBrandMutations } from '../hooks/use-brand-mutations'
import { useShopContext } from '@/features/shop'
import { cn } from '@/lib/utils'

const brandSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
    logoUrl: z.string().url().optional().or(z.literal(''))
})

type BrandFormData = z.infer<typeof brandSchema>

interface BrandFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function BrandForm({ open, onOpenChange }: BrandFormProps) {
    const { currentShop } = useShopContext()
    const { createBrand } = useBrandMutations(currentShop?.shopId || '')
    const [showUpload, setShowUpload] = useState(false)

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: { name: '', logoUrl: '' }
    })

    const logoUrl = form.watch('logoUrl')

    const handleUploadComplete = (url: string) => {
        form.setValue('logoUrl', url)
        setShowUpload(false)
    }

    const onSubmit = async (data: BrandFormData) => {
        await createBrand(data)
        form.reset()
        setShowUpload(false)
        onOpenChange(false)
    }

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title="Add New Brand"
            formId="brand-form"
            submitLabel="Create"
            isSubmitting={form.formState.isSubmitting}
        >
            <Form {...form}>
                <form
                    id="brand-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter brand name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="logoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brand Logo</FormLabel>
                                <FormControl>
                                    <div className="space-y-2">
                                        {logoUrl && !showUpload ? (
                                            <div className="relative border rounded-lg p-3 bg-muted/30">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={logoUrl}
                                                        alt="Brand logo"
                                                        className="size-12 object-cover rounded"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">
                                                            {field.value}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            form.setValue(
                                                                'logoUrl',
                                                                ''
                                                            )
                                                        }
                                                    >
                                                        <X className="size-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : showUpload ? (
                                            <ImageUpload
                                                path={`brands/${currentShop?.shopId}`}
                                                onUploadComplete={
                                                    handleUploadComplete
                                                }
                                                onCancel={() =>
                                                    setShowUpload(false)
                                                }
                                            />
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className={cn(
                                                    'w-full',
                                                    !field.value &&
                                                        'border-dashed'
                                                )}
                                                onClick={() =>
                                                    setShowUpload(true)
                                                }
                                            >
                                                <ImageIcon className="size-4" />
                                                Upload Logo
                                            </Button>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </ResponsiveModal>
    )
}
