"use client"

import * as React from "react"
import {
  MagicWandIcon,
} from '@radix-ui/react-icons'
import { Icon } from "@/components/ui/icon"

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

// Import all Radix icons we need
import * as RadixIcons from "@radix-ui/react-icons"

// Define the type for our icon names
type RadixIconName = keyof typeof RadixIcons

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
      icon: "HomeIcon" as RadixIconName,
      isActive: true,
    },
    {
      title: "Factures",
      url: "/dashboard/invoices",
      icon: "FileTextIcon" as RadixIconName,
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
      icon: "CardStackIcon" as RadixIconName,
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
      icon: "PersonIcon" as RadixIconName,
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: "CheckboxIcon" as RadixIconName,
    },
    {
      title: "Paiements",
      url: "/dashboard/payments",
      icon: "BackpackIcon" as RadixIconName,
    },
    {
      title: "Paramètres",
      url: "/dashboard/settings",
      icon: "GearIcon" as RadixIconName,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: "QuestionMarkCircledIcon" as RadixIconName,
    },
    {
      title: "Styleguide",
      url: "/dashboard/styleguide",
      icon: "ColorWheelIcon" as RadixIconName,
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
                  <MagicWandIcon className="size-4" />
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

