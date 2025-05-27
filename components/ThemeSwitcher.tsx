"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const themes = [
  { name: "default", label: "Padrão" },
  { name: "dark", label: "Escuro" },
  { name: "theme-rpg", label: "RPG" },
  { name: "theme-fantasy", label: "Fantasy" }
]

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("default")

  useEffect(() => {
    // Remove todas as classes de tema
    document.documentElement.classList.remove("dark", "theme-rpg", "theme-fantasy")
    
    // Adiciona a classe do tema atual (exceto para o tema padrão)
    if (currentTheme !== "default") {
      document.documentElement.classList.add(currentTheme)
    }
  }, [currentTheme])

  return (
    <div className="flex gap-2">
      {themes.map((theme) => (
        <Button
          key={theme.name}
          variant={currentTheme === theme.name ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentTheme(theme.name)}
        >
          {theme.label}
        </Button>
      ))}
    </div>
  )
}