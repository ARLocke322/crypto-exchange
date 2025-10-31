import { Home, BriefcaseBusiness, ChartCandlestick, Activity, Wallet, History, Settings, MessageCircleQuestionMark, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Portfolio",
    url: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    title: "Markets",
    url: "/cryptocurrency",
    icon: Activity,
  },
  {
    title: "Trade",
    url: "/trade",
    icon: ChartCandlestick,
  },
  {
    title: "Wallets",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: History,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "#",
    icon: MessageCircleQuestionMark,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}