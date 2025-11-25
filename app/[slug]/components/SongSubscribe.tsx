import Link from "next/link";
import Image from "next/image";
import { getSingerByName, formatNumber } from "../lib/utils";
import type { Song } from "@/types";

type SongSubscribeProps = {
    singerName: string;
};

export default async function SongSubscribe({ singerName }: SongSubscribeProps) {
    const songs = await getSingerByName(singerName);

    if (!songs || songs.length === 0) {
        return (
            <div className="mt-12 pt-12 border-t border-white/10">
                {/* Section Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="w-1 h-8 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                        More Songs
                    </h2>
                    <p className="text-white/60 text-lg">
                        Discover more tracks from this artist
                    </p>
                </div>

                {/* Empty State */}
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg mb-6">
                        <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No more songs available</h3>
                    <p className="text-white/60">We couldn&apos;t find additional tracks from this artist at the moment.</p>
                </div>
            </div>
        );
    }

    // Extract singer info from first song
    const firstSong = songs[0];
    const singerNameDisplay = firstSong.name_singer;

    return (
        <div className="mt-12 pt-12 border-t border-white/10">
            {/* Section Header - Similar to music/page.tsx */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="w-1 h-8 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                    More Songs by {singerNameDisplay}
                </h2>
                <p className="text-white/60 text-lg">
                    Discover more tracks from this artist
                </p>
            </div>

            {/* Songs Grid - Same style as music/page.tsx */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {songs.map((song: Song) => (
                    <Link
                        key={song._id}
                        href={`/${song.slug_name_music}`}
                        className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer block"
                    >
                        {/* Album Art */}
                        <div className="relative aspect-square w-full mb-4 rounded-lg overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30">
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

                            {/* Time Badge */}
                            {song.time_format && (
                                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {song.time_format}
                                </div>
                            )}

                            {/* Play Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Song Info */}
                        <div className="mb-4">
                            <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-purple-300 transition-colors">
                                {song.name_music}
                            </h3>
                            <p className="text-white/70 text-sm mb-2 truncate">
                                {song.name_singer}
                            </p>
                            {song.category && (
                                <span className="inline-block text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                                    {song.category}
                                </span>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-xs text-white/60">
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{formatNumber(song.view)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                                <span>{formatNumber(song.favorite)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{formatNumber(song.sum_comment)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {song.src_music && (
                                <p className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    Play
                                </p>
                            )}
                            {song.link_mv && (
                                <p className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center border border-white/20 hover:border-white/40">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                    </svg>
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
