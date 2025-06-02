"use client"
import React, { useState, useEffect } from "react"
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
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
      {/* Enhanced Floating Elements - more dispersed */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-32 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-3/5 left-32 w-44 h-44 bg-secondary/12 rounded-full blur-2xl animate-pulse delay-200"></div>
      <div className="absolute top-1/6 left-1/3 w-20 h-20 bg-primary/18 rounded-full blur-lg animate-pulse delay-800"></div>
      <div className="absolute bottom-1/6 right-1/4 w-32 h-32 bg-accent/22 rounded-full blur-xl animate-pulse delay-400"></div>

      <div className="flex min-h-screen text-foreground relative z-10">
        <div className="container mx-auto px-2 md:px-4 max-w-full py-8 overflow-y-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <WelcomeBanner />
            </div>
            <div className="lg:col-span-1">
              <JoinRoomPanel roomCode={roomCode} setRoomCode={setRoomCode} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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