import React from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, Users, Clock, Wand2 } from 'lucide-react'
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

export const SummaryCard: React.FC<SummaryCardProps> = ({
  sessionData,
  options,
  isSubmitting,
  onCreateSession
}) => {
  const t = useTranslations('createSession')

  return (
    <Card className="sticky top-6 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span>{t('summary')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground">{t('name')}:</span>
            <span className="text-sm font-medium text-right max-w-[60%]">
              {sessionData.name || t('noName')}
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('system')}:</span>
            <Badge variant="outline" className="text-xs">
              {options.systemOptions[sessionData.systemType]}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('type')}:</span>
            <span className="text-sm font-medium">
              {options.sessionTypeOptions[sessionData.sessionType]}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('players')}:</span>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-sm font-medium">{t('upTo')} {sessionData.maxPlayers}</span>
            </div>
          </div>
          
          {sessionData.sessionType === "oneshot" && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('duration')}:</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {sessionData.duration} {sessionData.duration === "1" ? t('hour') : t('hours')}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('difficulty')}:</span>
            <Badge 
              variant={sessionData.difficulty === "expert" ? "destructive" : 
                       sessionData.difficulty === "hard" ? "secondary" : "outline"}
              className="text-xs"
            >
              {options.difficultyOptions[sessionData.difficulty]}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('privacy')}:</span>
            <Badge variant={sessionData.isPrivate ? "secondary" : "outline"} className="text-xs">
              {sessionData.isPrivate ? t('private') : t('public')}
            </Badge>
          </div>

          {sessionData.tags.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {sessionData.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {sessionData.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{sessionData.tags.length - 3} {t('more')}
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <Separator />

        <Button
          onClick={onCreateSession}
          disabled={isSubmitting || !sessionData.name.trim() || !sessionData.description.trim()}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t('creating')}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Wand2 className="w-4 h-4" />
              <span>{t('createButton')}</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {t('afterCreateMessage')}
        </p>
      </CardContent>
    </Card>
  )
}
