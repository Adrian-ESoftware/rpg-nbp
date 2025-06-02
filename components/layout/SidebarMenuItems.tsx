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
    { id: "settings", icon: Settings, label: t('settings'), href: "/dash/settings" },
  ]

  return (
    <SidebarMenu className="space-y-2.5 px-2">
      {navigationItems.map((item) => {
        const IconComponent = item.icon
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              className={`
                w-full text-left px-4 py-3.5 flex items-center gap-3.5
                rounded-xl transition-all duration-300 ease-out
                bg-card/15 backdrop-blur-md border border-white/10 shadow-lg
                hover:bg-card/25 hover:border-white/20 hover:shadow-xl
                hover:transform hover:scale-[1.03]
                data-[active=true]:bg-primary/20 data-[active=true]:text-primary-foreground data-[active=true]:border-primary/40
                data-[active=true]:shadow-2xl data-[active=true]:scale-[1.03]
                font-medium tracking-wide text-foreground/80 hover:text-foreground
                group relative overflow-hidden
              `}
            >
              <Link href={item.href} className="flex items-center gap-3 w-full relative z-10">
                {/* Icon without a separate styled container */}
                <IconComponent className="
                  w-5 h-5 text-primary 
                  group-hover:text-primary 
                  group-data-[active=true]:text-primary-foreground
                  transition-colors duration-300
                  flex-shrink-0
                " />
                <span className="
                  whitespace-nowrap text-sm 
                  group-hover:text-foreground 
                  group-data-[active=true]:text-primary-foreground
                  transition-colors duration-300
                ">{item.label}</span>
                
                {/* Subtle background glow on hover/active */}
                <div className="
                  absolute inset-0 rounded-xl 
                  opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100
                  transition-opacity duration-300 
                  bg-gradient-to-r 
                  from-primary/5 via-transparent to-accent/5 
                  group-data-[active=true]:from-primary/10 group-data-[active=true]:to-accent/10
                " />

                {/* Active state indicator line (optional, can be styled further) */}
                <div className="
                  absolute left-0 top-0 bottom-0 w-1 
                  bg-primary rounded-l-xl
                  opacity-0 group-data-[active=true]:opacity-100
                  transition-opacity duration-300
                " />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export default SidebarMenuItems