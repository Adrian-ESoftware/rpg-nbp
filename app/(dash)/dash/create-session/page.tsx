"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Clock, MapPin, Scroll, Settings, Wand2, Plus, X, CheckCircle, AlertCircle } from "lucide-react"
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
    "custom": "Sistema Personalizado"
  }

  const difficultyOptions = {
    "easy": "Fácil",
    "medium": "Médio", 
    "hard": "Difícil",
    "expert": "Expert"
  }

  const sessionTypeOptions = {
    "oneshot": "One-shot",
    "campaign": "Campanha",
    "adventure": "Aventura"
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!sessionData.name.trim()) {
      newErrors.name = "Nome da sessão é obrigatório"
    } else if (sessionData.name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres"
    }

    if (!sessionData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    } else if (sessionData.description.trim().length < 10) {
      newErrors.description = "Descrição deve ter pelo menos 10 caracteres"
    }

    if (sessionData.maxPlayers < 1 || sessionData.maxPlayers > 8) {
      newErrors.maxPlayers = "Número de jogadores deve estar entre 1 e 8"
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
        title: "Erro de validação",
        description: "Por favor, corrija os erros antes de continuar.",
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
        title: "Sessão criada com sucesso!",
        description: `"${sessionData.name}" foi criada e está pronta para jogadores.`,
      })
      
      // Redirect to dashboard after successful creation
      router.push('/')
      
    } catch (error) {
      toast({
        title: "Erro ao criar sessão",
        description: "Ocorreu um erro inesperado. Tente novamente.",
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
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-2px]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Dashboard</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Criar Nova Sessão</h1>
                <p className="text-muted-foreground">Configure sua aventura e convide jogadores</p>
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
                  <span>Informações Básicas</span>
                </CardTitle>
                <CardDescription>
                  Configure os detalhes principais da sua sessão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="session-name">Nome da Sessão *</Label>
                  <Input
                    id="session-name"
                    value={sessionData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: A Maldição do Castelo Sombrio"
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
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={sessionData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    placeholder="Descreva sua aventura, o cenário, o tom da campanha e o que os jogadores podem esperar..."
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
                        {sessionData.description.length}/500 caracteres
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sistema de RPG</Label>
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
                    <Label>Tipo de Sessão</Label>
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
                  <span>Configurações da Sessão</span>
                </CardTitle>
                <CardDescription>
                  Defina os parâmetros de gameplay e acessibilidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Máximo de Jogadores</span>
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

                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Duração Estimada</span>
                    </Label>
                    <Select value={sessionData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hora</SelectItem>
                        <SelectItem value="2">2 horas</SelectItem>
                        <SelectItem value="3">3 horas</SelectItem>
                        <SelectItem value="4">4 horas</SelectItem>
                        <SelectItem value="5+">5+ horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nível de Dificuldade</Label>
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
                  <h4 className="font-medium text-foreground">Configurações de Privacidade</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-muted">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">Sessão Privada</span>
                          {sessionData.isPrivate && <Badge variant="secondary" className="text-xs">Privada</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Apenas jogadores convidados podem participar
                        </p>
                      </div>
                      <Checkbox
                        checked={sessionData.isPrivate}
                        onCheckedChange={(checked) => handleInputChange("isPrivate", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-muted">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">Permitir Espectadores</span>
                          {sessionData.allowSpectators && <Badge variant="outline" className="text-xs">Público</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Outros usuários podem assistir a sessão
                        </p>
                      </div>
                      <Checkbox
                        checked={sessionData.allowSpectators}
                        onCheckedChange={(checked) => handleInputChange("allowSpectators", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Tags e Categorias</CardTitle>
                <CardDescription>
                  Adicione tags para ajudar outros jogadores a encontrar sua sessão (máx. 10)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ex: fantasia, investigação, combate..."
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
                      <span className="text-sm font-medium">Tags adicionadas:</span>
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
                  <span>Resumo da Sessão</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Nome:</span>
                    <span className="text-sm font-medium text-right max-w-[60%]">
                      {sessionData.name || "Sem nome"}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sistema:</span>
                    <Badge variant="outline" className="text-xs">
                      {systemOptions[sessionData.systemType as keyof typeof systemOptions]}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tipo:</span>
                    <span className="text-sm font-medium">
                      {sessionTypeOptions[sessionData.sessionType as keyof typeof sessionTypeOptions]}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Jogadores:</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium">Até {sessionData.maxPlayers}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Duração:</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {sessionData.duration} {sessionData.duration === "1" ? "hora" : "horas"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dificuldade:</span>
                    <Badge 
                      variant={sessionData.difficulty === "expert" ? "destructive" : 
                               sessionData.difficulty === "hard" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {difficultyOptions[sessionData.difficulty as keyof typeof difficultyOptions]}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Privacidade:</span>
                    <Badge variant={sessionData.isPrivate ? "secondary" : "outline"} className="text-xs">
                      {sessionData.isPrivate ? "Privada" : "Pública"}
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
                              +{sessionData.tags.length - 3} mais
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
                      <span>Criando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Wand2 className="w-4 h-4" />
                      <span>Criar Sessão</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Após criar, você poderá convidar jogadores e configurar detalhes adicionais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}