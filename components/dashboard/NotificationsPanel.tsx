import React, { useState } from "react"
import { useTranslations } from 'next-intl'
import { Bell, Scroll, Calendar, Settings, BookOpen, Mail } from "lucide-react"

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
    <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
        <Bell className="w-5 h-5 mr-3 text-primary" />
        {tDashboard('notificationsBoard')}
      </h2>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {notificationList.map((notification) => {
          const IconComponent = notification.icon
          const borderColorClass = borderColorsByType[notification.type] || "border-primary"
          
          return (
            <div
              key={notification.id}
              className={`
                bg-background/50 p-4 rounded-lg border-l-4 ${borderColorClass}
                hover:bg-accent/10 transition-all duration-200
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground mb-1 text-sm">
                    {t(notification.titleKey)}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {t(notification.contentKey)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NotificationsPanel