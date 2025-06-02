"use client"

import React from "react"
import { useTranslations } from 'next-intl'
import { Wand2, Sparkles, Dice6 } from "lucide-react"
import { useCreateSession } from './hooks/useCreateSession'
import { BasicInfoCard } from './components/BasicInfoCard'
import { SessionSettingsCard } from './components/SessionSettingsCard'
import { TagsCard } from './components/TagsCard'
import { SummaryCard } from './components/SummaryCard'
import { FormOptions } from './types'
import { getAllSystems, getLocalizedText } from '@/lib/systems'

export default function CreateSessionPage() {
  const t = useTranslations('createSession')
  const {
    sessionData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCreateSession
  } = useCreateSession()

  // Buscar sistemas disponíveis do registro
  const availableSystems = getAllSystems()
  const systemOptions = React.useMemo(() => {
    const options: Record<string, string> = {}
    availableSystems.forEach(system => {
      options[system.id] = getLocalizedText(system.name, 'pt')
    })
    return options
  }, [availableSystems])

  const formOptions: FormOptions = {
    systemOptions,
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - usando cores do tema */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted"></div>
      
      {/* Floating Elements - mais dispersos */}
      <div className="absolute top-10 left-16 w-36 h-36 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-24 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-44 h-44 bg-secondary/12 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/3 right-1/5 w-24 h-24 bg-primary/18 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-16 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-700"></div>

      <div className="relative z-10">
        {/* Header - sem badge */}
        <div className="pt-16 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Main Content - Layout melhorado em 2x2 */}
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Quadrante Superior Esquerdo - Basic Info */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <BasicInfoCard
                sessionData={sessionData}
                errors={errors}
                options={formOptions}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Quadrante Superior Direito - Summary */}
            <div className="lg:sticky lg:top-6">
              <div className="transform hover:scale-[1.01] transition-all duration-300">
                <SummaryCard
                  sessionData={sessionData}
                  options={formOptions}
                  isSubmitting={isSubmitting}
                  onCreateSession={handleCreateSession}
                />
              </div>
            </div>

            {/* Quadrante Inferior Esquerdo - Session Settings */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <SessionSettingsCard
                sessionData={sessionData}
                errors={errors}
                options={formOptions}
                onInputChange={handleInputChange}
              />
            </div>
            
            {/* Quadrante Inferior Direito - Tags */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <TagsCard
                sessionData={sessionData}
                onInputChange={handleInputChange}
              />
              
              {/* Fun decorative element movido para baixo */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-primary p-4 bg-card/40 rounded-2xl border border-border/50 shadow-lg">
                  <Dice6 className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-medium opacity-70">{t('goodLuckMaster')}</span>
                  <Dice6 className="w-6 h-6 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}