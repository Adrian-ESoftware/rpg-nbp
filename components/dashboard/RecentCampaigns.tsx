import React from "react"
import { Crown, BirdIcon as Dragon, TreesIcon as Tree, Dice1 } from "lucide-react"

const recentCampaigns = [
  {
    id: 1,
    name: "As Ruínas de Draconia",
    lastSession: "27 de Maio, 2025",
    icon: Dragon,
  },
  {
    id: 2,
    name: "A Floresta dos Sussurros",
    lastSession: "20 de Maio, 2025",
    icon: Tree,
  },
  {
    id: 3,
    name: "O Tesouro do Rei Caído",
    lastSession: "15 de Maio, 2025",
    icon: Crown,
  },
]

const RecentCampaigns: React.FC = () => (
  <div>
    <div className="flex items-center mb-6">
      <h2 className="text-2xl font-bold text-primary font-serif">Campanhas Recentes</h2>
      <div className="ml-4 flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
    </div>
    <div className="space-y-6">
      {recentCampaigns.map((campaign) => {
        const IconComponent = campaign.icon
        return (
          <div
            key={campaign.id}
            className="flex bg-card bg-opacity-80 border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-sm"
          >
            <div className="w-28 h-28 bg-primary/20 to-card bg-gradient-to-br flex items-center justify-center">
              <IconComponent className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2 font-serif">{campaign.name}</h3>
                <p className="text-foreground/70">Última sessão: {campaign.lastSession}</p>
              </div>
            </div>
            <div className="flex items-center pr-6">
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center space-x-3 transition-all duration-200 shadow-lg">
                <Dice1 className="w-4 h-4" />
                <span>Continuar</span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

export default RecentCampaigns