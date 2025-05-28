import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure proper handling of dynamic imports for message files
    optimizePackageImports: ['next-intl']
  }
}

export default withNextIntl(nextConfig)
