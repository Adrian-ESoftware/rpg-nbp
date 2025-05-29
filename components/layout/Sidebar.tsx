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
    <Sidebar className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] shadow-inner border-r border-border">
      <SidebarHeader className="bg-card border-b border-border shadow-sm">
        <div className="p-4 flex justify-center items-center">
          <ThemedIcon />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-6 px-2 space-y-4 bg-card">
        <SidebarMenuItems />
      </SidebarContent>
    </Sidebar>
  )
}