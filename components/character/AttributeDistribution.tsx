"use client"

import React, { useState } from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react"
import { useRPGSystem } from "@/hooks/use-rpg-system"
import type { BaseAttribute } from "@/types/rpg-systems"

interface AttributeDistributionProps {
  attributes: BaseAttribute[]
  values: Record<string, number>
  onChange: (values: Record<string, number>) => void
  totalPoints: number
  maxPerAttribute: number
  error?: string
  systemId: string
  isKnowledge?: boolean
  sectionLabel: string
}

export function AttributeDistribution({
  attributes,
  values,
  onChange,
  totalPoints,
  maxPerAttribute,
  error,
  systemId,
  isKnowledge = false,
  sectionLabel
}: AttributeDistributionProps) {
  const t = useTranslations('createCharacter')
  const { system, t: tSystem } = useRPGSystem(systemId)
  const usedPoints = Object.values(values).reduce((sum, val) => sum + (val || 0), 0)
  const remainingPoints = totalPoints - usedPoints

  // Paginação - máximo 8 itens por página
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 8
  const totalPages = Math.ceil(attributes.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = attributes.slice(startIndex, endIndex)

  const handleChange = (attributeId: string, newValue: number) => {
    const clampedValue = Math.max(0, Math.min(maxPerAttribute, newValue))
    onChange({
      ...values,
      [attributeId]: clampedValue
    })
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{sectionLabel}</h3>
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

      {/* Indicador de página se houver mais de 8 itens */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Página {currentPage + 1} de {totalPages} ({attributes.length} {isKnowledge ? 'conhecimentos' : 'atributos'})
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentItems.map((attribute) => {
          const currentValue = values[attribute.id] || 0
          const canIncrease = currentValue < maxPerAttribute && remainingPoints > 0
          const canDecrease = currentValue > 0

          const attributeName = tSystem(attribute.name)
          const attributeDescription = tSystem(attribute.description)

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

      {/* Navegação inferior se houver mais de uma página */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={i === currentPage ? "default" : "outline"}
              size="sm"
              className="w-8 h-8"
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
