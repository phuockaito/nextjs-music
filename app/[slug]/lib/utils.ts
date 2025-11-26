import type { Song, CommentsResponse } from "@/types";

export async function getSongBySlug(slug: string): Promise<Song | null> {
    "use cache";
    const response = await fetch(`https://api-kaito-music.vercel.app/api/music/get-music-name?_name=${slug}`);

    if (!response.ok) {
        return null;
    }

    const { data } = await response.json();
    return data;
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// // music/get-singer-name?_singer=""
export async function getSingerByName(singer: string): Promise<Song[]> {
    const response = await fetch(`https://api-kaito-music.vercel.app/api/music/get-singer-name?_singer=${singer}`);
    if (!response.ok) {
        return [];
    }
    const { data } = await response.json();
    return data;
}

export async function getCommentsByMusicId(
    musicId: string,
    limit: number = 10,
    page: number = 1
): Promise<CommentsResponse> {
    const response = await fetch(
        `https://api-kaito-music.vercel.app/api/comment/get-by-id-music?_id=${musicId}&_limit=${limit}&_page=${page}`
    );

    if (!response.ok) {
        return {
            pagination: {
                _limit: limit,
                _page: page,
                _total: 0,
            },
            data: [],
        };
    }

    return await response.json();
}