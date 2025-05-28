import React from "react"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { Castle, Shield, Scroll, DoorOpen, Wand2, Settings } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const SidebarMenuItems: React.FC = () => {
  const t = useTranslations('navigation')

  const navigationItems = [
    { id: "dashboard", icon: Castle, label: t('dashboard'), href: "/dash" },
    { id: "create-character", icon: Shield, label: t('createCharacter'), href: "/create-character" },
    { id: "campaigns", icon: Scroll, label: t('campaigns'), href: "/campaigns" },
    { id: "join-room", icon: DoorOpen, label: t('joinRoom'), href: "/join-room" },
    { id: "master-tools", icon: Wand2, label: t('masterTools'), href: "/master-tools" },
    { id: "settings", icon: Settings, label: t('settings'), href: "/dash/settings" },
  ]

  return (
    <SidebarMenu className="space-y-2">
      {navigationItems.map((item) => {
        const IconComponent = item.icon
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              className={`
                w-full text-left px-8 py-4 flex items-center space-x-4
                transition-all duration-200
                hover:bg-primary/20 hover:text-primary
                data-[active=true]:bg-primary/30 data-[active=true]:text-primary
                data-[active=true]:border-l-4 data-[active=true]:border-primary
                text-foreground
              `}
            >
              <Link href={item.href} className="flex items-center space-x-4 w-full">
                <IconComponent className="w-6 h-6 text-primary" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export default SidebarMenuItems