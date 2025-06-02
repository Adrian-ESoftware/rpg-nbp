"use client"

import React, { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationSettings() {
  const t = useTranslations('settings')
  const [campaignNotifications, setCampaignNotifications] = useState(false)
  const [inviteNotifications, setInviteNotifications] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  useEffect(() => {
    // Carregar configurações salvas
    const loadSettings = () => {
      const savedCampaignNotifications = localStorage.getItem('campaignNotifications')
      const savedInviteNotifications = localStorage.getItem('inviteNotifications')
      const savedTwoFactorAuth = localStorage.getItem('twoFactorAuth')

      if (savedCampaignNotifications !== null) {
        setCampaignNotifications(JSON.parse(savedCampaignNotifications))
      }
      if (savedInviteNotifications !== null) {
        setInviteNotifications(JSON.parse(savedInviteNotifications))
      }
      if (savedTwoFactorAuth !== null) {
        setTwoFactorAuth(JSON.parse(savedTwoFactorAuth))
      }
    }

    loadSettings()
  }, [])

  const handleSave = () => {
    // Salvar configurações
    localStorage.setItem('campaignNotifications', JSON.stringify(campaignNotifications))
    localStorage.setItem('inviteNotifications', JSON.stringify(inviteNotifications))
    localStorage.setItem('twoFactorAuth', JSON.stringify(twoFactorAuth))
  }

  return (
    <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg rounded-2xl">
      <CardHeader className="pb-4 bg-card/40 border-b border-border/60 shadow-lg rounded-t-2xl">
        <CardTitle className="text-lg font-semibold">
          {t('notificationSettings')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-card/20 space-y-6">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {/* Campaign Notifications */}
            <div className="flex items-center justify-between p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
              <span className="text-sm font-medium">{t('campaignNotifications')}</span>
              <Switch
                checked={campaignNotifications}
                onCheckedChange={setCampaignNotifications}
                aria-label={t('campaignNotifications')}
              />
            </div>

            {/* Invite Notifications */}
            <div className="flex items-center justify-between p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
              <span className="text-sm font-medium">{t('inviteNotifications')}</span>
              <Switch
                checked={inviteNotifications}
                onCheckedChange={setInviteNotifications}
                aria-label={t('inviteNotifications')}
              />
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
              <span className="text-sm font-medium">{t('twoFactorAuth')}</span>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
                aria-label={t('twoFactorAuth')}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t border-border/50">
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/40 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            {t('save')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}