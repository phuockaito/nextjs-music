import type { Metadata } from "next";
import type { Song } from "@/types";
import { Suspense } from "react";
import SongHeader from "./components/SongHeader";
import SongDetailLoading from "./components/SongDetailLoading";
import SongInfo from "./components/SongInfo";
import { getSongBySlug } from "./lib/utils";
import { generateSongMetadata } from "./lib/metadata";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const song = await getSongBySlug(slug);

    if (!song) {
        return {
            title: "Song Not Found | Music Hub",
            description: "The song you're looking for doesn't exist.",
        };
    }

    return generateSongMetadata(song, slug);
}

export default async function SongDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900">
            <SongHeader />
            <Suspense fallback={<SongDetailLoading />}>
                <SongInfo slug={slug} />
            </Suspense>
        </div>
    );
}

export async function generateStaticParams() {
    const response = await fetch("https://api-kaito-music.vercel.app/api/music/trending?_limit=30");
    const { data } = await response.json();
    const songs = data.map((song: Song) => ({
        slug: song.slug_name_music,
    }));
    return songs;
}

