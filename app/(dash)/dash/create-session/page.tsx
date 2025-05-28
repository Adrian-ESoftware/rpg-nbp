"use client"

import React, { useState } from "react"
import { useTranslations } from 'next-intl'
import { ArrowLeft, Users, Clock , Scroll, Settings, Wand2, Plus, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SessionData {
  name: string
  description: string
  maxPlayers: number
  duration: string
  sessionType: string
  difficulty: string
  systemType: string
  isPrivate: boolean
  allowSpectators: boolean
  tags: string[]
}

interface ValidationErrors {
  name?: string
  description?: string
  maxPlayers?: string
}

export default function CreateSessionPage() {
  const { toast } = useToast()
  const router = useRouter()
  const t = useTranslations('createSession')
  const tCommon = useTranslations('common')
  const tValidation = useTranslations('validation')
  
  const [sessionData, setSessionData] = useState<SessionData>({
    name: "",
    description: "",
    maxPlayers: 4,
    duration: "3",
    sessionType: "oneshot",
    difficulty: "medium",
    systemType: "dnd5e",
    isPrivate: false,
    allowSpectators: true,
    tags: [],
  })

  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const systemOptions = {
    "dnd5e": "D&D 5ª Edição",
    "pathfinder": "Pathfinder",
    "tormenta20": "Tormenta 20",
    "3det": "3D&T",
    "custom": t('customSystem')
  }

  const difficultyOptions = {
    "easy": t('difficultyEasy'),
    "medium": t('difficultyMedium'), 
    "hard": t('difficultyHard'),
    "expert": t('difficultyExpert')
  }

  const sessionTypeOptions = {
    "oneshot": t('typeOneshot'),
    "campaign": t('typeCampaign'),
    "adventure": t('typeAdventure')
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!sessionData.name.trim()) {
      newErrors.name = tValidation('sessionNameRequired')
    } else if (sessionData.name.trim().length < 3) {
      newErrors.name = tValidation('sessionNameMinLength')
    }

    if (!sessionData.description.trim()) {
      newErrors.description = tValidation('descriptionRequired')
    } else if (sessionData.description.trim().length < 10) {
      newErrors.description = tValidation('descriptionMinLength')
    }

    if (sessionData.maxPlayers < 1 || sessionData.maxPlayers > 8) {
      newErrors.maxPlayers = tValidation('playersRange')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof SessionData, value: any) => {
    setSessionData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const addTag = () => {
    const trimmedTag = newTag.trim()
    if (trimmedTag && !sessionData.tags.includes(trimmedTag) && sessionData.tags.length < 10) {
      setSessionData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setSessionData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleCreateSession = async () => {
    if (!validateForm()) {
      toast({
        title: tValidation('validationError'),
        description: tValidation('validationErrorDescription'),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Criando sessão:", sessionData)
      
      toast({
        title: t('successMessage'),
        description: t('successDescription', { name: sessionData.name }),
      })
      
      // Redirect to dashboard after successful creation
      router.push('/')
      
    } catch (error) {
      toast({
        title: tValidation('createError'),
        description: tValidation('createErrorDescription'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Enhanced Header */}
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
            {/* Basic Information */}
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
                    onChange={(e) => handleInputChange("description", e.target.value)}
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
                    <Select value={sessionData.systemType} onValueChange={(value) => handleInputChange("systemType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(systemOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('sessionType')}</Label>
                    <Select value={sessionData.sessionType} onValueChange={(value) => handleInputChange("sessionType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(sessionTypeOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Settings */}
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
                      onChange={(e) => handleInputChange("maxPlayers", parseInt(e.target.value) || 1)}
                      className={errors.maxPlayers ? "border-destructive focus:border-destructive" : ""}
                    />
                    {errors.maxPlayers && (
                      <div className="flex items-center space-x-2 text-destructive text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.maxPlayers}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex flex-col justify-end">
                    <Label className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{t('estimatedDuration')}</span>
                    </Label>
                    <Select value={sessionData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
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

                  <div className="space-y-2 flex flex-col justify-end">
                    <Label className="flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>{t('difficultyLevel')}</span>
                    </Label>
                    <Select value={sessionData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(difficultyOptions).map(([value, label]) => (
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
                          handleInputChange("isPrivate", checked)
                          if (checked) handleInputChange("allowSpectators", false)
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
                          handleInputChange("allowSpectators", checked)
                          if (checked) handleInputChange("isPrivate", false)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{t('tagsAndCategories')}</CardTitle>
                <CardDescription>
                  {t('tagsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('tagPlaceholder')}
                    disabled={sessionData.tags.length >= 10}
                    className="flex-1"
                  />
                  <Button 
                    onClick={addTag}
                    disabled={!newTag.trim() || sessionData.tags.includes(newTag.trim()) || sessionData.tags.length >= 10}
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {sessionData.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('addedTags')}:</span>
                      <span className="text-xs text-muted-foreground">{sessionData.tags.length}/10</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sessionData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center space-x-1 pr-1"
                        >
                          <span>{tag}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Summary Sidebar */}
          <div className="space-y-6">
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
                      {systemOptions[sessionData.systemType as keyof typeof systemOptions]}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('type')}:</span>
                    <span className="text-sm font-medium">
                      {sessionTypeOptions[sessionData.sessionType as keyof typeof sessionTypeOptions]}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('players')}:</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{t('upTo')} {sessionData.maxPlayers}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t('duration')}:</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {sessionData.duration} {sessionData.duration === "1" ? t('hour') : t('hours')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('difficulty')}:</span>
                    <Badge 
                      variant={sessionData.difficulty === "expert" ? "destructive" : 
                               sessionData.difficulty === "hard" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {difficultyOptions[sessionData.difficulty as keyof typeof difficultyOptions]}
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
                  onClick={handleCreateSession}
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
          </div>
        </div>
      </div>
    </div>
  )
}