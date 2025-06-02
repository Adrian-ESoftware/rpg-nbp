import React from "react"
import { useTranslations } from 'next-intl'
import { Sparkles, Crown, Shield, Sword } from "lucide-react"

const WelcomeBanner: React.FC = () => {
  const t = useTranslations('dashboard')

  return (
    <div className="
      relative p-6 rounded-2xl overflow-hidden
      bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-lg
      border border-border/40 
      shadow-2xl hover:shadow-3xl
      h-full transition-all duration-300
      transform hover:scale-[1.01]
    ">
      {/* Animated Background Elements */}
      <div className="absolute top-3 right-5 opacity-20">
        <Crown className="w-12 h-12 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-3 right-3 opacity-15">
        <Sword className="w-10 h-10 text-accent rotate-45 animate-pulse delay-1000" />
      </div>
      <div className="absolute top-1/2 right-6 opacity-10">
        <Shield className="w-16 h-16 text-secondary animate-pulse delay-500" />
      </div>
      
      {/* Floating Sparkles */}
      <div className="absolute top-4 left-6 opacity-40">
        <Sparkles className="w-5 h-5 text-primary animate-pulse delay-300" />
      </div>
      <div className="absolute bottom-6 left-10 opacity-30">
        <Sparkles className="w-4 h-4 text-accent animate-pulse delay-700" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center space-x-6">
        {/* User Avatar Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm border-2 border-primary/40 flex items-center justify-center shadow-xl">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">G</span>
            </div>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
              {t('welcomeMessage', { name: 'Gabriel' })}
            </h1>
            <div className="flex space-x-1">
              <Sparkles className="w-7 h-7 text-primary animate-bounce" />
              <Sparkles className="w-6 h-6 text-accent animate-bounce delay-100" />
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {t('welcomeDescription')}
          </p>

          {/* Stats Row */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-3 bg-background/40 backdrop-blur-sm px-5 py-3 rounded-xl border border-border/30">
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Nível 12</span>
            </div>
            <div className="flex items-center space-x-3 bg-background/40 backdrop-blur-sm px-5 py-3 rounded-xl border border-border/30">
              <Shield className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium text-card-foreground">Mestre</span>
            </div>
            <div className="flex items-center space-x-3 bg-background/40 backdrop-blur-sm px-5 py-3 rounded-xl border border-border/30">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span className="text-sm font-medium text-card-foreground">2.4k XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
    </div>
  )
}

export default WelcomeBanner