"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Plus, Minus } from "lucide-react"
import type { AttributeOption } from "@/types/character-creation"

interface AttributeDistributionProps {
  attributes: AttributeOption[]
  values: Record<string, number>
  onChange: (values: Record<string, number>) => void
  totalPoints: number
  maxPerAttribute: number
  error?: string
}

export function AttributeDistribution({
  attributes,
  values,
  onChange,
  totalPoints,
  maxPerAttribute,
  error
}: AttributeDistributionProps) {
  const t = useTranslations('createCharacter')
  const usedPoints = Object.values(values).reduce((sum, val) => sum + (val || 0), 0)
  const remainingPoints = totalPoints - usedPoints

  const handleChange = (attributeId: string, newValue: number) => {
    const clampedValue = Math.max(0, Math.min(maxPerAttribute, newValue))
    onChange({
      ...values,
      [attributeId]: clampedValue
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{t('remainingPoints')}:</span>
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

          return (
            <div key={attribute.id} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Label className="font-medium">{attribute.name}</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {attribute.description}
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
