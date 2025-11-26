import Link from "next/link";
import SongCard from "./components/SongCard";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Music Library | Trending Songs | Music Hub",
    description: "Discover trending songs and explore the most popular tracks right now. Browse our curated collection of music from top artists.",
    keywords: [
        "music",
        "songs",
        "trending",
        "popular music",
        "music library",
        "audio",
        "playlist",
        "artists",
        "listen",
        "discover music",
    ],
    openGraph: {
        title: "Music Library | Trending Songs | Music Hub",
        description: "Discover trending songs and explore the most popular tracks right now. Browse our curated collection of music from top artists.",
        type: "website",
        url: "https://nextjs-music.vercel.app/music",
        siteName: "Music Hub",
        locale: "en_US",
        images: [
            {
                url: "https://nextjs-music.vercel.app/og-music.png", // Update with your actual OG image
                width: 1200,
                height: 630,
                alt: "Music Hub - Trending Songs",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Music Library | Trending Songs | Music Hub",
        description: "Discover trending songs and explore the most popular tracks right now.",
        images: ["https://nextjs-music.vercel.app/og-music.png"], // Update with your actual OG image
    },
    alternates: {
        canonical: "https://nextjs-music.vercel.app/music",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function MusicLibrary() {

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur-md bg-black/20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                        >
                            <svg
                                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                            <h1 className="text-2xl font-bold text-white">Music Library</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Music Library - Trending Songs",
                        description: "Discover trending songs and explore the most popular tracks right now",
                        url: "https://nextjs-music.vercel.app/music",
                        mainEntity: {
                            "@type": "ItemList",
                            name: "Trending Songs",
                            description: "A collection of trending and popular music tracks",
                        },
                    }),
                }}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="w-1 h-8 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                        Trending Songs
                    </h2>
                    <p className="text-white/60 text-lg">Discover the most popular tracks right now</p>
                </div>

                <Suspense fallback={
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 animate-pulse">
                                <div className="aspect-square w-full mb-4 rounded-lg bg-white/20"></div>
                                <div className="h-4 bg-white/20 rounded mb-2"></div>
                                <div className="h-3 bg-white/20 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                }>
                    <SongCard />
                </Suspense>
            </main>
        </div>
    )
}