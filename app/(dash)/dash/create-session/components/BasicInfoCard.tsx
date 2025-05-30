import React from 'react'
import { useTranslations } from 'next-intl'
import { Scroll, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionData, ValidationErrors, FormOptions } from '../types'

interface BasicInfoCardProps {
  sessionData: SessionData
  errors: ValidationErrors
  options: FormOptions
  onInputChange: (field: keyof SessionData, value: any) => void
}

export const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
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
          <Scroll className="w-5 h-5 text-primary" />
          <span>{t('basicInfo')}</span>
        </CardTitle>
        <CardDescription>
          {t('basicInfoDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="session-name">{t('sessionName')} *</Label>
          <Input
            id="session-name"
            value={sessionData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder={t('sessionNamePlaceholder')}
            className={errors.name ? "border-destructive focus:border-destructive" : ""}
          />
          {errors.name && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{t('sessionDescription')} *</Label>
          <Textarea
            id="description"
            value={sessionData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            rows={4}
            placeholder={t('sessionDescriptionPlaceholder')}
            className={`resize-none ${errors.description ? "border-destructive focus:border-destructive" : ""}`}
          />
          <div className="flex justify-between items-center">
            {errors.description ? (
              <div className="flex items-center space-x-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.description}</span>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                {sessionData.description.length}/500 {t('characters')}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('rpgSystem')}</Label>
            <Select value={sessionData.systemType} onValueChange={(value) => onInputChange("systemType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(options.systemOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('sessionType')}</Label>
            <Select value={sessionData.sessionType} onValueChange={(value) => onInputChange("sessionType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(options.sessionTypeOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
