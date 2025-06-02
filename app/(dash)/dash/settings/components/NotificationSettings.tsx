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
    <Card className="shadow-lg border-border/50 bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t('notificationSettings')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {/* Campaign Notifications */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
              <span className="text-sm font-medium">{t('campaignNotifications')}</span>
              <Switch
                checked={campaignNotifications}
                onCheckedChange={setCampaignNotifications}
                aria-label={t('campaignNotifications')}
              />
            </div>

            {/* Invite Notifications */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
              <span className="text-sm font-medium">{t('inviteNotifications')}</span>
              <Switch
                checked={inviteNotifications}
                onCheckedChange={setInviteNotifications}
                aria-label={t('inviteNotifications')}
              />
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
              <span className="text-sm font-medium">{t('twoFactorAuth')}</span>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
                aria-label={t('twoFactorAuth')}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            {t('save')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}