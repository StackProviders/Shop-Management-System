import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppBarProvider, useAppBar } from '@/components/providers/app-bar'
import { useIsMobile } from '@/hooks/use-mobile'
import { DashboardHeader } from '@/components/layouts/dashboard-header'
import { MobileBottomActions } from '@/components/layouts/mobile-bottom-actions'
import { MobileBottomNav } from '@/components/layouts/mobile-bottom-nav'

function DashboardLayoutComponent() {
    const isMobile = useIsMobile()
    const { showBottomActions } = useAppBar()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                <main
                    className="flex-1 overflow-auto p-3 md:p-4"
                    style={{
                        paddingBottom: isMobile
                            ? showBottomActions
                                ? 'calc(7rem + var(--sab))' // Nav + Actions space
                                : 'calc(4rem + var(--sab))' // Nav space
                            : undefined
                    }}
                >
                    <Outlet />
                </main>
                {isMobile && <MobileBottomNav />}
                {isMobile && showBottomActions && <MobileBottomActions />}
            </SidebarInset>
        </SidebarProvider>
    )
}

export const Route = createFileRoute('/_protected/_dashboard')({
    component: () => (
        <AppBarProvider>
            <DashboardLayoutComponent />
        </AppBarProvider>
    )
})
