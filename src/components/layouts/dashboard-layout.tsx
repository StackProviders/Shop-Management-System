import { AppSidebar } from '@/components/app-sidebar'
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

export function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-14 md:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 md:px-4">
                    <SidebarTrigger />
                    <div className="flex-1" />
                </header>
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
