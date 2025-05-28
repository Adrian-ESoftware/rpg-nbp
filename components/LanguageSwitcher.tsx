"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(l => l.code === language) || languages[0]

  return (
    <div className="relative">
      {/* Current Language Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-card border border-border rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-between group"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 bg-primary/10">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <h4 className="font-medium text-foreground transition-colors duration-300">
              {currentLanguage.name}
            </h4>
            <p className="text-xs text-muted-foreground transition-colors duration-300">
              {currentLanguage.flag} Idioma da interface
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl z-50 animate-in slide-in-from-top-2 duration-300">
          {languages.map((lang, index) => {
            const isSelected = language === lang.code
            
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`
                  w-full p-3 text-left hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center space-x-3 group relative
                  ${isSelected ? 'bg-primary/10 text-primary' : 'text-popover-foreground'}
                  ${index === 0 ? 'rounded-t-xl' : ''}
                  ${index === languages.length - 1 ? 'rounded-b-xl' : ''}
                  cursor-pointer
                `}
              >
                <div className="p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 bg-muted/20">
                  <span className="text-lg">{lang.flag}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium transition-colors duration-200">
                      {lang.name}
                    </h4>
                    {isSelected && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs opacity-70 transition-opacity duration-200 group-hover:opacity-90">
                    {lang.code.toUpperCase()}
                  </p>
                </div>
                
                {/* Hover indicator */}
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
  )
}
