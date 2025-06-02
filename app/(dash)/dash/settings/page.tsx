"use client"

import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { User, Bell, Shield, LogOut, Palette, Globe, Download, Database } from "lucide-react"
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
      {/* Enhanced Floating Elements */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-32 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-3/5 left-32 w-44 h-44 bg-secondary/12 rounded-full blur-2xl animate-pulse delay-200"></div>
      <div className="absolute top-1/6 left-1/3 w-20 h-20 bg-primary/18 rounded-full blur-lg animate-pulse delay-800"></div>
      <div className="absolute bottom-1/6 right-1/4 w-32 h-32 bg-accent/22 rounded-full blur-xl animate-pulse delay-400"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-8xl">
          {/* Header */}
          <div className="pt-4 pb-2">
            <div className="text-center mb-3">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-1 tracking-tight leading-[1.2] pb-3">
                {t('title')}
              </h1>
              
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 pb-20">
            
            {/* Left Column - Customization */}
            <div className="xl:col-span-1 space-y-8 relative">
              {/* Theme Section */}
              <div className="bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.01] transition-all duration-300 relative z-[200] overflow-visible">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-card-foreground">
                      {t('appearance')}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {t('appearanceDescription')}
                    </p>
                  </div>
                </div>
                <div className="relative overflow-visible">
                  <ThemeSwitcher />
                </div>
              </div>

              {/* Language Section */}
              <div className="bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.01] transition-all duration-300 relative z-[100] overflow-visible">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent/30">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-card-foreground">
                      {t('language')}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {t('languageDescription')}
                    </p>
                  </div>
                </div>
                <div className="relative overflow-visible">
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-secondary/20 backdrop-blur-sm rounded-xl border border-secondary/30">
                    <Database className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {t('quickActions')}
                    </h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full p-4 bg-gradient-to-r from-primary/80 via-accent/70 to-primary/80 hover:from-primary hover:via-accent hover:to-primary text-primary-foreground backdrop-blur-md rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl border border-primary/30 transform hover:scale-[1.02] hover:-translate-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>{t('exportData')}</span>
                    </div>
                  </button>
                  <button className="w-full p-4 bg-secondary/60 backdrop-blur-md text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all duration-500 shadow-xl hover:shadow-2xl border border-secondary/30 transform hover:scale-[1.02] hover:-translate-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>{t('backupCharacters')}</span>
                    </div>
                  </button>
                  <button className="w-full p-4 bg-destructive/30 backdrop-blur-md text-destructive rounded-xl hover:bg-destructive/50 transition-all duration-500 flex items-center justify-center space-x-2 border border-destructive/40 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1">
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Settings Categories */}
            <div className="xl:col-span-3 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8">
                {settingsCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <div key={category.title} className="bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30">
                          <IconComponent className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-card-foreground">
                            {category.title}
                          </h2>
                          <p className="text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.items.map((item) => (
                          <button
                            key={item.labelKey}
                            onClick={item.action}
                            className="w-full text-left p-6 rounded-xl bg-background/60 backdrop-blur-md hover:bg-accent/40 hover:text-accent-foreground transition-all duration-500 border border-border/30 shadow-lg hover:shadow-xl transform hover:scale-[1.01] hover:-translate-y-0.5"
                          >
                            <div className="font-medium">{t(item.labelKey)}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}