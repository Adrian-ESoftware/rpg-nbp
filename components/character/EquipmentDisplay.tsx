"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import type { EquipmentItem } from "@/types/character-creation"

interface EquipmentDisplayProps {
  equipment: EquipmentItem[]
}

export function EquipmentDisplay({ equipment }: EquipmentDisplayProps) {
  const t = useTranslations('createCharacter')

  return (
    <div className="space-y-3">
      {equipment.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhum equipamento inicial definido.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {equipment.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{item.name}</span>
              </div>
              <Badge variant="outline">
                {item.quantity}x
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
