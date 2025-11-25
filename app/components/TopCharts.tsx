import Link from "next/link";
import Image from "next/image";
import { getTopViews } from "@/lib/api";
import type { Song } from "@/types";
import { formatNumber } from "@/lib/utils";
import PlayButton from "./PlayButton";

function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default async function TopCharts() {
    const response = await getTopViews({ _limit: 100, _type: "million" });
    const songs = response.data || [];

    return (
        <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">TOP 100 BILLBOARD</h2>
            </div>
            <div className="space-y-2">
                {songs.map((song: Song, index: number) => (
                    <div
                        key={song._id}
                        className="group flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <div className="w-8 sm:w-12 text-gray-400 text-xs sm:text-sm font-semibold shrink-0">
                            #{index + 1}
                        </div>
                        <Link href={`/${song.slug_name_music}`} className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30 shrink-0">
                                {song.image_music ? (
                                    <Image
                                        src={song.image_music}
                                        alt={song.name_music}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium text-xs sm:text-sm truncate group-hover:text-purple-300 transition-colors">
                                    {song.name_music}
                                </h3>
                                <p className="text-gray-400 text-xs truncate">{song.name_singer}</p>
                            </div>
                        </Link>
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
                            <div className="hidden sm:flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                </svg>
                                <span className="hidden lg:inline">{formatNumber(song.view)}</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span>{song.time_format || formatDuration(song.seconds || 0)}</span>
                            </div>
                            <button className="hidden lg:block text-gray-400 hover:text-red-400 transition-colors p-1">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="w-6 sm:w-8 flex justify-center">
                                <PlayButton song={song} />
                            </div>
                            <button className="hidden lg:block text-gray-400 hover:text-white transition-colors p-1">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

