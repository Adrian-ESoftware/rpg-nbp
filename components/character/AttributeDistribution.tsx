"use client"

import React from "react"
import { useTranslations, useLocale } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Plus, Minus } from "lucide-react"
import { localizedData } from "@/lib/character-systems"
import { systemConfigurations } from "@/lib/character-systems"
import type { AttributeOption } from "@/types/character-creation"

interface AttributeDistributionProps {
  attributes: AttributeOption[]
  values: Record<string, number>
  onChange: (values: Record<string, number>) => void
  totalPoints: number
  maxPerAttribute: number
  error?: string
  systemId?: string
  isKnowledge?: boolean
  sectionLabel?: string
}

export function AttributeDistribution({
  attributes,
  values,
  onChange,
  totalPoints,
  maxPerAttribute,
  error,
  systemId = "gaia",
  isKnowledge = false,
  sectionLabel
}: AttributeDistributionProps) {
  const t = useTranslations('createCharacter')
  const locale = useLocale() as 'pt' | 'en' | 'es'
  const usedPoints = Object.values(values).reduce((sum, val) => sum + (val || 0), 0)
  const remainingPoints = totalPoints - usedPoints

  const handleChange = (attributeId: string, newValue: number) => {
    const clampedValue = Math.max(0, Math.min(maxPerAttribute, newValue))
    onChange({
      ...values,
      [attributeId]: clampedValue
    })
  }

  const getTranslatedText = (attributeId: string, field: 'name' | 'description', fallback: string) => {
    try {
      // Use localized data from character-systems as primary source
      const systemData = localizedData[systemId as keyof typeof localizedData]
      
      if (systemData) {
        // First try the specified section (attributes or knowledge)
        const section = isKnowledge ? 'knowledge' : 'attributes'
        let sectionData = systemData[section as keyof typeof systemData] as any
        let itemData = sectionData?.items?.[attributeId]
        
        // If not found, try the opposite section
        if (!itemData) {
          const oppositeSection = isKnowledge ? 'attributes' : 'knowledge'
          sectionData = systemData[oppositeSection as keyof typeof systemData] as any
          itemData = sectionData?.items?.[attributeId]
        }
        
        if (itemData && itemData[field]) {
          const translatedValue = itemData[field][locale] || itemData[field]['pt'] || fallback
          return translatedValue
        }
      }
      
      return fallback
    } catch (error) {
      console.warn(`Translation failed for attributeId: ${attributeId}, field: ${field}`, error)
      return fallback
    }
  }

  const getSectionLabel = (): string => {
    // Tenta pegar do characterSystems usando next-intl
    try {
      const tSystems = useTranslations('characterSystems');
      if (systemId === 'gaia') {
        if (isKnowledge) {
          return tSystems('gaia.knowledge.label');
        } else {
          return tSystems('gaia.attributes.label');
        }
      } else if (systemId === 'dnd5e') {
        if (isKnowledge) {
          return tSystems('dnd5e.knowledge.label');
        } else {
          return tSystems('dnd5e.attributes.label');
        }
      }
    } catch (error) {
      console.warn('Error getting label from characterSystems:', error);
    }

    // Fallback baseado no sistema e idioma atual
    if (systemId === 'gaia') {
      if (isKnowledge) {
        switch (locale) {
          case 'en': return 'Knowledge';
          case 'es': return 'Conocimientos';
          default: return 'Conhecimentos';
        }
      } else {
        switch (locale) {
          case 'en': return 'Attributes';
          case 'es': return 'Atributos';
          default: return 'Parâmetros';
        }
      }
    } else if (systemId === 'dnd5e') {
      if (isKnowledge) {
        switch (locale) {
          case 'en': return 'Skills';
          case 'es': return 'Habilidades';
          default: return 'Perícias';
        }
      } else {
        switch (locale) {
          case 'en': return 'Attributes';
          case 'es': return 'Atributos';
          default: return 'Atributos';
        }
      }
    }

    // Fallback genérico final
    return isKnowledge ? 'Knowledge' : 'Attributes';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{getSectionLabel()}</h3>
          <span className="text-sm font-medium">{t('remainingPoints')}:</span>
        </div>
        <Badge variant={remainingPoints === 0 ? "default" : "secondary"}>
          {remainingPoints}/{totalPoints}
        </Badge>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attributes.map((attribute) => {
          const currentValue = values[attribute.id] || 0
          const canIncrease = currentValue < maxPerAttribute && remainingPoints > 0
          const canDecrease = currentValue > 0

          const attributeName = getTranslatedText(attribute.id, 'name', attribute.name)
          const attributeDescription = getTranslatedText(attribute.id, 'description', attribute.description)

          return (
            <div key={attribute.id} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Label className="font-medium">{attributeName}</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {attributeDescription}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleChange(attribute.id, currentValue - 1)}
                    disabled={!canDecrease}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Badge variant="outline" className="min-w-[2rem] text-center">
                    {currentValue}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleChange(attribute.id, currentValue + 1)}
                    disabled={!canIncrease}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
