import { Link, useLocation } from '@tanstack/react-router'
import { Home, ShoppingCart, Users, FileText, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/components/ui/sidebar'

export function MobileBottomNav() {
    const { toggleSidebar } = useSidebar()
    const pathname = useLocation({ select: (location) => location.pathname })

    const navItems = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Sales', icon: ShoppingCart, href: '/sales' },
        { label: 'Parties', icon: Users, href: '/parties' },
        { label: 'Reports', icon: FileText, href: '/reports/sales' }
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden">
            <nav className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive =
                        item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href)
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex flex-col items-center gap-1 p-2 rounded-md transition-colors min-w-[60px]',
                                isActive
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <item.icon className="size-5" />
                            <span className="text-[10px] font-medium">
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
                <button
                    onClick={toggleSidebar}
                    className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground min-w-[60px] rounded-md"
                >
                    <Menu className="size-5" />
                    <span className="text-[10px] font-medium">Menu</span>
                </button>
            </nav>
        </div>
    )
}
