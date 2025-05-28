import React from "react"
import { useTranslations } from 'next-intl'

interface JoinRoomPanelProps {
  roomCode: string
  setRoomCode: React.Dispatch<React.SetStateAction<string>>
}

const JoinRoomPanel: React.FC<JoinRoomPanelProps> = ({ roomCode, setRoomCode }) => {
  const t = useTranslations('dashboard')

  return (
    <div className="
      bg-background bg-opacity-80
      border border-border
      rounded-xl p-6
      shadow-2xl backdrop-blur-sm
      h-full flex flex-col justify-center
    ">
      <h2 className="text-xl font-bold text-primary mb-4 font-serif select-none">
        {t('joinRoom')}
      </h2>
      <div className="space-y-3">
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder={t('joinRoomPlaceholder')}
          className="
            w-full px-4 py-2
            bg-card bg-opacity-50
            border border-border
            rounded
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
            transition-colors duration-200
          "
        />
        <button className="
          w-full px-6 py-2
          bg-primary
          hover:bg-primary/90
          text-primary-foreground
          rounded
          transition-all duration-200
          font-semibold
          shadow-lg
          select-none
        ">
          {t('enter')}
        </button>
      </div>
    </div>
  )
}

export default JoinRoomPanel