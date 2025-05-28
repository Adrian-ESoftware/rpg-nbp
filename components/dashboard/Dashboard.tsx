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
import RecentCampaigns from "./RecentCampaigns"
import NotificationsPanel from "./NotificationsPanel"

const Dashboard: React.FC = () => {
  const [roomCode, setRoomCode] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // evita erro de hydration
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <div className="flex min-h-screen text-foreground">
          {/* Sidebar */}
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

            <SidebarUserProfile />
          </Sidebar>
          <SidebarInset className="bg-background">
            {/* Header fixo no topo */}
            <div className="sticky top-0 z-20 bg-background border-b border-border p-4 flex items-center"> {/* Added flex and items-center */}
              {/* SidebarTrigger agora é arredondado */}
              <SidebarTrigger
                className="p-2 bg-card rounded-full text-foreground hover:text-primary cursor-pointer border border-transparent hover:border-primary transition-colors duration-200"
              />
            </div>

            <div className="p-10 overflow-y-auto relative z-10">
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