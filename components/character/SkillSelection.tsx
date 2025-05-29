"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import type { SkillOption } from "@/types/character-creation"

interface SkillSelectionProps {
  availableSkills: SkillOption[]
  selectedSkills: string[]
  onChange: (skills: string[]) => void
  maxSelection: number
  combatPath: string
  error?: string
}

export function SkillSelection({
  availableSkills,
  selectedSkills,
  onChange,
  maxSelection,
  combatPath,
  error
}: SkillSelectionProps) {
  const t = useTranslations('createCharacter')
  
  const filteredSkills = availableSkills.filter(skill => 
    !combatPath || skill.combatPaths.includes(combatPath)
  )

  const handleSkillToggle = (skillId: string, checked: boolean) => {
    if (checked && selectedSkills.length < maxSelection) {
      onChange([...selectedSkills, skillId])
    } else if (!checked) {
      onChange(selectedSkills.filter(id => id !== skillId))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{t('selectedSkillsCount')}:</span>
        <Badge variant={selectedSkills.length === maxSelection ? "default" : "secondary"}>
          {selectedSkills.length}/{maxSelection}
        </Badge>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {filteredSkills.map((skill) => {
          const isSelected = selectedSkills.includes(skill.id)
          const canSelect = isSelected || selectedSkills.length < maxSelection

          return (
            <div 
              key={skill.id} 
              className={`p-4 border rounded-lg transition-colors ${
                isSelected ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => handleSkillToggle(skill.id, checked as boolean)}
                  disabled={!canSelect}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label className="font-medium cursor-pointer">
                    {skill.name}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredSkills.length === 0 && combatPath && (
        <p className="text-sm text-muted-foreground text-center py-4">
          {t('noSkillsAvailable')}
        </p>
      )}
    </div>
  )
}
