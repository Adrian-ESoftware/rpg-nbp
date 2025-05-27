"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  Castle,
  Shield,
  Scroll,
  DoorOpen,
  Wand2,
  Settings,
  User,
  Crown,
  BirdIcon as Dragon,
  TreesIcon as Tree,
  Bell,
  Calendar,
  PowerIcon as Gear,
  BookOpen,
  Mail,
  Dice1,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

const Dashboard: React.FC = () => {
  const [roomCode, setRoomCode] = useState("")

  const navigationItems = [
    { id: "dashboard", icon: Castle, label: "Dashboard", href: "/" },
    { id: "create-character", icon: Shield, label: "Criar Personagem", href: "/create-character" },
    { id: "campaigns", icon: Scroll, label: "Minhas Campanhas", href: "/campaigns" },
    { id: "join-room", icon: DoorOpen, label: "Entrar em Sala", href: "/join-room" },
    { id: "master-tools", icon: Wand2, label: "Ferramentas do Mestre", href: "/master-tools" },
    { id: "settings", icon: Settings, label: "Configurações", href: "/settings" },
  ]

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

  const notifications = [
    {
      id: 1,
      title: "Nova Expansão!",
      content: "O Reino das Sombras já está disponível. Novos monstros e magias para sua aventura!",
      date: "27 de Maio, 2025",
      type: "update",
      icon: Scroll,
      bgColor: "bg-emerald-600",
    },
    {
      id: 2,
      title: "Torneio de Aventureiros",
      content: "Inscrições abertas para o grande torneio. Prêmios mágicos para os vencedores!",
      date: "25 de Maio, 2025",
      type: "event",
      icon: Calendar,
      bgColor: "bg-blue-600",
    },
    {
      id: 3,
      title: "Manutenção Programada",
      content: "Os servidores estarão em manutenção no dia 30/05 das 02h às 05h.",
      date: "24 de Maio, 2025",
      type: "system",
      icon: Gear,
      bgColor: "bg-gray-700",
    },
    {
      id: 4,
      title: "Novo Livro de Regras",
      content: "Adicionamos o Grimório Arcano com 50 novas magias para todas as classes!",
      date: "20 de Maio, 2025",
      type: "update",
      icon: BookOpen,
      bgColor: "bg-yellow-600",
    },
    {
      id: 5,
      title: "Convite de Campanha",
      content: 'Você foi convidado para a campanha "Montanhas Gélidas" por Merlin.',
      date: "18 de Maio, 2025",
      type: "invite",
      icon: Mail,
      bgColor: "bg-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <SidebarProvider>
        <div className="flex min-h-screen text-gray-100">
          {/* Sidebar */}
          <Sidebar className="!bg-gray-950 border-r border-yellow-900/30" style={{ backgroundColor: "#1f2937" }}>
            <SidebarHeader
              className="!bg-gray-950 border-b border-yellow-900/30"
              style={{ backgroundColor: "#1f2937" }}
            >
              <div className="p-8 flex justify-center">
                <h1 className="text-3xl font-bold text-emerald-400 font-serif">RPG Master</h1>
              </div>
            </SidebarHeader>

            <SidebarContent className="!bg-gray-950 py-8" style={{ backgroundColor: "#1f2937" }}>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        className="w-full text-left px-8 py-4 flex items-center space-x-4 transition-all duration-200 hover:bg-emerald-900/20 hover:text-emerald-300 data-[active=true]:bg-emerald-900/30 data-[active=true]:text-emerald-300 data-[active=true]:border-l-4 data-[active=true]:border-emerald-400 text-gray-100"
                      >
                        <Link href={item.href} className="flex items-center space-x-4 w-full">
                          <IconComponent className="w-6 h-6 text-emerald-400" />
                          <span className="whitespace-nowrap">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter
              className="!bg-gray-950 border-t border-yellow-900/30"
              style={{ backgroundColor: "#1f2937" }}
            >
              <div className="p-6 flex justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 mx-auto mb-2 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-gray-100" />
                  </div>
                  <p className="text-sm text-gray-100">Gabriel</p>
                  <p className="text-xs text-emerald-400">Mestre de Jogo</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
            <div className="p-10 overflow-y-auto relative z-10">
              {/* Header with Sidebar Trigger */}
              <div className="flex items-center mb-6">
                <SidebarTrigger className="text-gray-100 hover:text-emerald-300" />
              </div>

              {/* Top Section - Welcome and Join Room side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Welcome Banner - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <div className="p-8 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-900/30 shadow-2xl backdrop-blur-sm h-full">
                    <h1 className="text-4xl font-bold text-emerald-400 mb-3 font-serif">
                      Bem-vindo, aventureiro Gabriel!
                    </h1>
                    <p className="text-lg text-gray-200/80">
                      Que sua jornada hoje seja repleta de glória e tesouros. O que deseja fazer?
                    </p>
                  </div>
                </div>

                {/* Join Room Section - Takes 1 column (same width as notifications) */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-900/30 rounded-xl p-6 shadow-2xl backdrop-blur-sm h-full flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-emerald-400 mb-4 font-serif">Entrar em uma Sala</h2>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="Digite o código da sala..."
                        className="w-full px-4 py-2 bg-gray-950/50 border border-yellow-900/40 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50"
                      />
                      <button className="w-full px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-gray-900 rounded-lg transition-all duration-200 font-semibold shadow-lg">
                        Entrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Left Side */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Main Action Buttons */}
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

                  {/* Recent Campaigns */}
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
                </div>

                {/* Notifications Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-900/30 rounded-xl p-8 h-full shadow-2xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center font-serif">
                      <Bell className="w-6 h-6 mr-3" />
                      Quadro de Avisos
                    </h2>
                    <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">
                      {notifications.map((notification) => {
                        const IconComponent = notification.icon
                        return (
                          <div
                            key={notification.id}
                            className={`bg-gray-900/70 p-6 rounded-xl border-4 border-transparent relative cursor-pointer hover:border-emerald-500 transition-all duration-200 shadow-lg backdrop-blur-sm`}
                            style={{ borderColor: notification.bgColor.replace('bg-', '') }}
                          >
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-lg bg-gray-800">
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-100 font-serif">{notification.title}</h3>
                                <p className="text-sm mb-2 text-gray-300">{notification.content}</p>
                                <p className="text-xs text-gray-400">{notification.date}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard
