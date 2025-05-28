import React from "react"
import { useTranslations } from 'next-intl'

const WelcomeBanner: React.FC = () => {
  const t = useTranslations('dashboard')

  return (
    <div className="
      p-8 rounded-xl 
      bg-card bg-opacity-80 
      border border-border 
      shadow-2xl backdrop-blur-sm 
      h-full
    ">
      <h1 className="text-4xl font-bold text-primary mb-3 font-serif select-none">
        {t('welcomeMessage', { name: 'Gabriel' })}
      </h1>
      <p className="text-lg text-foreground/80">
        {t('welcomeDescription')}
      </p>
    </div>
  )
}

export default WelcomeBanner