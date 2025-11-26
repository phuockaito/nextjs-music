import { Song } from "@/types";
import Image from "next/image";
import Link from "next/link";
import PlayButton from "./PlayButton";

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

async function getSongs(): Promise<Song[]> {
    const response = await fetch("https://api-kaito-music.vercel.app/api/music/trending?_limit=32");

    if (!response.ok) {
        return [];
    }

    const { data } = await response.json();
    return data || [];
}

export default async function SongCard() {
    "use cache";
    const songs = await getSongs();
    if (songs.length === 0) {
        return (
            <div className="mt-12 py-16 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No songs found</h3>
                <p className="text-white/60">Unable to load songs at the moment</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {songs.map((song) => (
                <Link key={song._id} href={`/${song.slug_name_music}`} className="block group">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
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
                                <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border-none">
                                    {song.time_format}
                                </span>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-purple-300 transition-colors">
                                {song.name_music}
                            </h3>
                            <p className="text-white/70 text-sm mb-2 truncate">{song.name_singer}</p>
                            {song.category && (
                                <span className="inline-block bg-purple-500/30 text-purple-200 text-xs px-2 py-1 rounded mb-4">
                                    {song.category}
                                </span>
                            )}
                            <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
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
                                <span className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    {formatNumber(song.sum_comment)}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <PlayButton song={song} />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

