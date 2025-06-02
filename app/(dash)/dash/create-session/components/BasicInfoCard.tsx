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

export function BasicInfoCard({ sessionData, errors, options, onInputChange }: BasicInfoCardProps) {
  const t = useTranslations('createSession')

  return (
    <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg h-full">
      <CardHeader className="pb-4 bg-card/40 border-b border-border/60 shadow-lg">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <Scroll className="w-6 h-6 text-primary drop-shadow-lg" />
          <span>{t('basicInfo')}</span>
        </CardTitle>
        <CardDescription className="text-base">
          {t('basicInfoDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-card/20 space-y-6 flex-1">
        <div className="space-y-2">
          <Label htmlFor="sessionName" className="text-sm font-medium">
            {t('sessionName')}
          </Label>
          <Input
            id="sessionName"
            type="text"
            placeholder={t('sessionNamePlaceholder')}
            value={sessionData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className={`bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300 ${
              errors.name ? 'border-destructive/70 focus:border-destructive' : ''
            }`}
          />
          {errors.name && (
            <p className="text-sm text-destructive flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            {t('sessionDescription')}
          </Label>
          <Textarea
            id="description"
            placeholder={t('sessionDescriptionPlaceholder')}
            value={sessionData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            className={`min-h-[120px] bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300 resize-none ${
              errors.description ? 'border-destructive/70 focus:border-destructive' : ''
            }`}
          />
          {errors.description && (
            <p className="text-sm text-destructive flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="system" className="text-sm font-medium">
              {t('rpgSystem')}
            </Label>
            <Select value={sessionData.system} onValueChange={(value) => onInputChange('system', value)}>
              <SelectTrigger className="bg-card/30 border-border/60 hover:bg-card/50 focus:shadow-lg transition-all duration-300">
                <SelectValue placeholder={t('selectSystem')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-2xl">
                {Object.entries(options.systemOptions).map(([key, value]) => (
                  <SelectItem key={key} value={key} className="hover:bg-muted/60 focus:bg-muted/60">
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              {t('sessionType')}
            </Label>
            <Select value={sessionData.type} onValueChange={(value) => onInputChange('type', value)}>
              <SelectTrigger className="bg-card/30 border-border/60 hover:bg-card/50 focus:shadow-lg transition-all duration-300">
                <SelectValue placeholder={t('selectSessionType')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-2xl">
                {Object.entries(options.sessionTypeOptions).map(([key, value]) => (
                  <SelectItem key={key} value={key} className="hover:bg-muted/60 focus:bg-muted/60">
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
