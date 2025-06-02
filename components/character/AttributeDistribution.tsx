"use client"

import React, { useState } from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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

  // Paginação dinâmica - ajusta baseado no número de itens
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = attributes.length <= 12 ? 12 : 8 // Mais itens por página se houver poucos
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
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg border border-border/60 shadow-xl">
        <div>
          <span className="text-sm font-medium">{t('remainingPoints')}:</span>
        </div>
        <Badge variant={remainingPoints === 0 ? "default" : "secondary"} className="bg-card/60 border-border/50 shadow-lg">
          {remainingPoints}/{totalPoints}
        </Badge>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm p-3 bg-destructive/20 rounded-lg border border-destructive/50 shadow-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Indicador de página apenas se houver mais de uma página */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-2 bg-card/40 rounded-lg border border-border/50 shadow-lg">
          <div className="text-xs text-muted-foreground">
            {currentPage + 1}/{totalPages}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="h-7 w-7 p-0 bg-card/50 border-border/60 hover:bg-card/70 shadow-md hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="h-7 w-7 p-0 bg-card/50 border-border/60 hover:bg-card/70 shadow-md hover:shadow-lg transition-all"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 gap-3 pr-3">
          {currentItems.map((attribute) => {
            const currentValue = values[attribute.id] || 0
            const canIncrease = currentValue < maxPerAttribute && remainingPoints > 0
            const canDecrease = currentValue > 0

            const attributeName = tSystem(attribute.name)
            const attributeDescription = tSystem(attribute.description)

            return (
              <div key={attribute.id} className="p-3 border border-border/60 rounded-lg bg-card/40 hover:bg-card/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{attributeName}</div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {attributeDescription}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-card/40 border-border/60 hover:bg-card/70 shadow-md hover:shadow-lg transition-all"
                      onClick={() => handleChange(attribute.id, currentValue - 1)}
                      disabled={!canDecrease}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Badge variant="outline" className="min-w-[1.5rem] text-center bg-card/60 border-border/50 shadow-md text-xs">
                      {currentValue}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-card/40 border-border/60 hover:bg-card/70 shadow-md hover:shadow-lg transition-all"
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
      </ScrollArea>

      {/* Navegação inferior apenas se houver mais de uma página */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-1 pt-2">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageIndex = totalPages <= 5 ? i : 
              currentPage < 3 ? i :
              currentPage > totalPages - 3 ? totalPages - 5 + i :
              currentPage - 2 + i;
            
            return (
              <Button
                key={pageIndex}
                variant={pageIndex === currentPage ? "default" : "outline"}
                size="sm"
                className="w-7 h-7 text-xs bg-card/50 border-border/60 hover:bg-card/70 shadow-md hover:shadow-lg transition-all"
                onClick={() => setCurrentPage(pageIndex)}
              >
                {pageIndex + 1}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}
