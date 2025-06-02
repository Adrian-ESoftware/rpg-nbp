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
      
      {/* Floating Elements - usando cores do tema */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-accent/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/15 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="relative z-10">
        {/* Hero Header */}
        <div className="pt-16 pb-8">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center space-x-3 mb-6 bg-card/70 backdrop-blur-sm px-6 py-3 rounded-full border border-border shadow-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">{t('createNewAdventure')}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              {t('title')}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Main Content - Masonry Style */}
        <div className="container mx-auto px-4 max-w-7xl pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column - Basic Info (spans more) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="transform hover:scale-[1.01] transition-all duration-300">
                <BasicInfoCard
                  sessionData={sessionData}
                  errors={errors}
                  options={formOptions}
                  onInputChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <SessionSettingsCard
                    sessionData={sessionData}
                    errors={errors}
                    options={formOptions}
                    onInputChange={handleInputChange}
                  />
                </div>
                
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <TagsCard
                    sessionData={sessionData}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Summary (floating) */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-6">
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <SummaryCard
                    sessionData={sessionData}
                    options={formOptions}
                    isSubmitting={isSubmitting}
                    onCreateSession={handleCreateSession}
                  />
                </div>
                
                {/* Fun decorative element */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-primary">
                    <Dice6 className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-sm font-medium opacity-70">Boa sorte, Mestre!</span>
                    <Dice6 className="w-6 h-6 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}