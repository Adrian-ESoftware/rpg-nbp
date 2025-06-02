"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CardContent } from "@/components/ui/card"
import { User, BookOpen } from "lucide-react"
import type { RPGSystemConfig, CharacterSheet } from "@/types/rpg-systems"

interface CharacterIdentityFormProps {
  characterData: Partial<CharacterSheet>
  system: RPGSystemConfig
  errors: Record<string, string>
  onInputChange: (field: string, value: any) => void
  tSystem: (text: any) => string
}

export function CharacterIdentityForm({
  characterData,
  system,
  errors,
  onInputChange,
  tSystem
}: CharacterIdentityFormProps) {
  const t = useTranslations('createCharacter')

  return (
    <CardContent className="space-y-6 bg-card/40 backdrop-blur-2xl p-6 min-h-[550px] flex flex-col">
      {/* Title Section */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-primary drop-shadow-lg" />
          <h2 className="text-xl font-semibold">{t('characterIdentity')}</h2>
        </div>
        <p className="text-base text-muted-foreground">
          {t('characterIdentityDescription')}
        </p>
      </div>

      {/* Character Name */}
      <div className="space-y-3">
        <Label htmlFor="characterName" className="text-base font-medium">
          {t('characterName')}
        </Label>
        <Input
          id="characterName"
          placeholder={t('characterNamePlaceholder')}
          value={characterData.name || ''}
          onChange={(e) => onInputChange('name', e.target.value)}
          className={`h-12 text-base bg-card/30 backdrop-blur-xl border-border/60 focus:bg-card/50 focus:border-primary/70 focus:shadow-lg transition-all duration-300 shadow-md ${errors.name ? 'border-destructive' : ''}`}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Race/Legacy */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          {system.id === 'gaia' ? t('legacy') : 'Raça'}
        </Label>
        <Select
          value={characterData.race || ''}
          onValueChange={(value) => onInputChange('race', value)}
        >
          <SelectTrigger className={`h-12 text-base bg-card/30 backdrop-blur-xl border-border/60 hover:bg-card/50 focus:shadow-lg transition-all duration-300 shadow-md ${errors.race ? 'border-destructive' : ''}`}>
            <SelectValue placeholder={t('selectLegacy')} />
          </SelectTrigger>
          <SelectContent className="bg-card/70 backdrop-blur-2xl border-border/70 shadow-2xl">
            <ScrollArea className="h-[200px]">
              {system.races.map((race) => (
                <SelectItem key={race.id} value={race.id} className="hover:bg-muted/60 focus:bg-muted/60 backdrop-blur-sm hover:text-foreground focus:text-foreground">
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{tSystem(race.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {tSystem(race.description)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        {errors.race && (
          <p className="text-sm text-destructive">{errors.race}</p>
        )}
      </div>

      {/* Class/Combat Path */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          {system.id === 'gaia' ? t('combatPath') : 'Classe'}
        </Label>
        <Select
          value={characterData.class || ''}
          onValueChange={(value) => onInputChange('class', value)}
        >
          <SelectTrigger className={`h-12 text-base bg-card/30 backdrop-blur-xl border-border/60 hover:bg-card/50 focus:shadow-lg transition-all duration-300 shadow-md ${errors.class ? 'border-destructive' : ''}`}>
            <SelectValue placeholder={t('selectCombatPath')} />
          </SelectTrigger>
          <SelectContent className="bg-card/70 backdrop-blur-2xl border-border/70 shadow-2xl">
            <ScrollArea className="h-[200px]">
              {system.classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id} className="hover:bg-muted/60 focus:bg-muted/60 backdrop-blur-sm hover:text-foreground focus:text-foreground">
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{tSystem(cls.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {tSystem(cls.description)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        {errors.class && (
          <p className="text-sm text-destructive">{errors.class}</p>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Background - positioned at bottom */}
      <div className="space-y-3 mt-auto">
        <Label htmlFor="background" className="text-base font-medium flex items-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>{t('background')}</span>
        </Label>
        <ScrollArea className="h-[120px] rounded-md border border-border/60">
          <Textarea
            id="background"
            placeholder={t('backgroundPlaceholder')}
            value={characterData.background || ''}
            onChange={(e) => onInputChange('background', e.target.value)}
            className="min-h-[120px] text-base resize-none bg-card/30 border-0 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
          />
        </ScrollArea>
      </div>
    </CardContent>
  )
}
