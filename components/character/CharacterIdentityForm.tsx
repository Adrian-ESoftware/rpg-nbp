"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <User className="w-6 h-6 text-primary" />
          <span>{t('characterIdentity')}</span>
        </CardTitle>
        <CardDescription className="text-base">
          {t('characterIdentityDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Character Name */}
        <div className="space-y-2">
          <Label htmlFor="characterName" className="text-base font-medium">
            {t('characterName')}
          </Label>
          <Input
            id="characterName"
            placeholder={t('characterNamePlaceholder')}
            value={characterData.name || ''}
            onChange={(e) => onInputChange('name', e.target.value)}
            className={`h-12 text-base ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Race/Legacy */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            {system.id === 'gaia' ? t('legacy') : 'Raça'}
          </Label>
          <Select
            value={characterData.race || ''}
            onValueChange={(value) => onInputChange('race', value)}
          >
            <SelectTrigger className={`h-12 text-base ${errors.race ? 'border-destructive' : ''}`}>
              <SelectValue placeholder={t('selectLegacy')} />
            </SelectTrigger>
            <SelectContent>
              {system.races.map((race) => (
                <SelectItem key={race.id} value={race.id}>
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{tSystem(race.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {tSystem(race.description)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.race && (
            <p className="text-sm text-destructive">{errors.race}</p>
          )}
        </div>

        {/* Class/Combat Path */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            {system.id === 'gaia' ? t('combatPath') : 'Classe'}
          </Label>
          <Select
            value={characterData.class || ''}
            onValueChange={(value) => onInputChange('class', value)}
          >
            <SelectTrigger className={`h-12 text-base ${errors.class ? 'border-destructive' : ''}`}>
              <SelectValue placeholder={t('selectCombatPath')} />
            </SelectTrigger>
            <SelectContent>
              {system.classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{tSystem(cls.name)}</span>
                    <span className="text-xs text-muted-foreground">
                      {tSystem(cls.description)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.class && (
            <p className="text-sm text-destructive">{errors.class}</p>
          )}
        </div>

        {/* Background */}
        <div className="space-y-2">
          <Label htmlFor="background" className="text-base font-medium flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>{t('background')}</span>
          </Label>
          <Textarea
            id="background"
            placeholder={t('backgroundPlaceholder')}
            value={characterData.background || ''}
            onChange={(e) => onInputChange('background', e.target.value)}
            className="min-h-[120px] text-base resize-none"
          />
        </div>
      </CardContent>
    </>
  )
}
