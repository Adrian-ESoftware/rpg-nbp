'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Users, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Campaign {
  id: string
  title: string
  description: string
  playerCount: number
  maxPlayers: number
  nextSession: string
  image?: string
}

// Mock data - replace with actual data fetching
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'The Dragon\'s Hoard',
    description: 'A classic fantasy adventure where heroes seek to reclaim a stolen treasure from an ancient dragon.',
    playerCount: 4,
    maxPlayers: 6,
    nextSession: '2024-01-15',
    image: '/campaign1.jpg'
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    description: 'Navigate the neon-lit streets of Night City in this futuristic cyberpunk campaign.',
    playerCount: 3,
    maxPlayers: 5,
    nextSession: '2024-01-18',
    image: '/campaign2.jpg'
  },
  {
    id: '3',
    title: 'Call of Cthulhu: Shadows',
    description: 'Investigate cosmic horrors and uncover dark secrets in 1920s New England.',
    playerCount: 5,
    maxPlayers: 6,
    nextSession: '2024-01-20',
    image: '/campaign3.jpg'
  }
]

export default function CampaignsPage() {
  const t = useTranslations('campaigns')
  const router = useRouter()
  const [campaigns] = useState<Campaign[]>(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateCampaign = () => {
    router.push('/dash/create-session')
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('description')}
          </p>
        </div>
        <button 
          onClick={handleCreateCampaign}
          className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          {t('newCampaign')}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="themed-input block w-full pl-10 pr-3 py-3 rounded-lg leading-5"
        />
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="campaign-card rounded-xl shadow-md transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105"
          >
            {/* Campaign Image */}
            <div className="h-48 bg-gradient-to-r from-primary to-accent relative">
              {campaign.image ? (
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <h3 className="text-primary-foreground text-xl font-bold text-center px-4">
                    {campaign.title}
                  </h3>
                </div>
              )}
            </div>

            {/* Campaign Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {campaign.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {campaign.description}
              </p>

              {/* Campaign Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{campaign.playerCount}/{campaign.maxPlayers} {t('players')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(campaign.nextSession).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  {t('viewDetails')}
                </button>
                <button className="flex-1 btn-accent py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  {t('joinSession')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Users size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t('noCampaignsFound')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? t('noCampaignsDescription')
              : t('createFirstCampaign')}
          </p>
          <button 
            onClick={handleCreateCampaign}
            className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <Plus size={20} />
            {t('createFirstCampaignButton')}
          </button>
        </div>
      )}
    </div>
  )
}
