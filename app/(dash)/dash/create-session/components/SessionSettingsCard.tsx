import React from 'react'
import { useTranslations } from 'next-intl'
import { Users, Clock, Settings, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SessionData, ValidationErrors, FormOptions } from '../types'

interface SessionSettingsCardProps {
  sessionData: SessionData
  errors: ValidationErrors
  options: FormOptions
  onInputChange: (field: keyof SessionData, value: any) => void
}

export const SessionSettingsCard: React.FC<SessionSettingsCardProps> = ({
  sessionData,
  errors,
  options,
  onInputChange
}) => {
  const t = useTranslations('createSession')

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-primary" />
          <span>{t('sessionSettings')}</span>
        </CardTitle>
        <CardDescription>
          {t('sessionSettingsDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 flex flex-col justify-end">
            <Label className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{t('maxPlayers')}</span>
            </Label>
            <Input
              type="number"
              min="1"
              max="8"
              value={sessionData.maxPlayers}
              onChange={(e) => onInputChange("maxPlayers", parseInt(e.target.value) || 1)}
              className={errors.maxPlayers ? "border-destructive focus:border-destructive" : ""}
            />
            {errors.maxPlayers && (
              <div className="flex items-center space-x-2 text-destructive text-xs">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.maxPlayers}</span>
              </div>
            )}
          </div>

          {sessionData.sessionType === "oneshot" && (
            <div className="space-y-2 flex flex-col justify-end">
              <Label className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{t('estimatedDuration')}</span>
              </Label>
              <Select value={sessionData.duration} onValueChange={(value) => onInputChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t('duration1h')}</SelectItem>
                  <SelectItem value="2">{t('duration2h')}</SelectItem>
                  <SelectItem value="3">{t('duration3h')}</SelectItem>
                  <SelectItem value="4">{t('duration4h')}</SelectItem>
                  <SelectItem value="5+">{t('duration5h')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2 flex flex-col justify-end">
            <Label className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>{t('difficultyLevel')}</span>
            </Label>
            <Select value={sessionData.difficulty} onValueChange={(value) => onInputChange("difficulty", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(options.difficultyOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium text-foreground">{t('privacySettings')}</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-muted">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{t('privateSession')}</span>
                  {sessionData.isPrivate && <Badge variant="secondary" className="text-xs">{t('private')}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('privateSessionDescription')}
                </p>
              </div>
              <Checkbox
                checked={sessionData.isPrivate}
                onCheckedChange={(checked) => {
                  onInputChange("isPrivate", checked)
                  if (checked) onInputChange("allowSpectators", false)
                }}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-muted">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{t('allowSpectators')}</span>
                  {sessionData.allowSpectators && <Badge variant="outline" className="text-xs">{t('public')}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('allowSpectatorsDescription')}
                </p>
              </div>
              <Checkbox
                checked={sessionData.allowSpectators}
                onCheckedChange={(checked) => {
                  onInputChange("allowSpectators", checked)
                  if (checked) onInputChange("isPrivate", false)
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
