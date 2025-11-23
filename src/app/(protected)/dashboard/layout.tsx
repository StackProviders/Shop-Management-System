'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppBarProvider, useAppBar } from '@/components/providers/app-bar'
import { useIsMobile } from '@/hooks/use-mobile'
import { DashboardHeader } from '@/components/layouts/dashboard-header'
import { MobileBottomActions } from '@/components/layouts/mobile-bottom-actions'

function DashboardLayoutComponent({ children }: { children: React.ReactNode }) {
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
                    {children}
                </main>
                {isMobile && showBottomActions && <MobileBottomActions />}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppBarProvider>
            <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
        </AppBarProvider>
    )
}
