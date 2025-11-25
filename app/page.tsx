import type { Metadata } from "next";
import { Suspense } from "react";
import RecentlyPlayed from "./components/RecentlyPlayed";
import TopCharts from "./components/TopCharts";
import RecentlyPlayedLoading from "./components/RecentlyPlayedLoading";
import TopChartsLoading from "./components/TopChartsLoading";
import SearchBar from "./components/SearchBar";

export const metadata: Metadata = {
    title: "Discover Music | Music Hub",
    description: "Discover trending songs, explore top charts, and find your favorite music. Listen to the latest hits and create your perfect playlist.",
    openGraph: {
        title: "Discover Music | Music Hub",
        description: "Discover trending songs, explore top charts, and find your favorite music.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Discover Music | Music Hub",
        description: "Discover trending songs, explore top charts, and find your favorite music.",
    },
};

export default function DiscoverPage() {
    return (
        <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Discover</h1>
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto flex-1 sm:flex-initial justify-end">
                    <div className="hidden sm:block flex-1 max-w-md">
                        <SearchBar />
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.05 4.05a7 7 0 119.9 9.9L10 18.9l-2.95-2.95a7 7 0 01-4.05-11.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors relative hidden sm:block">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                        <span className="text-white text-xs sm:text-sm font-semibold">U</span>
                    </div>
                </div>
            </div>

            {/* Recently Played */}
            <Suspense fallback={<RecentlyPlayedLoading />}>
                <RecentlyPlayed />
            </Suspense>

            {/* Top Charts */}
            <Suspense fallback={<TopChartsLoading />}>
                <TopCharts />
            </Suspense>
        </div>
    );
}
