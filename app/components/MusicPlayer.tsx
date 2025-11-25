"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { Song } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MusicPlayerContextType = {
    currentSong: Song | null;
    isPlaying: boolean;
    playSong: (song: Song) => void;
    pauseSong: () => void;
    resumeSong: () => void;
    togglePlayPause: () => void;
    nextSong: () => void;
    prevSong: () => void;
    isShuffled: boolean;
    toggleShuffle: () => void;
    isRepeated: boolean;
    toggleRepeat: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function useMusicPlayer() {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
    }
    return context;
}

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            audioRef.current = new Audio();

            audioRef.current.addEventListener("timeupdate", () => {
                if (audioRef.current) {
                    setCurrentTime(audioRef.current.currentTime);
                }
            });

            audioRef.current.addEventListener("loadedmetadata", () => {
                if (audioRef.current) {
                    setDuration(audioRef.current.duration);
                }
            });

            audioRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
                setCurrentTime(0);
                if (isRepeated && audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                    setIsPlaying(true);
                }
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isRepeated]);

    const playSong = async (song: Song) => {
        if (!audioRef.current) {
            console.error("Audio ref not available");
            return;
        }

        if (!song.src_music) {
            console.error("Song source not available:", song);
            return;
        }

        try {
            if (currentSong?._id === song._id && isPlaying) {
                pauseSong();
                return;
            }

            if (audioRef.current.src && !audioRef.current.paused) {
                audioRef.current.pause();
            }

            setCurrentSong(song);
            setIsPlaying(false);

            const newSrc = song.src_music;

            if (audioRef.current.src !== newSrc) {
                audioRef.current.src = newSrc;
                audioRef.current.load();
            }

            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                await playPromise;
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Error playing song:", error);
            setIsPlaying(false);
        }
    };

    const pauseSong = () => {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const resumeSong = async () => {
        if (audioRef.current && audioRef.current.paused) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Error resuming song:", error);
                setIsPlaying(false);
            }
        }
    };

    const togglePlayPause = async () => {
        if (isPlaying) {
            pauseSong();
        } else {
            await resumeSong();
        }
    };

    const nextSong = () => {
        // TODO: Implement playlist logic
        console.log("Next song");
    };

    const prevSong = () => {
        // TODO: Implement playlist logic
        console.log("Previous song");
    };

    const toggleShuffle = () => {
        setIsShuffled(!isShuffled);
    };

    const toggleRepeat = () => {
        setIsRepeated(!isRepeated);
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                currentSong,
                isPlaying,
                playSong,
                pauseSong,
                resumeSong,
                togglePlayPause,
                nextSong,
                prevSong,
                isShuffled,
                toggleShuffle,
                isRepeated,
                toggleRepeat,
            }}
        >
            {children}
            {currentSong && (
                <MusicPlayerUI
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    togglePlayPause={togglePlayPause}
                    formatTime={formatTime}
                    audioRef={audioRef}
                    setCurrentTime={setCurrentTime}
                    nextSong={nextSong}
                    prevSong={prevSong}
                    isShuffled={isShuffled}
                    toggleShuffle={toggleShuffle}
                    isRepeated={isRepeated}
                    toggleRepeat={toggleRepeat}
                />
            )}
        </MusicPlayerContext.Provider>
    );
}

function MusicPlayerUI({
    currentSong,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    formatTime,
    audioRef,
    setCurrentTime,
    nextSong,
    prevSong,
    isShuffled,
    toggleShuffle,
    isRepeated,
    toggleRepeat,
}: {
    currentSong: Song;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    togglePlayPause: () => void;
    formatTime: (seconds: number) => string;
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
    setCurrentTime: (time: number) => void;
    nextSong: () => void;
    prevSong: () => void;
    isShuffled: boolean;
    toggleShuffle: () => void;
    isRepeated: boolean;
    toggleRepeat: () => void;
}) {
    return (
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 h-20 sm:h-24 bg-gray-900 border-t border-gray-800 z-50 flex items-center px-3 sm:px-4 lg:px-6">
            {/* Left: Song Info */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 w-32 sm:w-48 lg:w-64">
                {currentSong.image_music ? (
                    <Link href={`/${currentSong.slug_name_music}`} className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                            src={currentSong.image_music}
                            alt={currentSong.name_music}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
                        />
                    </Link>
                ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg bg-linear-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                    </div>
                )}
                <div className="min-w-0 hidden sm:block">
                    <h4 className="text-white font-semibold text-xs sm:text-sm truncate">
                        {currentSong.name_music}
                    </h4>
                    <p className="text-gray-400 text-xs truncate hidden lg:block">
                        {currentSong.name_singer}
                    </p>
                </div>
            </div>

            {/* Center: Controls */}
            <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 lg:px-8">
                {/* Playback Controls */}
                <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
                    <button
                        onClick={prevSong}
                        className="text-gray-400 hover:text-white transition-colors p-1 sm:p-2"
                        aria-label="Previous"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                        </svg>
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="text-white hover:text-white/80 transition-colors p-1 sm:p-2"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={nextSong}
                        className="text-gray-400 hover:text-white transition-colors p-1 sm:p-2"
                        aria-label="Next"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0011 6v2.798l-5.445-3.63z" />
                        </svg>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 sm:gap-3 w-full max-w-2xl">
                    <span className="text-gray-400 text-xs w-8 sm:w-10 text-right hidden sm:block">
                        {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 relative group">
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (audioRef.current) {
                                    audioRef.current.currentTime = value;
                                    setCurrentTime(value);
                                }
                            }}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(currentTime / (duration || 1)) * 100}%, #374151 ${(currentTime / (duration || 1)) * 100}%, #374151 100%)`
                            }}
                        />
                    </div>
                    <span className="text-gray-400 text-xs w-8 sm:w-10 hidden sm:block">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>

            {/* Right: Additional Controls */}
            <div className="flex items-center gap-4 shrink-0">
                <button
                    onClick={toggleShuffle}
                    className={`p-2 transition-colors ${isShuffled ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
                    aria-label="Shuffle"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16a2 2 0 100-4 2 2 0 000 4zM8 6a2 2 0 100-4 2 2 0 000 4zM12 16a2 2 0 100-4 2 2 0 000 4zM12 6a2 2 0 100-4 2 2 0 000 4z" />
                        <path d="M12 6h1.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1M12 6H8m4 0v10m0-10H8m4 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v2M8 16H6a1 1 0 01-1-1V9.586a1 1 0 01.293-.707l3.414-3.414A1 1 0 019.586 5H12" />
                    </svg>
                </button>
                <button
                    onClick={toggleRepeat}
                    className={`p-2 transition-colors ${isRepeated ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
                    aria-label="Repeat"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                </button>
                <button
                    className="text-gray-400 hover:text-white transition-colors p-2"
                    aria-label="Download"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <button
                    className="text-gray-400 hover:text-red-400 transition-colors p-2"
                    aria-label="Like"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export function MusicPlayer() {
    return null; // UI is rendered in MusicPlayerUI
}
