"use client"

import React, { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import SidebarMenuItems from "./SidebarMenuItems"
import SidebarUserProfile from "./SidebarUserProfile"
import WelcomeBanner from "./WelcomeBanner"
import JoinRoomPanel from "./JoinRoomPanel"
import ActionButtons from "./ActionButtons"
import RecentCampaigns from "./RecentCampaigns"
import NotificationsPanel from "./NotificationsPanel"
import { useTheme } from "next-themes"

const themes = ["light", "dark", "rpg", "fantasy"]

const Dashboard: React.FC = () => {
  const [roomCode, setRoomCode] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // evita erro de hydration
  }

  function toggleTheme() {
    const currentIndex = themes.indexOf(theme ?? "light")
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const displayTheme = theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Light"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <div className="flex min-h-screen text-foreground">
          {/* Sidebar */}
          <Sidebar className="bg-sidebar border-r border-sidebar-border">
            <SidebarHeader className="bg-sidebar border-b border-sidebar-border">
              <div className="p-8 flex justify-center">
                <h1 className="text-3xl font-bold text-sidebar-primary font-serif select-none">
                  RPG Master
                </h1>
              </div>
            </SidebarHeader>

            <SidebarContent className="py-8 bg-sidebar">
              <SidebarMenuItems />
            </SidebarContent>

            <SidebarUserProfile />
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="bg-background">
            <div className="p-10 overflow-y-auto relative z-10">
              <div className="flex items-center mb-6 justify-between">
                <SidebarTrigger className="text-foreground hover:text-primary cursor-pointer" />

                <button
                  onClick={toggleTheme}
                  className="
                    bg-primary
                    hover:bg-primary/90
                    text-primary-foreground
                    font-semibold
                    py-2 px-4
                    rounded-lg
                    shadow
                    transition-colors duration-200
                    select-none
                  "
                  aria-label="Alternar tema"
                  title="Alternar tema"
                >
                  Tema: {displayTheme}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <WelcomeBanner />
                </div>
                <div className="lg:col-span-1">
                  <JoinRoomPanel roomCode={roomCode} setRoomCode={setRoomCode} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <ActionButtons />
                  <RecentCampaigns />
                </div>
                <div className="lg:col-span-1">
                  <NotificationsPanel />
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard