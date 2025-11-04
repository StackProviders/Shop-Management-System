import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { useShopContext } from '@/features/shop'

export default function HomePage() {
    const { currentShop } = useShopContext()

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            {currentShop && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        {currentShop.shopName}
                    </h2>
                    <p className="text-muted-foreground">
                        {currentShop.shopAddress}
                    </p>
                </div>
            )}
            <Link
                className={cn(buttonVariants({ variant: 'outline' }))}
                to="/shops"
            >
                Manage Shops
            </Link>
        </div>
    )
}
