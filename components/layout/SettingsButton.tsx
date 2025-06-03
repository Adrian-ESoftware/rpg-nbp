"use client"

import { useState } from "react"
import { Settings2 } from "lucide-react"
import ThemeSwitcher from "../ThemeSwitcher"
import LanguageSwitcher from "../LanguageSwitcher"

export default function SettingsButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
    <button
      className="fixed bottom-6 right-6 z-50 bg-transparent border-2 border-primary p-4 rounded-full shadow-lg hover:bg-primary/10 transition-all flex items-center justify-center"
      onClick={() => setOpen(true)}
      aria-label="Open settings"
    >
      <Settings2 className="w-6 h-6 text-primary" />
    </button>

      {/* Overlay and Panel */}
      {open && (
        <>
                  <div
                    className="fixed bg-black/50 inset-0 z-50 animate-fade-in"
                    onClick={() => setOpen(false)}
                  />
                  {/* Centered Panel */}
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="w-80 max-w-[90vw] bg-popover border border-border rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Configurações</h3>
                        <button
                          className="p-1 rounded hover:bg-accent transition"
                          onClick={() => setOpen(false)}
                          aria-label="Fechar"
                        >
                          <span className="text-2xl leading-none">&times;</span>
                        </button>
                      </div>
                      <div className="space-y-4">
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </div>
        </>
      )}
    </>
  )
}