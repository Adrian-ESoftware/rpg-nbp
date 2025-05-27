import React from "react"

const WelcomeBanner: React.FC = () => (
  <div className="p-8 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-yellow-900/30 shadow-2xl backdrop-blur-sm h-full">
    <h1 className="text-4xl font-bold text-emerald-400 mb-3 font-serif">
      Bem-vindo, aventureiro Gabriel!
    </h1>
    <p className="text-lg text-gray-200/80">
      Que sua jornada hoje seja repleta de glória e tesouros. O que deseja fazer?
    </p>
  </div>
)

export default WelcomeBanner
