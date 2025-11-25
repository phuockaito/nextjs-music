"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { search } from "@/lib/api";
import type { Song } from "@/types";
import PlayButton from "./PlayButton";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const debounceTimer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await search(query.trim(), { _limit: 8 });
                setResults(response.data || []);
                setIsOpen(true);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
            setQuery("");
        }
    };

    return (
        <div ref={searchRef} className="relative w-full sm:flex-1 sm:max-w-md">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0) setIsOpen(true);
                    }}
                    placeholder="Search songs, artists..."
                    className="w-full px-3 sm:px-4 py-2 pl-9 sm:pl-10 text-sm sm:text-base bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-colors"
                />
                <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </form>

            {/* Search Results Dropdown */}
            {isOpen && (results.length > 0 || query.trim().length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl max-h-80 sm:max-h-96 overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-400">Searching...</div>
                    ) : results.length > 0 ? (
                        <>
                            <div className="p-2 border-b border-gray-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">
                                        {results.length} result{results.length !== 1 ? 's' : ''}
                                    </span>
                                    <Link
                                        href={`/search?q=${encodeURIComponent(query.trim())}`}
                                        className="text-sm text-purple-400 hover:text-purple-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        View all
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2">
                                {results.map((song) => (
                                    <Link
                                        key={song._id}
                                        href={`/${song.slug_name_music}`}
                                        onClick={() => {
                                            setIsOpen(false);
                                            setQuery("");
                                        }}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30 shrink-0">
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
                                            <h4 className="text-white font-medium text-sm truncate group-hover:text-purple-300 transition-colors">
                                                {song.name_music}
                                            </h4>
                                            <p className="text-gray-400 text-xs truncate">{song.name_singer}</p>
                                        </div>
                                        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PlayButton song={song} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : query.trim().length > 0 ? (
                        <div className="p-4 text-center text-gray-400">
                            No results found for &quot;{query}&quot;
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

