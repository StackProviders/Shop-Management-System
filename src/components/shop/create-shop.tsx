import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

interface CreateShopProps {
    onCreateShop?: (shopData: { name: string; description?: string }) => void
}

export default function CreateShop({ onCreateShop }: CreateShopProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [shopName, setShopName] = useState('')
    const [shopDescription, setShopDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (shopName.trim()) {
            onCreateShop?.({
                name: shopName.trim(),
                description: shopDescription.trim() || undefined
            })
            setShopName('')
            setShopDescription('')
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                    New Shop
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create New Shop
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="shop-name"
                            className="text-sm font-medium text-foreground"
                        >
                            Shop Name
                        </label>
                        <Input
                            id="shop-name"
                            placeholder="Enter shop name"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="shop-description"
                            className="text-sm font-medium text-foreground"
                        >
                            Description (Optional)
                        </label>
                        <Input
                            id="shop-description"
                            placeholder="Enter shop description"
                            value={shopDescription}
                            onChange={(e) => setShopDescription(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                        >
                            Create Shop
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
