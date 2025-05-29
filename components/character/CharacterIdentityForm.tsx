"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { User, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SystemConfiguration, CharacterData } from "@/types/character-creation"

interface CharacterIdentityFormProps {
  characterData: CharacterData
  systemConfig: SystemConfiguration
  errors: Record<string, string>
  onInputChange: (field: string, value: any) => void
}

export function CharacterIdentityForm({
  characterData,
  systemConfig,
  errors,
  onInputChange
}: CharacterIdentityFormProps) {
  const t = useTranslations('createCharacter')

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-primary" />
          <span>{t("characterIdentity")}</span>
        </CardTitle>
        <CardDescription>
          {t("characterIdentityDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="character-name">{t("characterName")} *</Label>
          <Input
            id="character-name"
            value={characterData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder={t("characterNamePlaceholder")}
            className={errors.name ? "border-destructive focus:border-destructive" : ""}
          />
          {errors.name && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>{systemConfig.identity.legacyLabel} *</Label>
            <Select
              value={characterData.legacy}
              onValueChange={(value) => onInputChange("legacy", value)}
            >
              <SelectTrigger
                className={errors.legacy ? "border-destructive focus:border-destructive" : ""}
              >
                <SelectValue placeholder={t("selectLegacy")} />
              </SelectTrigger>
              <SelectContent>
                {systemConfig.identity.legacyOptions.map((legacy) => (
                  <SelectItem key={legacy.id} value={legacy.id}>
                    {legacy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.legacy && (
              <div className="flex items-center space-x-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.legacy}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>{systemConfig.identity.combatPathLabel} *</Label>
            <Select
              value={characterData.combatPath}
              onValueChange={(value) => onInputChange("combatPath", value)}
            >
              <SelectTrigger
                className={errors.combatPath ? "border-destructive focus:border-destructive" : ""}
              >
                <SelectValue placeholder={t("selectCombatPath")} />
              </SelectTrigger>
              <SelectContent>
                {systemConfig.identity.combatPathOptions.map((path) => (
                  <SelectItem key={path.id} value={path.id}>
                    {path.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.combatPath && (
              <div className="flex items-center space-x-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.combatPath}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="background">{t("background")}</Label>
          <Textarea
            id="background"
            value={characterData.background}
            onChange={(e) => onInputChange("background", e.target.value)}
            rows={3}
            placeholder={t("backgroundPlaceholder")}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  )
}
