import React, { useState } from "react"
import { useTranslations } from 'next-intl'
import { Bell, Scroll, Calendar, Settings, BookOpen, Mail } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const borderColorsByType: Record<string, string> = {
  update: "border-primary",
  event: "border-blue-500",
  system: "border-yellow-400",
  invite: "border-destructive",
}

interface NotificationItem {
  id: number
  titleKey: string
  contentKey: string
  date: string
  type: string
  icon: React.ComponentType<{ className?: string }>
}

const NotificationsPanel: React.FC = () => {
  const t = useTranslations('notifications')
  const tDashboard = useTranslations('dashboard')

  // Updated notifications data to use translation keys
  const initialNotifications: NotificationItem[] = [
    {
      id: 1,
      titleKey: "newExpansion",
      contentKey: "expansionContent",
      date: "27 de Maio, 2025",
      type: "update",
      icon: Scroll,
    },
    {
      id: 2,
      titleKey: "tournament",
      contentKey: "tournamentContent",
      date: "25 de Maio, 2025",
      type: "event",
      icon: Calendar,
    },
    {
      id: 3,
      titleKey: "maintenance",
      contentKey: "maintenanceContent",
      date: "24 de Maio, 2025",
      type: "system",
      icon: Settings,
    },
    {
      id: 4,
      titleKey: "newRulebook",
      contentKey: "rulebookContent",
      date: "20 de Maio, 2025",
      type: "update",
      icon: BookOpen,
    },
    {
      id: 5,
      titleKey: "campaignInvite",
      contentKey: "inviteContent",
      date: "18 de Maio, 2025",
      type: "invite",
      icon: Mail,
    },
  ]

  const [notificationList] = useState<NotificationItem[]>(initialNotifications)

  return (
    <div className="bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.01] bg-gradient-to-br from-card/70 via-card/50 to-card/30">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-card-foreground font-serif">
          {tDashboard('notificationsBoard')}
        </h2>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="space-y-4 pr-4">
          {notificationList.map((notification) => {
            const IconComponent = notification.icon
            const borderColorClass = borderColorsByType[notification.type] || "border-primary"
            
            return (
              <div
                key={notification.id}
                className={`
                  bg-background/60 backdrop-blur-sm p-4 rounded-xl border-l-4 ${borderColorClass}
                  hover:bg-accent/20 transition-all duration-300 shadow-lg hover:shadow-xl
                  transform hover:scale-[1.02] hover:-translate-y-0.5
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg flex-shrink-0 border border-primary/20">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground mb-2 text-sm">
                      {t(notification.titleKey)}
                    </h3>
                  
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {t(notification.contentKey)}
                    </p>
                  
                    <span className="text-xs text-muted-foreground/70 bg-background/40 px-2 py-1 rounded-md">
                      {notification.date}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default NotificationsPanel