"use client"

import React, { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

const Dashboard: React.FC = () => {
  const [roomCode, setRoomCode] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <SidebarProvider>
        <div className="flex min-h-screen text-gray-100">
          {/* Sidebar */}
          <Sidebar className="!bg-gray-950 border-r border-yellow-900/30" style={{ backgroundColor: "#1f2937" }}>
            <SidebarHeader className="!bg-gray-950 border-b border-yellow-900/30" style={{ backgroundColor: "#1f2937" }}>
              <div className="p-8 flex justify-center">
                <h1 className="text-3xl font-bold text-emerald-400 font-serif">RPG Master</h1>
              </div>
            </SidebarHeader>

            <SidebarContent className="!bg-gray-950 py-8" style={{ backgroundColor: "#1f2937" }}>
              <SidebarMenuItems />
            </SidebarContent>

            <SidebarUserProfile />
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
            <div className="p-10 overflow-y-auto relative z-10">
              {/* Header with Sidebar Trigger */}
              <div className="flex items-center mb-6">
                <SidebarTrigger className="text-gray-100 hover:text-emerald-300" />
              </div>

              {/* Top Section - Welcome and Join Room side by side */}
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