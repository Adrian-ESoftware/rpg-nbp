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
          className={`
            bg-background bg-opacity-80
            hover:bg-opacity-90
            border border-border
            p-8 rounded-xl text-center
            transition-all duration-300
            hover:shadow-[0_0_30px_rgb(var(--primary))]
            hover:border-primary
            group cursor-pointer block backdrop-blur-sm
          `}
        >
            <div className={`
            w-20 h-20 mx-auto mb-6 rounded-full
            bg-primary bg-opacity-20
            border-2 border-primary
            flex items-center justify-center
            group-hover:bg-opacity-40
            transition-all duration-300 shadow-lg
            `}>
            <IconComponent className="w-8 h-8 text-background" />
            </div>
          <h3 className="text-2xl font-bold text-primary mb-2 font-serif">{button.label}</h3>
          <p className="text-foreground/70">{button.desc}</p>
        </Link>
      )
    })}
  </div>
)

export default ActionButtons