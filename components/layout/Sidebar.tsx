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
    <Sidebar className="bg-gradient-to-b from-background/40 via-card/30 to-background/20 backdrop-blur-xl border-r border-border/30 shadow-2xl">
      <SidebarHeader className="bg-card/20 backdrop-blur-md border-b border-border/20 shadow-lg">
        <div className="p-4 flex justify-center items-center">
          <ThemedIcon />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-8 px-4 space-y-6 bg-gradient-to-b from-card/10 via-background/5 to-card/20 backdrop-blur-md">
        <SidebarMenuItems />
      </SidebarContent>
    </Sidebar>
  )
}