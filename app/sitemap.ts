import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nextjs-music.vercel.app'

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/trending`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/streaming`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/music`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
    ]

    // Dynamic routes - fetch trending songs
    let dynamicRoutes: MetadataRoute.Sitemap = []

    try {
        const response = await fetch(
            'https://api-kaito-music.vercel.app/api/music/trending?_limit=100',
            {
                next: { revalidate: 3600 }, // Revalidate every hour
            }
        )

        if (response.ok) {
            const data = await response.json()
            const songs = data.data || []

            dynamicRoutes = songs.map((song: { slug_name_music: string }) => ({
                url: `${baseUrl}/${song.slug_name_music}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
        }
    } catch (error) {
        // Silently fail - return static routes only
        console.error('Error fetching songs for sitemap:', error)
    }

    return [...staticRoutes, ...dynamicRoutes]
}

