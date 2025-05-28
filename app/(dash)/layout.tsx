import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from '@/contexts/LanguageContext'
import "../../styles/globals.css"
import LayoutSidebar from '@/components/layout/Sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: 'RPG Dash',
  description: 'Sistema de RPG',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              themes={["light", "dark", "rpg", "fantasy", "emerald", "crimson"]}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              <SidebarProvider>
                <LayoutSidebar />
                <SidebarInset>
                  <div className="sticky top-0 z-20 bg-background border-b border-border p-4 flex items-center justify-between">
                    {/* SidebarTrigger agora é arredondado */}
                    <SidebarTrigger
                    className="p-2 bg-card rounded-full text-foreground hover:text-primary cursor-pointer border border-transparent hover:border-primary transition-colors duration-200"
                    />
                    {/* Usuário */}
                    <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right">
                      <span className="font-semibold text-base">Adrian</span>
                      <span className="text-xs text-muted-foreground">Dungeon Master</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg select-none">
                      A
                    </div>
                    </div>
                  </div>
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}