export default function SongCommentsLoading() {
    return (
        <div className="mt-12 pt-12 border-t border-white/10">
            {/* Section Header Skeleton */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-2"></div>
                <div className="h-5 w-36 bg-white/10 rounded-lg animate-pulse"></div>
            </div>

            {/* Comments Skeleton */}
            <div className="flex flex-col gap-4 w-full">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

