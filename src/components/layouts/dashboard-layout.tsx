'use client'

import { memo, ReactNode } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppBarProvider, useAppBar } from '@/components/providers/app-bar'
import { useIsMobile } from '@/hooks/use-mobile'
import { DashboardHeader } from './dashboard-header'
import { MobileBottomActions } from './mobile-bottom-actions'

interface DashboardLayoutContentProps {
    children?: ReactNode
}

const DashboardLayoutContent = memo(
    ({ children }: DashboardLayoutContentProps) => {
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
)

DashboardLayoutContent.displayName = 'DashboardLayoutContent'

interface DashboardLayoutProps {
    children?: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <AppBarProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </AppBarProvider>
    )
}
