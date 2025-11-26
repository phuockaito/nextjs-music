import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nextjs-music.vercel.app'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/_next/',
                    '/search?*', // Search pages are dynamic, can be disallowed if needed
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}

