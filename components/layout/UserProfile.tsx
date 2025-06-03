'use client'

import { useRouter } from 'next/navigation'

export default function UserProfile() {
  const router = useRouter()

  const handleProfileClick = () => {
    router.push('/dash/profile')
  }

  return (
    <div 
      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
      onClick={handleProfileClick}
    >
      <div className="flex flex-col text-right">
        <span className="font-semibold text-base">Adrian</span>
        <span className="text-xs text-muted-foreground">Dungeon Master</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg select-none hover:scale-105 transition-transform duration-200">
        A
      </div>
    </div>
  )
}
