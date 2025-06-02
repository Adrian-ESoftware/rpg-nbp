'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Users, Calendar, Clock, MapPin, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Campaign {
  id: string
  titleKey: string
  descriptionKey: string
  playerCount: number
  maxPlayers: number
  nextSession: string
  lastSession: string
  system: string
  status: 'active' | 'paused'
  image: string
  rating?: number
}

// Mock data - using translation keys with gradients
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    titleKey: 'ruinsOfDraconia',
    descriptionKey: 'ruinsDescription',
    playerCount: 4,
    maxPlayers: 6,
    nextSession: '2024-01-15',
    lastSession: 'há 2 dias',
    system: 'Gaia RPG',
    status: 'active',
    image: 'gradient-purple',
    rating: 4.8
  },
  {
    id: '2',
    titleKey: 'whisperingForest',
    descriptionKey: 'forestDescription',
    playerCount: 3,
    maxPlayers: 5,
    nextSession: '2024-01-18',
    lastSession: 'há 1 semana',
    system: 'D&D 5e',
    status: 'active',
    image: 'gradient-green',
    rating: 4.5
  },
  {
    id: '3',
    titleKey: 'fallenKingTreasure',
    descriptionKey: 'treasureDescription',
    playerCount: 2,
    maxPlayers: 4,
    nextSession: '2024-01-20',
    lastSession: 'há 3 semanas',
    system: 'Pathfinder',
    status: 'paused',
    image: 'gradient-gold',
    rating: 4.2
  },
  {
    id: '4',
    titleKey: 'hauntedMine',
    descriptionKey: 'mineDescription',
    playerCount: 5,
    maxPlayers: 6,
    nextSession: '2024-01-22',
    lastSession: 'há 1 dia',
    system: 'Call of Cthulhu',
    status: 'active',
    image: 'gradient-gray',
    rating: 4.9
  },
  {
    id: '5',
    titleKey: 'ruinsOfDraconia',
    descriptionKey: 'ruinsDescription',
    playerCount: 6,
    maxPlayers: 8,
    nextSession: '2024-01-25',
    lastSession: 'há 5 dias',
    system: 'Vampire',
    status: 'active',
    image: 'gradient-red',
    rating: 4.7
  },
  {
    id: '6',
    titleKey: 'whisperingForest',
    descriptionKey: 'forestDescription',
    playerCount: 2,
    maxPlayers: 4,
    nextSession: '2024-01-28',
    lastSession: 'há 1 semana',
    system: 'Savage Worlds',
    status: 'active',
    image: 'gradient-teal',
    rating: 4.3
  }
]

const getGradientStyle = (imageType: string) => {
  const gradients = {
    'gradient-purple': 'linear-gradient(135deg, #8B5CF6, #C084FC)',
    'gradient-green': 'linear-gradient(135deg, #10B981, #34D399)',
    'gradient-gold': 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    'gradient-gray': 'linear-gradient(135deg, #6B7280, #9CA3AF)',
    'gradient-red': 'linear-gradient(135deg, #DC2626, #EF4444)',
    'gradient-teal': 'linear-gradient(135deg, #059669, #10B981)',
  }
  return gradients[imageType as keyof typeof gradients] || gradients['gradient-purple']
}

export default function CampaignsPage() {
  const t = useTranslations('campaigns')
  const router = useRouter()
  const [campaigns] = useState<Campaign[]>(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCampaigns = campaigns.filter(campaign =>
    t(campaign.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(campaign.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateCampaign = () => {
    router.push('/dash/create-session')
  }

  const handleCampaignClick = (campaignId: string) => {
    console.log('Abrindo campanha:', campaignId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
      {/* Enhanced Floating Elements - more dispersed */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-32 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-3/5 left-32 w-44 h-44 bg-secondary/12 rounded-full blur-2xl animate-pulse delay-200"></div>
      <div className="absolute top-1/6 left-1/3 w-20 h-20 bg-primary/18 rounded-full blur-lg animate-pulse delay-800"></div>
      <div className="absolute bottom-1/6 right-1/4 w-32 h-32 bg-accent/22 rounded-full blur-xl animate-pulse delay-400"></div>

      <div className="relative z-10">
        {/* Header - sem badge */}
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-8xl">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6 tracking-tight">
                {t('title')}
              </h1>
              
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Search and Create Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="flex-1 w-full relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-16 text-lg bg-card/40 backdrop-blur-lg border-border/50 focus:bg-card/60 focus:shadow-2xl transition-all duration-500 rounded-2xl"
                  />
                </div>
                <Button 
                  onClick={handleCreateCampaign}
                  className="h-16 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/40 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  {t('newCampaign')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid com mais campanhas por linha */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 pb-32 max-w-8xl">
          <ScrollArea className="h-[calc(100vh-400px)]">
            {/* Grid responsivo com 5 colunas em telas grandes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pr-6">
              {filteredCampaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="transform hover:scale-105 transition-all duration-500"
                >
                  <Card 
                    className="group shadow-2xl border-primary/20 bg-card/50 backdrop-blur-lg cursor-pointer hover:bg-card/70 transition-all duration-500 hover:shadow-3xl overflow-hidden rounded-2xl h-full"
                    onClick={() => handleCampaignClick(campaign.id)}
                  >
                    {/* Campaign Image - altura reduzida */}
                    <div className="relative h-36 overflow-hidden">
                      <div 
                        className="w-full h-full flex items-center justify-center text-white font-bold text-sm transition-transform duration-500 group-hover:scale-110"
                        style={{ background: getGradientStyle(campaign.image) }}
                      >
                        {t(campaign.titleKey)}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating Status Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge 
                          variant={campaign.status === 'active' ? 'default' : 'secondary'}
                          className="bg-card/80 backdrop-blur-sm border-border/40 shadow-lg text-xs"
                        >
                          {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                        </Badge>
                      </div>

                      {/* Rating */}
                      {campaign.rating && (
                        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-card/80 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium">{campaign.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Campaign Content - compacto */}
                    <CardContent className="p-4 bg-card/30 backdrop-blur-lg flex-1 flex flex-col">
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                        {t(campaign.descriptionKey)}
                      </p>

                      {/* Stats compactos */}
                      <div className="grid grid-cols-1 gap-2 mb-3">
                        <div className="flex items-center justify-between text-xs p-2 bg-card/40 rounded-lg">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">Players</span>
                          </div>
                          <span className="font-semibold">{campaign.playerCount}/{campaign.maxPlayers}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs p-2 bg-card/40 rounded-lg">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground truncate">Sistema</span>
                          </div>
                          <span className="font-semibold text-right">{campaign.system}</span>
                        </div>
                      </div>

                      {/* Action Buttons compactos */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-xs bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 shadow-lg hover:shadow-xl transition-all duration-300 py-1 h-7"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          Detalhes
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 py-1 h-7"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          Entrar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Enhanced Empty State */}
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-20">
              <Card className="max-w-lg mx-auto shadow-3xl border-primary/20 bg-card/50 backdrop-blur-lg rounded-3xl">
                <CardContent className="p-12 text-center bg-card/30">
                  <div className="text-muted-foreground mb-6">
                    <Users size={80} className="mx-auto opacity-40" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t('noCampaignsFound')}
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    {searchTerm
                      ? t('noCampaignsDescription')
                      : t('createFirstCampaign')}
                  </p>
                  <Button 
                    onClick={handleCreateCampaign}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/40 shadow-2xl hover:shadow-3xl transition-all duration-500 px-8 py-4 text-lg rounded-2xl"
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    {t('createFirstCampaignButton')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
