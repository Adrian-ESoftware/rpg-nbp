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
    { id: "create-character", icon: Shield, label: t('createCharacter'), href: "/dash/create-character" },
    { id: "campaigns", icon: Scroll, label: t('campaigns'), href: "/dash/campaigns" },
    { id: "join-room", icon: DoorOpen, label: t('joinRoom'), href: "/join-room" },
    { id: "master-tools", icon: Wand2, label: t('masterTools'), href: "/master-tools" },
    { id: "settings", icon: Settings, label: t('settings'), href: "/dash/settings" },
  ]

  return (
    <SidebarMenu className="space-y-2 px-2">
      {navigationItems.map((item) => {
        const IconComponent = item.icon
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              className={`
                w-full text-left px-6 py-3 flex items-center gap-4
                rounded-md transition-all duration-300 ease-in-out
                hover:bg-primary/15 hover:text-primary
                data-[active=true]:bg-primary/25 data-[active=true]:text-primary
                data-[active=true]:border-l-4 data-[active=true]:border-primary
                font-medium tracking-wide text-foreground
              `}
            >
              <Link href={item.href} className="flex items-center gap-4 w-full">
                <IconComponent className="w-5 h-5 text-primary" />
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