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
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative overflow-hidden custom-scrollbar">
      {/* Enhanced Floating Elements - more dispersed */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-32 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-3/5 left-32 w-44 h-44 bg-secondary/12 rounded-full blur-2xl animate-pulse delay-200"></div>
      <div className="absolute top-1/6 left-1/3 w-20 h-20 bg-primary/18 rounded-full blur-lg animate-pulse delay-800"></div>
      <div className="absolute bottom-1/6 right-1/4 w-32 h-32 bg-accent/22 rounded-full blur-xl animate-pulse delay-400"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="pt-20 pb-16">
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-8 tracking-tight">
                {t('title')}
              </h1>
              
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Main Settings */}
            <div className="xl:col-span-2 space-y-12">
              {/* Theme Section */}
              <div className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-2xl p-8 shadow-2xl relative z-[100]  overflow-visible">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  {t('appearance')}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {t('appearanceDescription')}
                </p>
                <div className="relative z-[100] overflow-visible">
                  <ThemeSwitcher />
                </div>
              </div>

              {/* Language Section */}
              <div className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-2xl p-8 shadow-2xl relative z-50 overflow-visible">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  {t('language')}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {t('languageDescription')}
                </p>
                <div className="relative z-[100] overflow-visible">
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Settings Categories */}
              {settingsCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <div key={category.title} className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-2xl p-8 shadow-2xl relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-card-foreground">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <button
                          key={item.labelKey}
                          onClick={item.action}
                          className="w-full text-left p-4 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-accent/30 hover:text-accent-foreground transition-all duration-300 border border-border/30 shadow-md hover:shadow-lg"
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
            <div className="space-y-12">
              {/* Quick Actions */}
              <div className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-2xl p-8 shadow-2xl sticky top-8">
                <h3 className="text-lg font-semibold text-card-foreground mb-6">
                  {t('quickActions')}
                </h3>
                <div className="space-y-4">
                  <button className="w-full p-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-primary/30">
                    {t('exportData')}
                  </button>
                  <button className="w-full p-4 bg-secondary/80 backdrop-blur-sm text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-secondary/30">
                    {t('backupCharacters')}
                  </button>
                  <button className="w-full p-4 bg-destructive/20 backdrop-blur-sm text-destructive rounded-xl hover:bg-destructive/30 transition-all duration-300 flex items-center justify-center space-x-2 border border-destructive/30 shadow-lg hover:shadow-xl">
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