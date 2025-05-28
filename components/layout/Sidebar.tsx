"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import SidebarMenuItems from "../layout/SidebarMenuItems"

export default function LayoutSidebar() {
    return (
          <Sidebar className="bg-card border-r border-border">
            <SidebarHeader className="bg-card border-b border-border">
              <div className="p-8 flex justify-center">
                <h1 className="text-3xl font-bold text-primary font-serif select-none">
                  RPG Master
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent className="py-8 bg-card">
              <SidebarMenuItems />
            </SidebarContent>
          </Sidebar>
  )
}