import type { Song } from "@/types";

const API_BASE_URL = "https://api-kaito-music.vercel.app/api";

export type ApiResponse<T> = {
    data: T;
    pagination?: {
        _limit: number;
        _page: number;
        _total: number;
    };
};

export type ApiParams = {
    _limit?: number;
    _page?: number;
    _type?: "million" | "billion";
    query?: string;
    _name?: string;
    _singer?: string;
};

function buildQueryString(params: ApiParams): string {
    const defaultParams = { _limit: 20, _page: 1 };
    const mergedParams = { ...defaultParams, ...params };
    return new URLSearchParams(
        Object.entries(mergedParams).filter(([, v]) => v !== undefined) as [string, string][]
    ).toString();
}

export async function getTrending(params: ApiParams = {}): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_BASE_URL}/music/trending?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch trending songs");
    }
    return response.json();
}

export async function getFavorite(params: ApiParams = {}): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_BASE_URL}/music/favorite?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch favorite songs");
    }
    return response.json();
}

export async function getNewMusic(params: ApiParams = {}): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_BASE_URL}/music/new-music?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch new music");
    }
    return response.json();
}

export async function getTopViews(params: ApiParams = {}): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_BASE_URL}/music/top-views?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch top views");
    }
    return response.json();
}

export async function getTopFavorite(params: ApiParams = {}): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_BASE_URL}/music/top-favorite?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch top favorite");
    }
    return response.json();
}

export async function search(query: string, params: Omit<ApiParams, 'query'> = {}): Promise<ApiResponse<Song[]>> {
    const searchParams = { ...params, query };
    const queryString = buildQueryString(searchParams);
    const response = await fetch(`${API_BASE_URL}/search?${queryString}`, {
        next: { revalidate: 60 }
    });
    if (!response.ok) {
        throw new Error("Failed to search");
    }
    return response.json();
}

export async function getMusicByName(_name: string): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString({ _name });
    const response = await fetch(`${API_BASE_URL}/music/get-music-name?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch music by name");
    }
    return response.json();
}

export async function getSingerByName(_singer: string): Promise<ApiResponse<Song[]>> {
    const queryString = buildQueryString({ _singer });
    const response = await fetch(`${API_BASE_URL}/music/get-singer-name?${queryString}`);
    if (!response.ok) {
        throw new Error("Failed to fetch singer songs");
    }
    return response.json();
}
