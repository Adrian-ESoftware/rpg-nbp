import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "next-themes"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"


export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <ThemeProvider
          attribute="class"
          themes={["light", "dark", "rpg", "fantasy"]}
          defaultTheme="system"
          enableSystem
        >
          {/* Adicione o ThemeSwitcher em posição fixa */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeSwitcher />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}