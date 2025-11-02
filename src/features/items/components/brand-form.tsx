import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useIsMobile } from '@/hooks/use-mobile'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from '@/components/ui/drawer'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useBrandMutations } from '../hooks/use-brand-mutations'
import { useShopContext } from '@/features/shop'

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
    const isMobile = useIsMobile()
    const { currentShop } = useShopContext()
    const { createBrand } = useBrandMutations(currentShop?.shopId || '')

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: { name: '', logoUrl: '' }
    })

    const onSubmit = async (data: BrandFormData) => {
        await createBrand(data)
        form.reset()
        onOpenChange(false)
    }

    const FormContent = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <FormLabel>Logo URL (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="https://example.com/logo.png"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </form>
        </Form>
    )

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Add New Brand</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-4">{FormContent}</div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Brand</DialogTitle>
                </DialogHeader>
                {FormContent}
            </DialogContent>
        </Dialog>
    )
}
