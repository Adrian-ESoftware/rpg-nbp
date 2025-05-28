"use client"

import { useTheme } from "next-themes"
import { useTranslations } from 'next-intl'
import { useEffect, useState } from "react"
import { Sun, Moon, Castle, Wand2, ChevronDown, Palette, Gem } from "lucide-react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('themes')
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themes = [
    {
      id: "dark",
      name: t('dark'),
      description: t('darkDescription'),
      icon: Moon,
      preview: "bg-gray-900 border-gray-700",
      iconColor: "text-white"
    },
    {
      id: "light",
      name: t('light'),
      description: t('lightDescription'),
      icon: Sun,
      preview: "bg-white border-gray-200",
      iconColor: "text-black"
    },
    {
      id: "fantasy",
      name: t('fantasy'),
      description: t('fantasyDescription'),
      icon: Wand2,
      preview: "bg-purple-900 border-purple-600",
      iconColor: "text-white"
    },
    {
      id: "rpg",
      name: t('rpg'),
      description: t('rpgDescription'),
      icon: Castle,
      preview: "bg-amber-900 border-amber-600",
      iconColor: "text-white"
    },
    {
      id: "emerald",
      name: t('emerald'),
      description: t('emeraldDescription'),
      icon: Gem,
      preview: "bg-emerald-800 border-emerald-600",
      iconColor: "text-white"
    },
    {
      id: "crimson",
      name: t('crimson'),
      description: t('crimsonDescription'),
      icon: Palette,
      preview: "bg-red-900 border-red-600",
      iconColor: "text-white"
    }
  ]

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === theme) {
      setIsOpen(false)
      return
    }

    setIsTransitioning(true)
    
    // Adiciona classe de transição ao body
    document.body.setAttribute('data-theme-transition', 'true')
    
    // Pequeno delay para garantir que a transição seja visível
    setTimeout(() => {
      setTheme(newTheme)
      setIsOpen(false)
    }, 50)
    
    // Remove o indicador de transição
    setTimeout(() => {
      setIsTransitioning(false)
      document.body.removeAttribute('data-theme-transition')
    }, 500)
  }

  if (!mounted) return null

  const currentTheme = themes.find(t => t.id === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <>
      {/* Overlay de transição sutil */}    
      <div className="relative">
        {/* Current Theme Display */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-card border border-border rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 ${currentTheme.preview}`}>
              <CurrentIcon className={`w-4 h-4 transition-colors duration-300 ${currentTheme.iconColor}`} />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-foreground transition-colors duration-300">
                {currentTheme.name}
              </h4>
              <p className="text-xs text-muted-foreground transition-colors duration-300">
                {currentTheme.description}
              </p>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto animate-in slide-in-from-top-2 duration-300">
            {themes.map((themeOption, index) => {
              const IconComponent = themeOption.icon
              const isSelected = theme === themeOption.id
              
              return (
                <button
                  key={themeOption.id}
                  onClick={() => handleThemeChange(themeOption.id)}
                  disabled={isTransitioning}
                  className={`
                    w-full p-3 text-left hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center space-x-3 group relative
                    ${isSelected ? 'bg-primary/10 text-primary' : 'text-popover-foreground'}
                    ${index === 0 ? 'rounded-t-xl' : ''}
                    ${index === themes.length - 1 ? 'rounded-b-xl' : ''}
                    ${isTransitioning ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
                  `}
                >
                  <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${themeOption.preview}`}>
                    <IconComponent className={`w-4 h-4 transition-colors duration-200 ${themeOption.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium transition-colors duration-200">
                        {themeOption.name}
                      </h4>
                      {isSelected && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs opacity-70 transition-opacity duration-200 group-hover:opacity-90">
                      {themeOption.description}
                    </p>
                  </div>
                  
                  {/* Sutil indicador de hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                </button>
              )
            })}
          </div>
        )}

        {/* Click outside to close */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  )
}