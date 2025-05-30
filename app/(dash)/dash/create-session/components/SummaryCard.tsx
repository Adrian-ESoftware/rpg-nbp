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
    <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border-0 shadow-2xl shadow-primary/25 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      
      <CardHeader className="relative z-10 pb-4 bg-gradient-to-r from-primary/20 to-accent/20">
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <div className="p-2 bg-card/20 backdrop-blur-sm rounded-lg">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
            {t('summary')}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start p-3 bg-card/40 backdrop-blur-sm rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">{t('name')}:</span>
            <span className="text-sm font-bold text-right max-w-[60%] text-foreground">
              {sessionData.name || t('noName')}
            </span>
          </div>
          
          <Separator className="bg-gradient-to-r from-primary to-accent" />
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-card/30 backdrop-blur-sm rounded-lg text-center">
              <div className="text-xs text-muted-foreground mb-1">{t('system')}</div>
              <Badge variant="outline" className="text-xs font-semibold bg-primary/10 border-primary/30">
                {options.systemOptions[sessionData.systemType]}
              </Badge>
            </div>
            
            <div className="p-3 bg-card/30 backdrop-blur-sm rounded-lg text-center">
              <div className="text-xs text-muted-foreground mb-1">{t('type')}</div>
              <span className="text-sm font-semibold text-foreground">
                {options.sessionTypeOptions[sessionData.sessionType]}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-card/30 backdrop-blur-sm rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">{t('players')}:</span>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{t('upTo')} {sessionData.maxPlayers}</span>
            </div>
          </div>
          
          {sessionData.sessionType === "oneshot" && (
            <div className="flex justify-between items-center p-3 bg-card/30 backdrop-blur-sm rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">{t('duration')}:</span>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-foreground">
                  {sessionData.duration} {sessionData.duration === "1" ? t('hour') : t('hours')}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center p-3 bg-card/30 backdrop-blur-sm rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">{t('difficulty')}:</span>
            <Badge 
              variant={sessionData.difficulty === "expert" ? "destructive" : 
                       sessionData.difficulty === "hard" ? "secondary" : "outline"}
              className="text-xs font-semibold"
            >
              {options.difficultyOptions[sessionData.difficulty]}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-card/30 backdrop-blur-sm rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">{t('privacy')}:</span>
            <Badge 
              variant={sessionData.isPrivate ? "secondary" : "outline"} 
              className="text-xs font-semibold bg-secondary/10 border-secondary/30"
            >
              {sessionData.isPrivate ? t('private') : t('public')}
            </Badge>
          </div>

          {sessionData.tags.length > 0 && (
            <>
              <Separator className="bg-gradient-to-r from-primary to-accent" />
              <div className="space-y-3 p-3 bg-card/20 backdrop-blur-sm rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {sessionData.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-accent/10 border-accent/30">
                      {tag}
                    </Badge>
                  ))}
                  {sessionData.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs bg-muted/10 border-muted-foreground/30">
                      +{sessionData.tags.length - 3} {t('more')}
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <Separator className="bg-gradient-to-r from-primary to-accent" />

        <Button
          onClick={onCreateSession}
          disabled={isSubmitting || !sessionData.name.trim() || !sessionData.description.trim()}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t('creating')}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Wand2 className="w-5 h-5" />
              <span>{t('createButton')}</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground bg-card/20 backdrop-blur-sm p-3 rounded-lg">
          {t('afterCreateMessage')}
        </p>
      </CardContent>
    </Card>
  )
}
