import React from "react"
import { useTranslations } from 'next-intl'
import { DoorOpen } from "lucide-react"

interface JoinRoomPanelProps {
  roomCode: string
  setRoomCode: React.Dispatch<React.SetStateAction<string>>
}

const JoinRoomPanel: React.FC<JoinRoomPanelProps> = ({ roomCode, setRoomCode }) => {
  const t = useTranslations('dashboard')

  return (
    <div className="
      bg-card/60 backdrop-blur-lg
      border border-border/40
      rounded-2xl p-6
      shadow-2xl hover:shadow-3xl
      h-full flex flex-col justify-center
      transition-all duration-300
      transform hover:scale-[1.01]
      bg-gradient-to-br from-card/70 via-card/50 to-card/30
    ">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2.5 bg-primary/20 backdrop-blur-sm rounded-xl border border-primary/30">
          <DoorOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-card-foreground font-serif select-none">
          {t('joinRoom')}
        </h2>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder={t('joinRoomPlaceholder')}
          className="
            w-full px-4 py-3 text-base
            bg-background/60 backdrop-blur-sm
            border border-border/50
            rounded-xl
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:bg-background/80
            transition-all duration-300
            shadow-lg hover:shadow-xl
          "
        />
        <button className="
          w-full px-6 py-3 text-base font-semibold
          bg-gradient-to-r from-primary/80 to-accent/80
          hover:from-primary hover:to-accent
          text-primary-foreground
          rounded-xl
          transition-all duration-300
          shadow-xl hover:shadow-2xl
          select-none
          transform hover:scale-105 hover:-translate-y-1
          backdrop-blur-sm border border-primary/30
        ">
          {t('enter')}
        </button>
      </div>
    </div>
  )
}

export default JoinRoomPanel