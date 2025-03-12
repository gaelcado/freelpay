"use client"

import {
  DotsHorizontalIcon,
  FileIcon,
  ExternalLinkIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: IconType
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Intégrations API</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <DotsHorizontalIcon />
                  <span className="sr-only">Plus</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FileIcon className="text-muted-foreground" />
                  <span>Voir l'intégration</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLinkIcon className="text-muted-foreground" />
                  <span>Documentation API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <InfoCircledIcon className="text-muted-foreground" />
                  <span>Statut de l'API</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/dashboard/integrations">
              <DotsHorizontalIcon />
              <span>Toutes les intégrations</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
