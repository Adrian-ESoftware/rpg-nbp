import React from 'react'
import { useTranslations } from 'next-intl'
import { Scroll, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionData, ValidationErrors, FormOptions } from '../types'
import { ScrollArea } from "@/components/ui/scroll-area"

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
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-lg">
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Scroll className="w-6 h-6 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('basicInfo')}
          </span>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          {t('basicInfoDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="space-y-3">
          <Label htmlFor="session-name" className="text-lg font-semibold text-foreground">
            {t('sessionName')} *
          </Label>
          <Input
            id="session-name"
            value={sessionData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder={t('sessionNamePlaceholder')}
            className={`h-12 text-lg border-2 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80 focus:scale-[1.02] ${
              errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
            }`}
          />
          {errors.name && (
            <div className="flex items-center space-x-2 text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-lg font-semibold text-foreground">
            {t('sessionDescription')} *
          </Label>
          <div className="space-y-2">
            <ScrollArea className="h-[120px] rounded-md border border-border/60">
              <Textarea
                id="description"
                value={sessionData.description}
                onChange={(e) => onInputChange("description", e.target.value)}
                rows={5}
                placeholder={t('sessionDescriptionPlaceholder')}
                className={`min-h-[120px] resize-none border-0 focus:shadow-lg transition-all duration-300 ${
                  errors.description ? "border-destructive" : ""
                }`}
              />
            </ScrollArea>
            <div className="flex justify-between items-center">
              {errors.description ? (
                <div className="flex items-center space-x-2 text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.description}</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  {sessionData.description.length}/500 {t('characters')}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-foreground">{t('rpgSystem')}</Label>
            <Select value={sessionData.systemType} onValueChange={(value) => onInputChange("systemType", value)}>
              <SelectTrigger className="h-12 text-base border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-sm border-border">
                {Object.entries(options.systemOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="text-base">{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold text-foreground">{t('sessionType')}</Label>
            <Select value={sessionData.sessionType} onValueChange={(value) => onInputChange("sessionType", value)}>
              <SelectTrigger className="h-12 text-base border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-sm border-border">
                {Object.entries(options.sessionTypeOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="text-base">{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
