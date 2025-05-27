import React from "react"
import { Bell, Scroll, Calendar, PowerIcon as Gear, BookOpen, Mail } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Nova Expansão!",
    content: "O Reino das Sombras já está disponível. Novos monstros e magias para sua aventura!",
    date: "27 de Maio, 2025",
    type: "update",
    icon: Scroll,
  },
  {
    id: 2,
    title: "Torneio de Aventureiros",
    content: "Inscrições abertas para o grande torneio. Prêmios mágicos para os vencedores!",
    date: "25 de Maio, 2025",
    type: "event",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Manutenção Programada",
    content: "Os servidores estarão em manutenção no dia 30/05 das 02h às 05h.",
    date: "24 de Maio, 2025",
    type: "system",
    icon: Gear,
  },
  {
    id: 4,
    title: "Novo Livro de Regras",
    content: "Adicionamos o Grimório Arcano com 50 novas magias para todas as classes!",
    date: "20 de Maio, 2025",
    type: "update",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Convite de Campanha",
    content: 'Você foi convidado para a campanha "Montanhas Gélidas" por Merlin.',
    date: "18 de Maio, 2025",
    type: "invite",
    icon: Mail,
  },
]

const borderColorsByType: Record<string, string> = {
  update: "border-primary",
  event: "border-accent",
  system: "border-muted",
  invite: "border-destructive",
}

const NotificationsPanel: React.FC = () => (
  <div className="bg-background bg-opacity-80 border border-border rounded-xl p-8 h-full shadow-2xl backdrop-blur-sm">
    <h2 className="text-2xl font-bold text-primary mb-8 flex items-center font-serif select-none">
      <Bell className="w-6 h-6 mr-3" />
      Quadro de Avisos
    </h2>
    <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">
      {notifications.map((notification) => {
        const IconComponent = notification.icon
        const borderColorClass = borderColorsByType[notification.type] || "border-border"
        return (
          <div
            key={notification.id}
            className={`
              bg-card bg-opacity-70 p-6 rounded-xl border-4 border-transparent
              relative cursor-pointer hover:${borderColorClass} transition-all duration-200
              shadow-lg backdrop-blur-sm
            `}
          >
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-lg bg-muted bg-opacity-70">
                <IconComponent className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground font-serif">{notification.title}</h3>
                <p className="text-sm mb-2 text-muted-foreground">{notification.content}</p>
                <p className="text-xs text-muted-foreground">{notification.date}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

export default NotificationsPanel