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
    <Sidebar className="bg-gradient-to-b from-card/40 via-background/20 to-card/60 backdrop-blur-2xl border-r border-border/20 shadow-2xl">
      <SidebarHeader className="bg-card/30 backdrop-blur-xl border-b border-border/20 shadow-xl">
        <div className="p-4 flex justify-center items-center">
          <ThemedIcon />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4 px-2 space-y-2 bg-gradient-to-b from-card/10 via-background/20 to-card/30 backdrop-blur-xl">
        <SidebarMenuItems />
      </SidebarContent>
    </Sidebar>
  )
}