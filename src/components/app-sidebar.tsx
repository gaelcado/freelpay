"use client"

import * as React from "react"
import {
  Home,
  FileText,
  CreditCard,
  Users,
  FileCheck,
  Wallet,
  Settings2,
  LifeBuoy,
  Command,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@freelpay.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Factures",
      url: "/dashboard/invoices",
      icon: FileText,
      items: [
        {
          title: "Mes factures",
          url: "/dashboard/invoices",
        },
        {
          title: "Créer une facture",
          url: "/dashboard/invoices/create",
        },
      ],
    },
    {
      title: "Financements",
      url: "/dashboard/financing",
      icon: CreditCard,
      items: [
        {
          title: "Demandes en cours",
          url: "/dashboard/financing",
        },
        {
          title: "Nouvelle demande",
          url: "/dashboard/financing/new",
        },
        {
          title: "Simulation",
          url: "/dashboard/financing/simulation",
        },
      ],
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: FileCheck,
    },
    {
      title: "Paiements",
      url: "/dashboard/payments",
      icon: Wallet,
    },
    {
      title: "Paramètres",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">FreelPay</span>
                  <span className="truncate text-xs">Financez vos factures</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

