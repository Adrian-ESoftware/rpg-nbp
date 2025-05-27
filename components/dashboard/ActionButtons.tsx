import React from "react"
import Link from "next/link"
import { Wand2, Shield } from "lucide-react"

const actionButtons = [
  {
    id: "create-session",
    icon: Wand2,
    label: "Criar Sessão",
    desc: "Inicie uma nova aventura",
    href: "/create-session",
  },
  {
    id: "create-char",
    icon: Shield,
    label: "Criar Personagem",
    desc: "Forje um novo herói",
    href: "/create-character",
  },
]

const ActionButtons: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {actionButtons.map((button) => {
      const IconComponent = button.icon
      return (
        <Link
          key={button.id}
          href={button.href}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-yellow-900/30 p-8 rounded-xl text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-600/50 group cursor-pointer block backdrop-blur-sm"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-2 border-emerald-500 flex items-center justify-center group-hover:from-emerald-500 group-hover:to-emerald-600 transition-all duration-300 shadow-lg">
            <IconComponent className="w-8 h-8 text-emerald-400 group-hover:text-gray-900" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-400 mb-2 font-serif">{button.label}</h3>
          <p className="text-gray-200/70">{button.desc}</p>
        </Link>
      )
    })}
  </div>
)

export default ActionButtons
