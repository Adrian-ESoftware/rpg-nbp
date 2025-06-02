import React from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, Users, Clock, Wand2, Sparkles, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SessionData, FormOptions } from '../types'

interface SummaryCardProps {
  sessionData: SessionData
  options: FormOptions
  isSubmitting: boolean
  onCreateSession: () => void
}

export function SummaryCard({ sessionData, options, isSubmitting, onCreateSession }: SummaryCardProps) {
  const t = useTranslations('createSession')

  return (
    <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg h-full">
      <CardHeader className="pb-4 bg-card/40 border-b border-border/60 shadow-lg">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <Sparkles className="w-6 h-6 text-primary drop-shadow-lg" />
          <span>{t('summary')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-card/20 space-y-6 flex flex-col h-full">
        <div className="space-y-4 flex-1">
          <div className="p-4 bg-card/40 rounded-lg border border-border/50 shadow-lg">
            <h4 className="font-semibold mb-3">{t('basicInfo')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('name')}:</span>
                <span className="font-medium truncate ml-2">{sessionData.name || t('noName')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('system')}:</span>
                <span className="font-medium">{options.systemOptions[sessionData.system] || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('type')}:</span>
                <span className="font-medium">{options.sessionTypeOptions[sessionData.type] || '-'}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card/40 rounded-lg border border-border/50 shadow-lg">
            <h4 className="font-semibold mb-3">{t('settings')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('players')}:</span>
                <span className="font-medium">{t('upTo')} {sessionData.maxPlayers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('duration')}:</span>
                <span className="font-medium">{sessionData.duration || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('difficulty')}:</span>
                <span className="font-medium">{options.difficultyOptions[sessionData.difficulty] || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('privacy')}:</span>
                <span className="font-medium">{sessionData.isPrivate ? t('private') : t('public')}</span>
              </div>
            </div>
          </div>

          {sessionData.tags.length > 0 && (
            <div className="p-4 bg-card/40 rounded-lg border border-border/50 shadow-lg">
              <h4 className="font-semibold mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {sessionData.tags.slice(0, 6).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-card/50 border-border/60 shadow-md">
                    {tag}
                  </Badge>
                ))}
                {sessionData.tags.length > 6 && (
                  <Badge variant="outline" className="text-xs bg-card/50 border-border/60 shadow-md">
                    +{sessionData.tags.length - 6} {t('more')}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border/50">
          <Button
            onClick={onCreateSession}
            disabled={isSubmitting}
            className="w-full h-12 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/40 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('creating')}
              </>
            ) : (
              t('createButton')
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            {t('afterCreateMessage')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
