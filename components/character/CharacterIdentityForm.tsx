"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { User, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <User className="w-6 h-6 text-primary" />
          <span>{t("characterIdentity")}</span>
        </CardTitle>
        <CardDescription className="text-base">
          {t("characterIdentityDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        <div className="space-y-3">
          <Label htmlFor="character-name" className="text-base font-medium">{t("characterName")} *</Label>
          <Input
            id="character-name"
            value={characterData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder={t("characterNamePlaceholder")}
            className={`h-12 text-base ${errors.name ? "border-destructive focus:border-destructive" : "border-primary/30 focus:border-primary"}`}
          />
          {errors.name && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">{systemConfig.identity.legacyLabel} *</Label>
            <Select
              value={characterData.legacy}
              onValueChange={(value) => onInputChange("legacy", value)}
            >
              <SelectTrigger
                className={`h-12 text-base text-left ${errors.legacy ? "border-destructive focus:border-destructive" : "border-primary/30 focus:border-primary"}`}
              >
                <SelectValue placeholder={t("selectLegacy")} />
              </SelectTrigger>
              <SelectContent>
                {systemConfig.identity.legacyOptions.map((legacy) => (
                  <SelectItem key={legacy.id} value={legacy.id} textValue={legacy.name}>
                    <div className="flex flex-col">
                      <span className="font-medium">{legacy.name}</span>
                      <span className="text-xs text-muted-foreground">{legacy.description}</span>
                    </div>
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

          <div className="space-y-3">
            <Label className="text-base font-medium">{systemConfig.identity.combatPathLabel} *</Label>
            <Select
              value={characterData.combatPath}
              onValueChange={(value) => onInputChange("combatPath", value)}
            >
              <SelectTrigger
                className={`h-12 text-base text-left ${errors.combatPath ? "border-destructive focus:border-destructive" : "border-primary/30 focus:border-primary"}`}
              >
                <SelectValue placeholder={t("selectCombatPath")} />
              </SelectTrigger>
              <SelectContent>
                {systemConfig.identity.combatPathOptions.map((path) => (
                  <SelectItem key={path.id} value={path.id} textValue={path.name}>
                    <div className="flex flex-col">
                      <span className="font-medium">{path.name}</span>
                      <span className="text-xs text-muted-foreground">{path.description}</span>
                    </div>
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

        <div className="space-y-3">
          <Label htmlFor="background" className="text-base font-medium">{t("background")}</Label>
          <Textarea
            id="background"
            value={characterData.background}
            onChange={(e) => onInputChange("background", e.target.value)}
            rows={4}
            placeholder={t("backgroundPlaceholder")}
            className="resize-none text-base border-primary/30 focus:border-primary"
          />
        </div>
      </CardContent>
    </>
  )
}
