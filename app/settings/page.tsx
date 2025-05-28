"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Bell, Shield, LogOut } from "lucide-react"
import ThemeSwitcher from "@/components/ThemeSwitcher"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const settingsCategories = [
    {
      title: "Perfil",
      icon: User,
      description: "Gerencie suas informações pessoais",
      items: [
        { label: "Editar Perfil", action: () => console.log("Editar perfil") },
        { label: "Alterar Senha", action: () => console.log("Alterar senha") },
      ]
    },
    {
      title: "Notificações",
      icon: Bell,
      description: "Configure suas preferências de notificação",
      items: [
        { label: "Notificações de Campanhas", action: () => console.log("Campanhas") },
        { label: "Notificações de Convites", action: () => console.log("Convites") },
      ]
    },
    {
      title: "Segurança",
      icon: Shield,
      description: "Configurações de segurança e privacidade",
      items: [
        { label: "Autenticação de Dois Fatores", action: () => console.log("2FA") },
        { label: "Sessões Ativas", action: () => console.log("Sessões") },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-card-foreground mb-2">
                Aparência
              </h2>
              <p className="text-muted-foreground text-sm mb-3">
                Personalize a aparência da sua interface
              </p>
              <ThemeSwitcher />
            </div>

            {/* Settings Categories */}
            {settingsCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.title} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-card-foreground">
                        {category.title}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full text-left p-3 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Exportar Dados
                </button>
                <button className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Backup Personagens
                </button>
                <div className="space-y-3">
                <button className="w-full p-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Sair da Conta</span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}