"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SystemConfiguration, CharacterData } from "@/types/character-creation"

interface CharacterSummaryProps {
  characterData: CharacterData
  systemConfig: SystemConfiguration
  isSubmitting: boolean
  onCreateCharacter: () => void
}

export function CharacterSummary({
  characterData,
  systemConfig,
  isSubmitting,
  onCreateCharacter
}: CharacterSummaryProps) {
  const t = useTranslations('createCharacter')

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary" />
          <span>{t("characterSummary")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">{t("name")}:</span>
            <span className="text-sm font-medium text-right max-w-[60%]">
              {characterData.name || t("noName")}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t("system")}:</span>
            <Badge variant="outline" className="text-xs">
              {systemConfig.name}
            </Badge>
          </div>

          {characterData.legacy && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {systemConfig.identity.legacyLabel}:
              </span>
              <span className="text-sm font-medium">
                {systemConfig.identity.legacyOptions.find(l => l.id === characterData.legacy)?.name}
              </span>
            </div>
          )}

          {characterData.combatPath && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {systemConfig.identity.combatPathLabel}:
              </span>
              <span className="text-sm font-medium">
                {systemConfig.identity.combatPathOptions.find(p => p.id === characterData.combatPath)?.name}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t("hitPoints")}:</span>
            <span className="text-sm font-medium">{characterData.hitPoints}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t("energyPoints")}:</span>
            <span className="text-sm font-medium">{characterData.energyPoints}</span>
          </div>

          {characterData.skills.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">{t("selectedSkills")}:</span>
                <div className="flex flex-wrap gap-1">
                  {characterData.skills.slice(0, 3).map((skillId, index) => {
                    const skill = systemConfig.skills.available.find(s => s.id === skillId)
                    return (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill?.name}
                      </Badge>
                    )
                  })}
                  {characterData.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{characterData.skills.length - 3} {t("more")}
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <Separator />

        <Button
          onClick={onCreateCharacter}
          disabled={isSubmitting || !characterData.name.trim()}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t("creating")}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>{t("createCharacter")}</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {t("afterCreateMessage")}
        </p>
      </CardContent>
    </Card>
  )
}
