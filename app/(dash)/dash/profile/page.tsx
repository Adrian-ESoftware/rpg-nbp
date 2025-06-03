'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, User, Calendar, MapPin, Camera, Settings, ArrowLeft, Gamepad2, Users, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfile {
  playerName: string
  email: string
  nickname: string
  playerBio: string
  location: string
  birthDate: string
  avatar: string
  joinDate: string
  campaignsPlayed: number
  favoriteSystem: string
  favoriteCharacter: string
  preferredRole: string
  playingTime: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'master'
  charactersCreated: number
  sessionsPlayed: number
  hoursPlayed: number
}

export default function ProfilePage() {
  const t = useTranslations('profile')
  const router = useRouter()
  
  const [profile, setProfile] = useState<UserProfile>({
    playerName: 'Adrian Silva',
    email: 'adrian@example.com',
    nickname: '@adriansilva',
    playerBio: 'Entusiasta de RPG há mais de 10 anos. Adoro criar histórias épicas e interpretar personagens únicos. Tenho experiência principalmente com sistemas narrativos e gosto de campanhas com foco em roleplay.',
    location: 'São Paulo, Brasil',
    birthDate: '1990-05-15',
    avatar: '',
    joinDate: '2023-01-15',
    campaignsPlayed: 23,
    favoriteSystem: 'Gaia RPG',
    favoriteCharacter: 'Thorin Pedraverde - Anão Guerreiro',
    preferredRole: 'Tanque/Protetor',
    playingTime: 'Fins de semana e quartas à noite',
    experienceLevel: 'advanced',
    charactersCreated: 47,
    sessionsPlayed: 156,
    hoursPlayed: 624
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Salvando perfil:', profile)
    setIsEditing(false)
  }

  const getExperienceBadge = (level: string) => {
    const levels = {
      beginner: { label: t('experienceLevels.beginner'), color: 'bg-green-500' },
      intermediate: { label: t('experienceLevels.intermediate'), color: 'bg-blue-500' },
      advanced: { label: t('experienceLevels.advanced'), color: 'bg-purple-500' },
      master: { label: t('experienceLevels.master'), color: 'bg-yellow-500' }
    }
    return levels[level as keyof typeof levels] || levels.beginner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
      {/* Enhanced Floating Elements */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-32 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-3/5 left-32 w-44 h-44 bg-secondary/12 rounded-full blur-2xl animate-pulse delay-200"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="pt-8 pb-6">
          <div className="container mx-auto px-2 md:px-4 max-w-6xl">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="bg-card/50 backdrop-blur-lg border-border/50 hover:bg-card/80 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 tracking-tight leading-[1.2] pb-2">
                {t('title')}
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="container mx-auto px-2 md:px-4 pb-32 max-w-6xl">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pr-6">
              
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg rounded-2xl">
                  <CardContent className="p-8 text-center bg-card/30">
                    <div className="relative mb-6">
                      <Avatar className="w-32 h-32 mx-auto border-4 border-primary/30 shadow-2xl">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                          {profile.playerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-accent"
                        onClick={() => {/* Implementar upload de foto */}}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{profile.playerName}</h2>
                    <p className="text-muted-foreground mb-4">{profile.nickname}</p>
                    
                    <div className="flex justify-center mb-6">
                      <Badge className={`${getExperienceBadge(profile.experienceLevel).color} text-white`}>
                        {getExperienceBadge(profile.experienceLevel).label}
                      </Badge>
                    </div>

                    {/* RPG Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-card/40 rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">{profile.campaignsPlayed}</div>
                        <div className="text-xs text-muted-foreground">{t('stats.campaigns')}</div>
                      </div>
                      <div className="bg-card/40 rounded-lg p-3">
                        <div className="text-2xl font-bold text-accent">{profile.charactersCreated}</div>
                        <div className="text-xs text-muted-foreground">{t('stats.characters')}</div>
                      </div>
                      <div className="bg-card/40 rounded-lg p-3">
                        <div className="text-2xl font-bold text-secondary">{profile.sessionsPlayed}</div>
                        <div className="text-xs text-muted-foreground">{t('stats.sessions')}</div>
                      </div>
                      <div className="bg-card/40 rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">{profile.hoursPlayed}h</div>
                        <div className="text-xs text-muted-foreground">{t('stats.hoursPlayed')}</div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mb-4">
                      {t('memberSince')}: {new Date(profile.joinDate).toLocaleDateString('pt-BR')}
                    </div>

                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {isEditing ? t('cancelEdit') : t('editProfile')}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info Card */}
                <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg rounded-2xl">
                  <CardHeader className="bg-card/30 backdrop-blur-lg rounded-t-2xl">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>{t('personalInfo')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 bg-card/30 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="playerName">{t('playerName')}</Label>
                        <Input
                          id="playerName"
                          value={profile.playerName}
                          onChange={(e) => handleInputChange('playerName', e.target.value)}
                          disabled={!isEditing}
                          placeholder={t('playerNamePlaceholder')}
                          className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nickname">{t('nickname')}</Label>
                        <Input
                          id="nickname"
                          value={profile.nickname}
                          onChange={(e) => handleInputChange('nickname', e.target.value)}
                          disabled={!isEditing}
                          placeholder={t('nicknamePlaceholder')}
                          className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        placeholder={t('emailPlaceholder')}
                        className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playerBio">{t('playerBio')}</Label>
                      <Textarea
                        id="playerBio"
                        value={profile.playerBio}
                        onChange={(e) => handleInputChange('playerBio', e.target.value)}
                        disabled={!isEditing}
                        className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl min-h-[100px]"
                        placeholder={t('playerBioPlaceholder')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location">{t('location')}</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          disabled={!isEditing}
                          placeholder={t('locationPlaceholder')}
                          className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">{t('birthDate')}</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profile.birthDate}
                          onChange={(e) => handleInputChange('birthDate', e.target.value)}
                          disabled={!isEditing}
                          className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* RPG Preferences Card */}
                <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg rounded-2xl">
                  <CardHeader className="bg-card/30 backdrop-blur-lg rounded-t-2xl">
                    <CardTitle className="flex items-center space-x-2">
                      <Gamepad2 className="w-5 h-5" />
                      <span>{t('rpgPreferences')}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 bg-card/30 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="favoriteSystem">{t('favoriteSystem')}</Label>
                        <Input
                          id="favoriteSystem"
                          value={profile.favoriteSystem}
                          onChange={(e) => handleInputChange('favoriteSystem', e.target.value)}
                          disabled={!isEditing}
                          placeholder={t('favoriteSystemPlaceholder')}
                          className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredRole">{t('preferredRole')}</Label>
                        <Input
                          id="preferredRole"
                          value={profile.preferredRole}
                          onChange={(e) => handleInputChange('preferredRole', e.target.value)}
                          disabled={!isEditing}
                          placeholder={t('preferredRolePlaceholder')}
                          className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="favoriteCharacter">{t('favoriteCharacter')}</Label>
                      <Input
                        id="favoriteCharacter"
                        value={profile.favoriteCharacter}
                        onChange={(e) => handleInputChange('favoriteCharacter', e.target.value)}
                        disabled={!isEditing}
                        placeholder={t('favoriteCharacterPlaceholder')}
                        className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playingTime">{t('playingTime')}</Label>
                      <Input
                        id="playingTime"
                        value={profile.playingTime}
                        onChange={(e) => handleInputChange('playingTime', e.target.value)}
                        disabled={!isEditing}
                        placeholder={t('playingTimePlaceholder')}
                        className="bg-card/40 backdrop-blur-sm border-border/50 focus:bg-card/60 rounded-xl"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-6">
                        <Button
                          onClick={handleSave}
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {t('saveChanges')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 rounded-xl"
                        >
                          {t('cancel')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
