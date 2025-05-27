"use client"
import { ThemeProvider } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      themes={['light', 'dark', 'rpg', 'fantasy']}
      defaultTheme="dark"
      enableSystem
    >
      {children}
    </ThemeProvider>
  )
}