import Link from "next/link";
import Image from "next/image";
import { getTrending } from "@/lib/api";
import type { Song } from "@/types";

export default async function RecentlyPlayed() {
    const response = await getTrending({ _limit: 4 });
    const songs = response.data || [];

    return (
        <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">RECENTLY PLAYED</h2>
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {songs.map((song: Song) => (
                    <Link
                        key={song._id}
                        href={`/${song.slug_name_music}`}
                        className="group shrink-0 w-48 sm:w-56 lg:w-64 bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    >
                        <div className="relative aspect-square w-full overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30">
                            {song.image_music ? (
                                <Image
                                    src={song.image_music}
                                    alt={song.name_music}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    sizes="256px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-16 h-16 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-purple-300 transition-colors">
                                {song.name_music}
                            </h3>
                            <p className="text-gray-400 text-sm truncate">{song.name_singer}</p>
                        </div>
                    </Link>
                ))}
                <Link
                    href="/music"
                    className="shrink-0 w-48 sm:w-56 lg:w-64 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 group"
                >
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">View all</h3>
                    <p className="text-gray-400 text-sm">43 Music Tracks</p>
                    <svg className="w-5 h-5 text-purple-400 mt-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

