export default function TopChartsLoading() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
            <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 animate-pulse">
                        <div className="w-12 h-5 bg-white/10 rounded shrink-0"></div>
                        <div className="w-12 h-12 bg-white/10 rounded-lg shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-white/10 rounded w-1/3"></div>
                            <div className="h-3 bg-white/10 rounded w-1/4"></div>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                            <div className="w-16 h-4 bg-white/10 rounded"></div>
                            <div className="w-12 h-4 bg-white/10 rounded"></div>
                            <div className="w-5 h-5 bg-white/10 rounded"></div>
                            <div className="w-5 h-5 bg-white/10 rounded"></div>
                            <div className="w-5 h-5 bg-white/10 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

