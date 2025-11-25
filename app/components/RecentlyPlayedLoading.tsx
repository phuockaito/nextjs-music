export default function RecentlyPlayedLoading() {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="shrink-0 w-64 bg-white/5 rounded-xl overflow-hidden animate-pulse">
                        <div className="aspect-square w-full bg-white/10"></div>
                        <div className="p-4 space-y-2">
                            <div className="h-5 bg-white/10 rounded w-3/4"></div>
                            <div className="h-4 bg-white/10 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

