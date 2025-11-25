export default function SongSubscribeLoading() {
    return (
        <div className="mt-12 pt-12 border-t border-white/10">
            {/* Section Header Skeleton */}
            <div className="mb-8">
                <div className="h-8 bg-white/10 rounded-lg animate-pulse w-64 mb-2"></div>
                <div className="h-5 bg-white/10 rounded-lg animate-pulse w-96"></div>
            </div>

            {/* Songs Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 animate-pulse">
                        {/* Album Art Skeleton */}
                        <div className="aspect-square w-full mb-4 rounded-lg bg-white/20"></div>

                        {/* Song Info Skeleton */}
                        <div className="mb-4">
                            <div className="h-5 bg-white/20 rounded mb-2"></div>
                            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-white/20 rounded w-1/3"></div>
                        </div>

                        {/* Stats Skeleton */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-3 bg-white/20 rounded w-12"></div>
                            <div className="h-3 bg-white/20 rounded w-12"></div>
                            <div className="h-3 bg-white/20 rounded w-12"></div>
                        </div>

                        {/* Button Skeleton */}
                        <div className="h-10 bg-white/20 rounded-lg"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

