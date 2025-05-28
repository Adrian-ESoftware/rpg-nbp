"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarMenuItems from "../layout/SidebarMenuItems"
import ThemedIcon from "../svg/ThemedIcon"

export default function LayoutSidebar() {
    return (
          <Sidebar className="bg-card border-r border-border">
            <SidebarHeader className="bg-card border-b border-border">
              <div className="p-2 flex justify-center">
                <ThemedIcon/>
              </div>
            </SidebarHeader>
            <SidebarContent className="py-8 bg-card">
              <SidebarMenuItems />
            </SidebarContent>
          </Sidebar>
  )
}