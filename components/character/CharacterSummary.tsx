"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Shield, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  const selectedLegacy = systemConfig.identity.legacyOptions.find(l => l.id === characterData.legacy);
  const selectedCombatPath = systemConfig.identity.combatPathOptions.find(p => p.id === characterData.combatPath);

  const backgroundSnippet = characterData.background 
    ? characterData.background 
    : t("noBackground");

  return (
    <>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <Shield className="w-6 h-6 text-primary" />
          <span>{t("characterSummary")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4 flex flex-col flex-grow">
        <div className="space-y-3 flex-grow">
          <div className="flex justify-between items-start">
            <span className="text-base text-muted-foreground font-medium">{t("name")}:</span>
            <span className="text-base font-semibold text-right max-w-[60%] truncate text-foreground">
              {characterData.name || t("noName")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base text-muted-foreground font-medium">{t("system")}:</span>
            <Badge variant="outline" className="text-sm font-medium border-primary/30">
              {systemConfig.name}
            </Badge>
          </div>

          {characterData.legacy && selectedLegacy && (
            <div className="flex justify-between items-start">
              <span className="text-base text-muted-foreground font-medium">
                {systemConfig.identity.legacyLabel}:
              </span>
              <span className="text-base font-semibold text-right max-w-[60%] truncate text-foreground">
                {selectedLegacy.name}
              </span>
            </div>
          )}

          {characterData.combatPath && selectedCombatPath && (
            <div className="flex justify-between items-start">
              <span className="text-base text-muted-foreground font-medium">
                {systemConfig.identity.combatPathLabel}:
              </span>
              <span className="text-base font-semibold text-right max-w-[60%] truncate text-foreground">
                {selectedCombatPath.name}
              </span>
            </div>
          )}
          
          <Separator className="bg-primary/20 my-3" />

          {/* Background Snippet */}
          <div>
            <div className="flex items-center text-base text-muted-foreground font-medium mb-1">
              <BookOpen className="w-4 h-4 mr-2 text-primary" />
              <span>{t("backgroundTitle")}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3 overflow-hidden break-words"> {/* Added overflow-hidden and break-words to assist line-clamp */}
              {backgroundSnippet}
            </p>
          </div>
          
          <Separator className="bg-primary/20 my-3" />

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-sm text-muted-foreground font-medium">{t("hitPoints")}</div>
              <div className="text-2xl font-bold text-primary">{characterData.hitPoints}</div>
            </div>
            <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-sm text-muted-foreground font-medium">{t("energyPoints")}</div>
              <div className="text-2xl font-bold text-primary">{characterData.energyPoints}</div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <Button
            onClick={onCreateCharacter}
            disabled={isSubmitting || !characterData.name.trim()}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>{t("creating")}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>{t("createCharacter")}</span>
              </div>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center leading-relaxed mt-4">
            {t("afterCreateMessage")}
          </p>
        </div>
      </CardContent>
    </>
  )
}
