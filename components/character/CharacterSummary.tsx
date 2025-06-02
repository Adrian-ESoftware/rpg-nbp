"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Scroll, Loader2 } from "lucide-react"
import type { RPGSystemConfig, CharacterSheet } from "@/types/rpg-systems"

interface CharacterSummaryProps {
  characterData: Partial<CharacterSheet>
  system: RPGSystemConfig
  isSubmitting: boolean
  onCreateCharacter: () => void
  tSystem: (text: any) => string
}

export function CharacterSummary({
  characterData,
  system,
  isSubmitting,
  onCreateCharacter,
  tSystem
}: CharacterSummaryProps) {
  const t = useTranslations('createCharacter')

  const getRaceName = () => {
    if (!characterData.race) return t('selectLegacy')
    const race = system.races.find(r => r.id === characterData.race)
    return race ? tSystem(race.name) : characterData.race
  }

  const getClassName = () => {
    if (!characterData.class) return t('selectCombatPath')
    const cls = system.classes.find(c => c.id === characterData.class)
    return cls ? tSystem(cls.name) : characterData.class
  }

  const getAttributeCount = () => {
    return Object.values(characterData.attributes || {}).reduce((sum, val) => sum + (val || 0), 0)
  }

  const getSkillCount = () => {
    return Object.values(characterData.skills || {}).reduce((sum, val) => sum + (val || 0), 0)
  }

  return (
    <CardContent className="space-y-6 bg-card/40 p-6 min-h-[550px] flex flex-col">
      {/* Title Section */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-3">
          <Scroll className="w-6 h-6 text-primary drop-shadow-lg" />
          <h2 className="text-xl font-semibold">{t('characterSummary')}</h2>
        </div>
        <p className="text-base text-muted-foreground">
          {t('summaryDescription')}
        </p>
      </div>

      {/* Basic Info */}
      <div className="space-y-4 p-4 bg-card/60 rounded-lg border border-border/60 shadow-xl hover:bg-card/70 transition-all duration-300">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{t('name')}:</span>
          <span>{characterData.name || t('noName')}</span>
        </div>
        
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('system')}:</span>
            <span>{tSystem(system.name)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {system.id === 'gaia' ? t('legacy') : 'Raça'}:
            </span>
            <span>{getRaceName()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {system.id === 'gaia' ? t('combatPath') : 'Classe'}:
            </span>
            <span>{getClassName()}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50 shadow-sm" />

      {/* Resources */}
      <div className="space-y-4">
        <h4 className="font-semibold">{t('resources')}</h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/60 shadow-lg hover:bg-card/70 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full drop-shadow-md"></div>
              <span className="text-sm font-medium">{tSystem(system.resources.hitPoints.name)}</span>
            </div>
            <Badge variant="outline" className="text-sm font-bold bg-card/60 border-border/50 shadow-md">
              {characterData.hitPoints?.max || system.resources.hitPoints.base}
            </Badge>
          </div>
          {system.resources.secondaryResource && (
            <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/60 shadow-lg hover:bg-card/70 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full drop-shadow-md"></div>
                <span className="text-sm font-medium">{tSystem(system.resources.secondaryResource.name)}</span>
              </div>
              <Badge variant="outline" className="text-sm font-bold bg-card/60 border-border/50 shadow-md">
                {characterData.secondaryResource?.max || system.resources.secondaryResource.base}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-border/50 shadow-sm" />

      {/* Progress */}
      <div className="space-y-4">
        <h4 className="font-semibold">{t('progress')}</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-card/40 rounded-lg border border-border/50 shadow-md">
            <span className="text-sm font-medium">{tSystem(system.attributes.label)}:</span>
            <Badge variant={getAttributeCount() === system.attributes.totalPoints ? "default" : "secondary"} className="text-sm bg-card/60 border-border/50 shadow-md">
              {getAttributeCount()}/{system.attributes.totalPoints}
            </Badge>
          </div>
          {system.skills.totalPoints && (
            <div className="flex items-center justify-between p-3 bg-card/40 rounded-lg border border-border/50 shadow-md">
              <span className="text-sm font-medium">{tSystem(system.skills.label)}:</span>
              <Badge variant={getSkillCount() === system.skills.totalPoints ? "default" : "secondary"} className="text-sm bg-card/60 border-border/50 shadow-md">
                {getSkillCount()}/{system.skills.totalPoints}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Background */}
      {characterData.background && (
        <>
          <Separator className="bg-border/50 shadow-sm" />
          <div className="space-y-3 p-4 bg-card/40 rounded-lg border border-border/50 shadow-lg">
            <h4 className="font-semibold">{t('backgroundTitle')}</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {characterData.background}
            </p>
          </div>
        </>
      )}

      {/* Spacer to push button to bottom */}
      <div className="flex-1"></div>

      <Separator className="bg-border/50 shadow-sm" />

      {/* Create Button */}
      <div className="mt-auto space-y-4">
        <Button
          onClick={onCreateCharacter}
          disabled={isSubmitting}
          className="w-full h-12 text-base bg-primary/80 hover:bg-primary/90 border border-primary/40 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('creating')}
            </>
          ) : (
            t('createCharacter')
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {t('afterCreateMessage')}
        </p>
      </div>
    </CardContent>
  )
}
