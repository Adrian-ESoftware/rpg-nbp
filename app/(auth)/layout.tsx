import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from '@/contexts/LanguageContext'
import "../../styles/globals.css"
import SettingsButton from '@/components/layout/SettingsButton'

export const metadata: Metadata = {
  title: 'Auth - Arkadice',
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
              <SettingsButton />
            </ThemeProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}