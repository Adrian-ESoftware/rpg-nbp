import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from '@/contexts/LanguageContext'
import "../styles/globals.css"

export const metadata: Metadata = {
  title: 'RPG App',
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
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}