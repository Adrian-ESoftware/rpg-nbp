import { getRequestConfig } from 'next-intl/server'
import { headers, cookies } from 'next/headers'

export default getRequestConfig(async () => {
  // Try to get locale from cookie first (user preference)
  const cookieStore = await cookies()
  const savedLocale = cookieStore.get('preferred-language')?.value
  
  // If no saved preference, get from headers
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  
  // Determine locale with priority: saved preference > browser language > default
  let locale = 'pt'
  
  if (savedLocale && ['pt', 'en', 'es'].includes(savedLocale)) {
    locale = savedLocale
  } else if (acceptLanguage?.includes('en')) {
    locale = 'en'
  } else if (acceptLanguage?.includes('es')) {
    locale = 'es'
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
