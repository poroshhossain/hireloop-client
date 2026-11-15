import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "@/features/dashboard/DashboardSidebar"
import DashboardTopbar from "@/features/dashboard/DashboardTopbar"

/* -------------------------------------------------------------------------- */
/* Dashboard layout                                                           */
/*                                                                            */
/* Sidebar (role-aware) + sticky topbar + ONE content wrapper that owns the   */
/* page padding — individual pages never add their own spacing.               */
/* -------------------------------------------------------------------------- */

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex min-w-0 flex-1 flex-col">
                <DashboardTopbar />
                <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </SidebarProvider>
    )
}
export default DashboardLayout