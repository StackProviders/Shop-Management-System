import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from 'react-router'

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Link
                className={cn(buttonVariants({ variant: 'outline' }))}
                to="/shops"
            >
                Shops
            </Link>
        </div>
    )
}
