import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "@/features/dashboard/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="min-w-0 flex-1">
                <SidebarTrigger className="m-2" />
                {children}
            </main>
        </SidebarProvider>
    )
}
export default DashboardLayout