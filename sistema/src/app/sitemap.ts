import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pontedigital.com.br'
  return [
    { url: appUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${appUrl}/conversa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${appUrl}/fundador`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${appUrl}/solicitar-founder`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${appUrl}/tornar-se-fundador`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${appUrl}/criar-conta`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${appUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${appUrl}/reset-password`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ]
}
