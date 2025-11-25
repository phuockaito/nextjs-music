import Image from "next/image";
import type { Song } from "@/types";

export default function SongAlbumArt({ song }: { song: Song }) {
    return (
        <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30 shadow-2xl">
                {song.image_music ? (
                    <Image
                        src={song.image_music}
                        alt={song.name_music}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-32 h-32 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}

