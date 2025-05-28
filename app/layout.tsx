import type { Metadata } from 'next'
import { ThemeProvider } from "next-themes"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: 'RPG App',
  description: 'Sistema de RPG',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          themes={["light", "dark", "rpg", "fantasy", "emerald", "crimson"]}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}