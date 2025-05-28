"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Crown, BirdIcon as Dragon, TreesIcon as Tree, Dice1, PlayIcon, Wand2 } from "lucide-react"

// Updated campaign data with image placeholders and descriptions
const recentCampaigns = [
  {
    id: 1,
    name: "As Ruínas de Draconia",
    description: "Explore as antigas ruínas e desvende os segredos do dragão adormecido. Uma aventura épica espera por você!",
    lastSession: "27 de Maio, 2025",
    imageUrl: "https://placehold.co/400x180/525252/FFFFFF?text=Draconia+Ruins",
    icon: Dragon,
  },
  {
    id: 2,
    name: "A Floresta dos Sussurros",
    description: "Uma floresta mística onde cada sussurro esconde um segredo ou um perigo. Prepare-se para o desconhecido.",
    lastSession: "20 de Maio, 2025",
    imageUrl: "https://placehold.co/400x180/4CAF50/FFFFFF?text=Whispering+Forest",
    icon: Tree,
  },
  {
    id: 3,
    name: "O Tesouro do Rei Caído",
    description: "Embarque em uma jornada perigosa para recuperar o tesouro de um rei esquecido. A fortuna aguarda os bravos.",
    lastSession: "15 de Maio, 2025",
    imageUrl: "https://placehold.co/400x180/FFC107/333333?text=Fallen+King%27s+Treasure",
    icon: Crown,
  },
  {
    id: 4,
    name: "A Mina Assombrada",
    description: "Desça às profundezas de uma mina amaldiçoada em busca de riquezas e respostas. Cuidado com o que espreita nas sombras.",
    lastSession: "08 de Maio, 2025",
    imageUrl: "https://placehold.co/400x180/795548/FFFFFF?text=Haunted+Mine",
    icon: Dice1,
  },
  // Novo card para criar sessão
  {
    id: 5,
    name: "Criar Nova Sessão",
    description: "Comece uma nova aventura do zero, defina seus desafios e convide seus jogadores.",
    lastSession: "N/A",
    icon: Wand2,
    isCreateCard: true,
  },
]

const RecentCampaigns: React.FC = () => {
  const router = useRouter()

  // Função para lidar com o clique no card inteiro "Criar"
  const handleCreateSession = () => {
    router.push("/dash/create-session")
  }

  return (
    <div className="text-white font-inter">
      {/* Title and dividing line */}
      <div className="flex items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary font-serif tracking-wide">Campanhas Recentes</h2>
        <div className="ml-6 flex-1 h-1 bg-gradient-to-r from-primary/70 to-transparent rounded-full"></div>
      </div>

      {/* Campaign list in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {recentCampaigns.map((campaign) => {
          // Conditional rendering for the creation card vs. campaign cards
          if (campaign.isCreateCard) {
            return (
              <div
                key={campaign.id}
                onClick={handleCreateSession}
                className="flex flex-col items-center justify-center text-center p-6
                           bg-card bg-opacity-80 border border-border rounded-2xl
                           overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer
                           shadow-2xl backdrop-blur-sm transform hover:scale-105 min-h-[280px]
                           hover:bg-primary/5 active:scale-95"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full
                                bg-primary/20 border-2 border-primary
                                flex items-center justify-center
                                hover:bg-primary/30 transition-all duration-300 shadow-lg">
                  {/* SVG for Plus icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-primary"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 font-serif leading-tight">{campaign.name}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{campaign.description}</p>
              </div>
            );
          } else {
            // Rendering for existing campaign cards
            const IconComponent = campaign.icon;
            return (
              <div
                key={campaign.id}
                className="flex flex-col bg-card bg-opacity-80 border border-border rounded-2xl overflow-hidden
                           hover:border-primary/70 transition-all duration-300 cursor-pointer shadow-2xl backdrop-blur-sm
                           transform hover:scale-105"
              >
                {/* Campaign image */}
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.name}
                    className="w-full h-full object-cover rounded-t-2xl"
                    // Fallback for image loading errors
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x180/525252/FFFFFF?text=Image+Error`;
                    }}
                  />
                  {/* Optional icon overlay on image */}
                  <div className="absolute top-4 left-4 p-2 bg-black/50 rounded-full">
                    {React.createElement(IconComponent, { className: "w-6 h-6 text-white" })}
                  </div>
                </div>

                {/* Campaign information */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2 font-serif leading-tight">{campaign.name}</h3>
                    {/* Description with 3-line limit */}
                    <p className="text-foreground/80 text-sm mb-4 line-clamp-3">{campaign.description}</p>
                    <p className="text-foreground/60 text-xs mt-2">Última sessão: {campaign.lastSession}</p>
                  </div>
                  {/* "Enter" button */}
                  <button className="mt-6 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded
                                     flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg
                                     text-base font-semibold">
                    <PlayIcon className="w-5 h-5" />
                    <span>Entrar</span>
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