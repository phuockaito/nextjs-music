"use cache";

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

