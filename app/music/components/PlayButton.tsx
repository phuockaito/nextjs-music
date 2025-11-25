"use client";

import { useMusicPlayer } from "@/app/components/MusicPlayer";
import type { Song } from "@/types";

export default function PlayButton({ song }: { song: Song }) {
    const { playSong, isPlaying, currentSong, togglePlayPause } = useMusicPlayer();
    const isCurrentSong = currentSong?._id === song._id;

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCurrentSong && isPlaying) {
            togglePlayPause();
        } else {
            playSong(song);
        }
    };

    if (!song.src_music) return null;

    return (
        <button
            onClick={handlePlayClick}
            className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/50"
        >
            {isCurrentSong && isPlaying ? (
                <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pause
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Play
                </>
            )}
        </button>
    );
}

