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
      <h2 className="text-2xl font-bold text-emerald-400 font-serif">Campanhas Recentes</h2>
      <div className="ml-4 flex-1 h-px bg-gradient-to-r from-emerald-600/50 to-transparent"></div>
    </div>
    <div className="space-y-6">
      {recentCampaigns.map((campaign) => {
        const IconComponent = campaign.icon
        return (
          <div
            key={campaign.id}
            className="flex bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-yellow-900/30 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-sm"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-900/30 to-gray-950/50 flex items-center justify-center">
              <IconComponent className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-2 font-serif">{campaign.name}</h3>
                <p className="text-gray-200/70">Última sessão: {campaign.lastSession}</p>
              </div>
            </div>
            <div className="flex items-center pr-6">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-lg flex items-center space-x-3 transition-all duration-200 shadow-lg">
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
