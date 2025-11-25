import type { Song } from "@/types";
import { formatNumber } from "../lib/utils";

export default function SongStats({ song }: { song: Song }) {
    return (
        <div className="flex flex-wrap gap-8 text-white/80">
            <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <div>
                    <div className="text-white text-base font-semibold">{formatNumber(song.view)}</div>
                    <div className="text-white/60 text-xs">Views</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <div>
                    <div className="text-white text-base font-semibold">{formatNumber(song.favorite)}</div>
                    <div className="text-white/60 text-xs">Favorites</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <div>
                    <div className="text-white text-base font-semibold">{formatNumber(song.sum_comment)}</div>
                    <div className="text-white/60 text-xs">Comments</div>
                </div>
            </div>
            {song.time_format && (
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <div className="text-white text-base font-semibold">{song.time_format}</div>
                        <div className="text-white/60 text-xs">Duration</div>
                    </div>
                </div>
            )}
        </div>
    );
}

