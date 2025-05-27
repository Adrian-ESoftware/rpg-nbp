import React from "react"

interface JoinRoomPanelProps {
  roomCode: string
  setRoomCode: React.Dispatch<React.SetStateAction<string>>
}

const JoinRoomPanel: React.FC<JoinRoomPanelProps> = ({ roomCode, setRoomCode }) => (
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
)

export default JoinRoomPanel
