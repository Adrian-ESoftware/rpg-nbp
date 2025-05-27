import React from "react"

const WelcomeBanner: React.FC = () => (
  <div className="
    p-8 rounded-xl 
    bg-card bg-opacity-80 
    border border-border 
    shadow-2xl backdrop-blur-sm 
    h-full
  ">
    <h1 className="text-4xl font-bold text-primary mb-3 font-serif select-none">
      Bem-vindo, aventureiro Gabriel!
    </h1>
    <p className="text-lg text-foreground/80">
      Que sua jornada hoje seja repleta de glória e tesouros. O que deseja fazer?
    </p>
  </div>
)

export default WelcomeBanner