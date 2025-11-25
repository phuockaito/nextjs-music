"use client";

import { useState } from "react";
import type { Song } from "@/types";
import { useMusicPlayer } from "@/app/components/MusicPlayer";

// Function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

export default function SongActions({ song }: { song: Song }) {
    const { playSong, isPlaying, currentSong, togglePlayPause } = useMusicPlayer();
    const isCurrentSong = currentSong?._id === song._id;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoId = song.link_mv ? getYouTubeVideoId(song.link_mv) : null;

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isCurrentSong && isPlaying) {
            togglePlayPause();
        } else {
            playSong(song);
        }
    };

    const handleWatchMVClick = () => {
        if (videoId) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="w-full pt-4 flex flex-col gap-4">
                <div className="flex gap-4 flex-wrap w-full">
                    {song.src_music && (
                        <button
                            onClick={handlePlayClick}
                            className="flex-1 min-w-[200px] bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 h-14"
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
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Play Song
                                </>
                            )}
                        </button>
                    )}
                    {song.link_mv && videoId && (
                        <button
                            onClick={handleWatchMVClick}
                            className="flex-1 min-w-[200px] bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 h-14"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                            Watch MV
                        </button>
                    )}
                </div>
            </div>

            {/* YouTube Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeModal}>
                    <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 text-white hover:text-white/80 transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                title={`${song.name_music} - ${song.name_singer}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                        <div className="p-6 bg-black/80">
                            <h4 className="text-white text-xl font-semibold mb-2">
                                {song.name_music}
                            </h4>
                            <p className="text-white/70">{song.name_singer}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

