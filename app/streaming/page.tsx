import type { Metadata } from "next";
import { Suspense } from "react";
import { getNewMusic } from "@/lib/api";
import type { Song } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import PlayButton from "../components/PlayButton";
import SongsGridLoading from "../components/SongsGridLoading";
import SearchBar from "../components/SearchBar";

export const metadata: Metadata = {
    title: "New Music Streaming | Music Hub",
    description: "Stream the latest new music releases. Discover fresh tracks and new artists before everyone else.",
    openGraph: {
        title: "New Music Streaming | Music Hub",
        description: "Stream the latest new music releases. Discover fresh tracks and new artists.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "New Music Streaming | Music Hub",
        description: "Stream the latest new music releases.",
    },
};

async function StreamingSongs() {
    "use cache";
    const response = await getNewMusic({ _limit: 20 });
    const songs = response.data || [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {songs.map((song: Song) => (
                <Link
                    key={song._id}
                    href={`/${song.slug_name_music}`}
                    className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                    <div className="relative aspect-square w-full overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30">
                        {song.image_music ? (
                            <Image
                                src={song.image_music}
                                alt={song.name_music}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                </svg>
                            </div>
                        )}
                        {song.time_format && (
                            <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                {song.time_format}
                            </span>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <PlayButton song={song} />
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-purple-300 transition-colors">
                            {song.name_music}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2 truncate">{song.name_singer}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                {formatNumber(song.view)}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                {formatNumber(song.favorite)}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function StreamingPage() {
    return (
        <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Streaming</h1>
                <div className="w-full sm:w-auto flex-1 sm:flex-initial max-w-md">
                    <SearchBar />
                </div>
            </div>

            <Suspense fallback={<SongsGridLoading />}>
                <StreamingSongs />
            </Suspense>
        </div>
    );
}

