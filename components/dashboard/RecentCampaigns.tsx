"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import { Crown, BirdIcon as Dragon, TreesIcon as Tree, Dice1, PlayIcon, Wand2 } from "lucide-react"

const RecentCampaigns: React.FC = () => {
  const router = useRouter()
  const t = useTranslations('campaigns')
  const tCommon = useTranslations('common')

  // Updated campaign data with translations
  const recentCampaigns = [
    {
      id: 1,
      name: t('ruinsOfDraconia'),
      description: t('ruinsDescription'),
      lastSession: "27 de Maio, 2025",
      imageUrl: "https://placehold.co/400x180/525252/FFFFFF?text=Draconia+Ruins",
      icon: Dragon,
    },
    {
      id: 2,
      name: t('whisperingForest'),
      description: t('forestDescription'),
      lastSession: "20 de Maio, 2025",
      imageUrl: "https://placehold.co/400x180/4CAF50/FFFFFF?text=Whispering+Forest",
      icon: Tree,
    },
    {
      id: 3,
      name: t('fallenKingTreasure'),
      description: t('treasureDescription'),
      lastSession: "15 de Maio, 2025",
      imageUrl: "https://placehold.co/400x180/FFC107/333333?text=Fallen+King%27s+Treasure",
      icon: Crown,
    },
    {
      id: 4,
      name: t('hauntedMine'),
      description: t('mineDescription'),
      lastSession: "08 de Maio, 2025",
      imageUrl: "https://placehold.co/400x180/795548/FFFFFF?text=Haunted+Mine",
      icon: Dice1,
    },
    // Novo card para criar sessão
    {
      id: 5,
      name: t('createNewSession'),
      description: t('createNewDescription'),
      lastSession: "N/A",
      icon: Wand2,
      isCreateCard: true,
    },
  ]

  // Função para lidar com o clique no card inteiro "Criar"
  const handleCreateSession = () => {
    router.push("/dash/create-session")
  }

  return (
    <div className="text-white font-inter">
      {/* Title and dividing line */}
      <div className="flex items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-primary font-serif tracking-wide bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{t('recentCampaigns')}</h2>
        <div className="ml-6 flex-1 h-1 bg-gradient-to-r from-primary/70 via-accent/50 to-transparent rounded-full"></div>
      </div>

      {/* Campaign list in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {recentCampaigns.map((campaign) => {
          // Conditional rendering for the creation card vs. campaign cards
          if (campaign.isCreateCard) {
            return (
              <div
                key={campaign.id}
                onClick={handleCreateSession}
                className="flex flex-col items-center justify-center text-center p-8
                           bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl
                           overflow-hidden hover:border-primary/60 transition-all duration-500 cursor-pointer
                           shadow-2xl hover:shadow-3xl transform hover:scale-105 min-h-[320px]
                           hover:bg-primary/10 active:scale-95
                           bg-gradient-to-br from-card/70 via-card/50 to-card/30"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl
                                bg-primary/20 backdrop-blur-sm border-2 border-primary/40
                                flex items-center justify-center
                                hover:bg-primary/30 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  {/* SVG for Plus icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-primary"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 font-serif leading-tight">{campaign.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{campaign.description}</p>
              </div>
            );
          } else {
            // Rendering for existing campaign cards
            const IconComponent = campaign.icon;
            return (
              <div
                key={campaign.id}
                className="flex flex-col bg-card/60 backdrop-blur-lg border border-border/40 rounded-2xl overflow-hidden
                           hover:border-primary/60 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-3xl
                           transform hover:scale-105 bg-gradient-to-br from-card/70 via-card/50 to-card/30"
              >
                {/* Campaign image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x180/525252/FFFFFF?text=Image+Error`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Icon overlay on image */}
                  <div className="absolute top-4 left-4 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 shadow-lg">
                    {React.createElement(IconComponent, { className: "w-6 h-6 text-primary" })}
                  </div>
                </div>

                {/* Campaign information */}
                <div className="flex-1 p-6 flex flex-col justify-between bg-card/30 backdrop-blur-sm">
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-3 font-serif leading-tight">{campaign.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{campaign.description}</p>
                    <p className="text-muted-foreground/70 text-xs">{t('lastSession')}: {campaign.lastSession}</p>
                  </div>
                  {/* "Enter" button */}
                  <button className="mt-6 px-6 py-3 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent 
                                     text-primary-foreground rounded-xl backdrop-blur-sm border border-primary/30
                                     flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl hover:shadow-2xl
                                     text-base font-semibold transform hover:scale-105 hover:-translate-y-1">
                    <PlayIcon className="w-5 h-5" />
                    <span>{tCommon('enter')}</span>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default RecentCampaigns