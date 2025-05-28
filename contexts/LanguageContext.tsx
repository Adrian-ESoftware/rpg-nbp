"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'pt' | 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  languages: { code: Language; name: string; flag: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const languages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
]

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt')

  useEffect(() => {
    // Load language from localStorage or cookie
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && languages.some(l => l.code === savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
    
    // Set cookie for server-side locale detection
    document.cookie = `preferred-language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year
    
    // Force reload to apply new locale
    window.location.reload()
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
