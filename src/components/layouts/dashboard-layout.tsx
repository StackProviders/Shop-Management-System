import { memo } from 'react'
import { Outlet } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppBarProvider, useAppBar } from '@/components/providers/app-bar'
import { useIsMobile } from '@/hooks/use-mobile'
import { DashboardHeader } from './dashboard-header'
import { MobileBottomActions } from './mobile-bottom-actions'

const DashboardLayoutContent = memo(() => {
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
                        paddingBottom:
                            isMobile && showBottomActions
                                ? 'calc(4rem + var(--sab))'
                                : undefined
                    }}
                >
                    <Outlet />
                </main>
                {isMobile && showBottomActions && <MobileBottomActions />}
            </SidebarInset>
        </SidebarProvider>
    )
})

DashboardLayoutContent.displayName = 'DashboardLayoutContent'

export function DashboardLayout() {
    return (
        <AppBarProvider>
            <DashboardLayoutContent />
        </AppBarProvider>
    )
}
