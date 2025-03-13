"use client";

import {
  CheckIcon,
  BellIcon,
  ChevronDownIcon,
  CardStackIcon,
  ExitIcon,
  PersonIcon,
  GearIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/ui/icon";
export function NavUser({
  user,
}: {
  user: { name: string; email: string; avatar: string };
}) {
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu data-oid="zjbl.p:">
      <SidebarMenuItem data-oid="peyzbam">
        <DropdownMenu data-oid="egy0n2-">
          <DropdownMenuTrigger asChild data-oid="zcch25y">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              data-oid="u_4hjcw"
            >
              <Avatar className="h-8 w-8 rounded-lg" data-oid="k-0u23v">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  data-oid="em_1llx"
                />

                <AvatarFallback className="rounded-lg" data-oid="6sy:_sl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className="grid flex-1 text-left text-sm leading-tight"
                data-oid="8-cc-_5"
              >
                <span className="truncate font-semibold" data-oid="qk071e8">
                  {user.name}
                </span>
                <span className="truncate text-xs" data-oid="1g_vc99">
                  {user.email}
                </span>
              </div>
              <ChevronDownIcon className="ml-auto size-4" data-oid="ub.2pxp" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            data-oid="qqb5vqs"
          >
            <DropdownMenuLabel className="p-0 font-normal" data-oid="6hoq.r8">
              <div
                className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                data-oid="0der55i"
              >
                <Avatar className="h-8 w-8 rounded-lg" data-oid="f66aba8">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    data-oid="wgkl:r."
                  />

                  <AvatarFallback className="rounded-lg" data-oid="z9x91h5">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className="grid flex-1 text-left text-sm leading-tight"
                  data-oid="n2iuq6m"
                >
                  <span className="truncate font-semibold" data-oid="hvceo0w">
                    {user.name}
                  </span>
                  <span className="truncate text-xs" data-oid=".72g2m1">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator data-oid="sf:53yf" />
            <DropdownMenuGroup data-oid="uwxba4x">
              <DropdownMenuItem data-oid="93q7uqp">
                <Icon name="CheckIcon" data-oid="wubipak" />
                Vérification KYC
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator data-oid="3a0n.wg" />
            <DropdownMenuGroup data-oid="1u..agp">
              <DropdownMenuItem data-oid="ysicxpb">
                <Icon name="PersonIcon" data-oid=":htnmv8" />
                Mon profil
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="dnhk7hh">
                <Icon name="HomeIcon" data-oid="hs8t-l6" />
                Mon entreprise
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="0admlis">
                <Icon name="CardStackIcon" data-oid="xaf:ux:" />
                Facturation
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="2nm254o">
                <Icon name="BellIcon" data-oid="52gqmdw" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem data-oid="ynu.wo-">
                <Icon name="GearIcon" data-oid="ccvew5w" />
                Paramètres
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator data-oid="17k3n-2" />
            <DropdownMenuItem data-oid="jxu79z8">
              <Icon name="ExitIcon" data-oid="s1t-_fl" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
