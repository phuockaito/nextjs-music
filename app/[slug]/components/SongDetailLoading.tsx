export default function SongDetailLoading() {
    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Album Art Skeleton */}
                <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg animate-pulse">
                        <div className="w-full h-full bg-linear-to-br from-purple-500/20 to-pink-500/20"></div>
                    </div>
                </div>

                {/* Song Info Skeleton */}
                <div className="flex flex-col justify-center space-y-6">
                    {/* Category Badge Skeleton */}
                    <div className="w-24 h-8 bg-white/10 rounded-full animate-pulse"></div>

                    {/* Title Skeleton */}
                    <div className="space-y-4">
                        <div className="h-16 bg-white/10 rounded-lg animate-pulse w-full"></div>
                        <div className="h-12 bg-white/10 rounded-lg animate-pulse w-3/4"></div>
                    </div>

                    {/* Stats Skeleton */}
                    <div className="flex flex-wrap items-center gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-white/10 rounded animate-pulse"></div>
                                <div className="w-16 h-5 bg-white/10 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <div className="flex-1 h-14 bg-white/10 rounded-xl animate-pulse"></div>
                        <div className="flex-1 h-14 bg-white/10 rounded-xl animate-pulse"></div>
                    </div>

                    {/* Additional Info Skeleton */}
                    <div className="pt-6 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="w-20 h-4 bg-white/10 rounded animate-pulse"></div>
                                <div className="w-24 h-5 bg-white/10 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-20 h-4 bg-white/10 rounded animate-pulse"></div>
                                <div className="w-16 h-5 bg-white/10 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

