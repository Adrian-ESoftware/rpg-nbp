import React from "react"
import Link from "next/link"
import { Castle, Shield, Scroll, DoorOpen, Wand2, Settings } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navigationItems = [
  { id: "dashboard", icon: Castle, label: "Dashboard", href: "/" },
  { id: "create-character", icon: Shield, label: "Criar Personagem", href: "/create-character" },
  { id: "campaigns", icon: Scroll, label: "Minhas Campanhas", href: "/campaigns" },
  { id: "join-room", icon: DoorOpen, label: "Entrar em Sala", href: "/join-room" },
  { id: "master-tools", icon: Wand2, label: "Ferramentas do Mestre", href: "/master-tools" },
  { id: "settings", icon: Settings, label: "Configurações", href: "/settings" },
]

const SidebarMenuItems: React.FC = () => (
  <SidebarMenu className="space-y-2">
    {navigationItems.map((item) => {
      const IconComponent = item.icon
      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            asChild
            className="w-full text-left px-8 py-4 flex items-center space-x-4 transition-all duration-200 hover:bg-emerald-900/20 hover:text-emerald-300 data-[active=true]:bg-emerald-900/30 data-[active=true]:text-emerald-300 data-[active=true]:border-l-4 data-[active=true]:border-emerald-400 text-gray-100"
          >
            <Link href={item.href} className="flex items-center space-x-4 w-full">
              <IconComponent className="w-6 h-6 text-emerald-400" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    })}
  </SidebarMenu>
)

export default SidebarMenuItems