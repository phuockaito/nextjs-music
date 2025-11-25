import type { Metadata } from "next";
import type { Song } from "@/types";
import { formatNumber } from "./utils";

export function generateSongMetadata(song: Song, slug: string): Metadata {
    const title = `${song.name_music} - ${song.name_singer} | Music Hub`;
    const description = `Listen to ${song.name_music} by ${song.name_singer}. ${song.category ? `Category: ${song.category}.` : ""} ${song.time_format ? `Duration: ${song.time_format}.` : ""} ${formatNumber(song.view)} views, ${formatNumber(song.favorite)} favorites.`;

    return {
        title,
        description,
        keywords: [
            song.name_music,
            song.name_singer,
            song.category || "",
            "music",
            "song",
            "audio",
            "listen",
            "play",
        ].filter(Boolean),
        authors: [{ name: song.name_singer }],
        openGraph: {
            title,
            description,
            type: "music.song",
            url: `https://your-domain.com/${slug}`,
            siteName: "Music Hub",
            images: song.image_music
                ? [
                      {
                          url: song.image_music,
                          width: 1200,
                          height: 630,
                          alt: `${song.name_music} by ${song.name_singer}`,
                      },
                  ]
                : [],
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: song.image_music ? [song.image_music] : [],
            creator: `@${song.name_singer.replace(/\s+/g, "")}`,
        },
        alternates: {
            canonical: `https://your-domain.com/${slug}`,
        },
        other: {
            "music:duration": song.seconds?.toString() || song.time_format || "",
            "music:musician": song.name_singer,
            "music:album": song.category || "",
        },
    };
}

