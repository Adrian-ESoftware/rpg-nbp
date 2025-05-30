"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Wand2 } from "lucide-react"
import { useCreateSession } from './hooks/useCreateSession'
import { BasicInfoCard } from './components/BasicInfoCard'
import { SessionSettingsCard } from './components/SessionSettingsCard'
import { TagsCard } from './components/TagsCard'
import { SummaryCard } from './components/SummaryCard'
import { FormOptions } from './types'

export default function CreateSessionPage() {
  const t = useTranslations('createSession')
  const {
    sessionData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCreateSession
  } = useCreateSession()

  const formOptions: FormOptions = {
    systemOptions: {
      "dnd5e": "D&D 5ª Edição",
      "pathfinder": "Pathfinder",
      "tormenta20": "Tormenta 20",
      "3det": "3D&T",
      "custom": t('customSystem')
    },
    difficultyOptions: {
      "easy": t('difficultyEasy'),
      "medium": t('difficultyMedium'), 
      "hard": t('difficultyHard'),
      "expert": t('difficultyExpert')
    },
    sessionTypeOptions: {
      "oneshot": t('typeOneshot'),
      "campaign": t('typeCampaign'),
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2 space-y-6">
            <BasicInfoCard
              sessionData={sessionData}
              errors={errors}
              options={formOptions}
              onInputChange={handleInputChange}
            />

            <SessionSettingsCard
              sessionData={sessionData}
              errors={errors}
              options={formOptions}
              onInputChange={handleInputChange}
            />

            <TagsCard
              sessionData={sessionData}
              onInputChange={handleInputChange}
            />
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <SummaryCard
              sessionData={sessionData}
              options={formOptions}
              isSubmitting={isSubmitting}
              onCreateSession={handleCreateSession}
            />
          </div>
        </div>
      </div>
    </div>
  )
}