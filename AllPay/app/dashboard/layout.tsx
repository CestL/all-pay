import type React from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Notifications } from "@/components/dashboard/notifications"
import { Bell, CreditCard, Home, LayoutDashboard, Receipt, Settings, Wallet } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Make Payment",
    href: "/dashboard/payment",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: <Receipt className="h-4 w-4" />,
  },
  {
    title: "Accounts",
    href: "/dashboard/accounts",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: "Bills",
    href: "/dashboard/bills",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl md:hidden">
            <Bell className="h-5 w-5 text-primary" />
            <span>AllPay</span>
          </div>
          <div className="hidden md:flex md:items-center md:gap-2 md:font-bold md:text-xl">
            <Bell className="h-5 w-5 text-primary" />
            <span>AllPay</span>
          </div>
          <div className="flex items-center gap-2">
            <Notifications />
            <UserNav />
            <MobileNav items={sidebarNavItems} />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">{children}</main>
      </div>
    </div>
  )
}
