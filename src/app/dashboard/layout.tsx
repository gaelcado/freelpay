"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme-switch"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Extract the current page from pathname
  const getPageName = () => {
    // Remove '/dashboard/' from the path and capitalize first letter
    const path = pathname.replace('/dashboard', '')
    
    if (path === '') {
      return 'Dashboard'
    }
    
    // Split by '/' and get the first segment
    const segment = path.split('/')[1]
    
    // Capitalize first letter
    return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard'
  }
  
  return (
    <SidebarProvider>
      <AppSidebar className="hidden lg:flex w-64" />
      <SidebarInset className="rounded-xl overflow-x-hidden relative shadow-lg">
        {/* Background image positioned within the SidebarInset */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <Image 
            src="/branding/6.png" 
            alt="Background" 
            fill 
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-100 dark:opacity-100"
          />
        </div>
        
        <header className="flex justify-between w-full h-14 md:h-16 shrink-0 items-center gap-2 px-3 md:px-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Freelpay
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageName()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col p-3 md:p-4 pt-0 overflow-x-hidden relative z-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 