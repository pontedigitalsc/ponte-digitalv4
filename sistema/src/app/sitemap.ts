import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pontedigital.com.br'
  return [
    { url: appUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${appUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${appUrl}/conversa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
