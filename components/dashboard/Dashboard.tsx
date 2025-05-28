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
import SidebarMenuItems from "../layout/SidebarMenuItems"
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
        <div className="flex min-h-screen text-foreground">er
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
        </div>
    </div>
  )
}

export default Dashboard