export default function SongsGridLoading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white/5 rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-square w-full bg-white/10"></div>
                    <div className="p-4 space-y-2">
                        <div className="h-5 bg-white/10 rounded w-3/4"></div>
                        <div className="h-4 bg-white/10 rounded w-1/2"></div>
                        <div className="flex gap-4 mt-2">
                            <div className="h-3 bg-white/10 rounded w-12"></div>
                            <div className="h-3 bg-white/10 rounded w-12"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

