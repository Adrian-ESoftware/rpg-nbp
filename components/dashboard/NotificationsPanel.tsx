import React, { useState } from "react"
import { Bell, Scroll, Calendar, Settings, BookOpen, Mail } from "lucide-react"

// Dados iniciais das notificações
const initialNotifications = [
  {
    id: 1,
    title: "Nova Expansão!",
    content: "O Reino das Sombras já está disponível! Mergulhe em um novo continente misterioso, repleto de desafios inéditos, criaturas sombrias e tesouros incalculáveis. Descubra a cidade perdida de Eldoria, enfrente o temível Lich Rei e desvende os segredos de uma magia ancestral proibida. Prepare-se para horas de novas aventuras, missões épicas e a oportunidade de forjar seu nome na história. Novos monstros e magias para sua aventura!",
    date: "27 de Maio, 2025",
    type: "update",
    icon: Scroll,
  },
  {
    id: 2,
    title: "Torneio de Aventureiros",
    content: "Inscrições abertas para o grande torneio. Prêmios mágicos para os vencedores! Não perca a chance de provar o seu valor e conquistar a glória eterna.",
    date: "25 de Maio, 2025",
    type: "event",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Manutenção Programada",
    content: "Os servidores estarão em manutenção no dia 30/05 das 02h às 05h. Durante este período, o acesso ao jogo poderá ser intermitente. Agradecemos a sua compreensão e paciência.",
    date: "24 de Maio, 2025",
    type: "system",
    icon: Settings,
  },
  {
    id: 4,
    title: "Novo Livro de Regras",
    content: "Adicionamos o Grimório Arcano com 50 novas magias para todas as classes! Explore feitiços poderosos, rituais antigos e novas formas de moldar a realidade ao seu redor. Esteja pronto para redefinir as suas estratégias de combate e exploração.",
    date: "20 de Maio, 2025",
    type: "update",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Convite de Campanha",
    content: 'Você foi convidado para a campanha "Montanhas Gélidas" por Merlin. Uma terra de picos gelados e mistérios ancestrais aguarda a sua chegada. Prepare-se para o frio e os perigos que espreitam nas neves eternas.',
    date: "18 de Maio, 2025",
    type: "invite",
    icon: Mail,
  },
]

const borderColorsByType: Record<string, string> = {
  update: "border-primary",
  event: "border-blue-500",
  system: "border-yellow-400",
  invite: "border-destructive",
}

interface NotificationItem {
  id: number
  title: string
  content: string
  date: string
  type: string
  icon: React.ComponentType<{ className?: string }>
}

const NotificationsPanel: React.FC = () => {
  const [notificationList] = useState<NotificationItem[]>(initialNotifications)

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-card-foreground mb-6 flex items-center">
        <Bell className="w-5 h-5 mr-3 text-primary" />
        Quadro de Avisos
      </h2>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {notificationList.map((notification) => {
          const IconComponent = notification.icon
          const borderColorClass = borderColorsByType[notification.type] || "border-primary"
          
          return (
            <div
              key={notification.id}
              className={`
                bg-background/50 p-4 rounded-lg border-l-4 ${borderColorClass}
                hover:bg-accent/10 transition-all duration-200
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground mb-1 text-sm">
                    {notification.title}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {notification.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NotificationsPanel