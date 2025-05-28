"use client"

import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { User, Bell, Shield, LogOut, Globe } from "lucide-react"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('settings')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const settingsCategories = [
    {
      title: t('profile'),
      icon: User,
      description: t('profileDescription'),
      items: [
        { labelKey: "editProfile", action: () => console.log("Editar perfil") },
        { labelKey: "changePassword", action: () => console.log("Alterar senha") },
      ]
    },
    {
      title: t('notifications'),
      icon: Bell,
      description: t('notificationsDescription'),
      items: [
        { labelKey: "campaignNotifications", action: () => console.log("Campanhas") },
        { labelKey: "inviteNotifications", action: () => console.log("Convites") },
      ]
    },
    {
      title: t('security'),
      icon: Shield,
      description: t('securityDescription'),
      items: [
        { labelKey: "twoFactorAuth", action: () => console.log("2FA") },
        { labelKey: "activeSessions", action: () => console.log("Sessões") },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-card-foreground mb-2">
                {t('appearance')}
              </h2>
              <p className="text-muted-foreground text-sm mb-3">
                {t('appearanceDescription')}
              </p>
              <ThemeSwitcher />
            </div>

            {/* Language Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-card-foreground mb-2">
                {t('language')}
              </h2>
              <p className="text-muted-foreground text-sm mb-3">
                {t('languageDescription')}
              </p>
              <LanguageSwitcher />
            </div>

            {/* Settings Categories */}
            {settingsCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.title} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-card-foreground">
                        {category.title}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <button
                        key={item.labelKey}
                        onClick={item.action}
                        className="w-full text-left p-3 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {t(item.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                {t('quickActions')}
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  {t('exportData')}
                </button>
                <button className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  {t('backupCharacters')}
                </button>
                <div className="space-y-3">
                <button className="w-full p-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}