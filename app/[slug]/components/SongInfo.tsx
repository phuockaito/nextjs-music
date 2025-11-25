import SongAlbumArt from "./SongAlbumArt";
import SongStats from "./SongStats";
import SongActions from "./SongActions";
import SongSubscribe from "./SongSubscribe";
import SongSubscribeLoading from "./SongSubscribeLoading";
import SongComments from "./SongComments";
import SongCommentsLoading from "./SongCommentsLoading";
import { generateStructuredData } from "../lib/structured-data";
import SongNotFound from "./SongNotFound";
import { getSongBySlug } from "../lib/utils";
import { Suspense } from "react";

export default async function SongInfo({ slug }: { slug: string }) {
    const song = await getSongBySlug(slug);

    if (!song) {
        return <SongNotFound />;
    }

    const structuredData = generateStructuredData(song);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <SongAlbumArt song={song} />

                    <div className="flex flex-col justify-center space-y-6">
                        {/* Category Badge */}
                        {song.category && (
                            <div>
                                <span className="inline-block text-sm text-purple-300 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                                    {song.category}
                                </span>
                            </div>
                        )}

                        {/* Song Title */}
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                {song.name_music}
                            </h1>
                            <p className="text-2xl sm:text-3xl text-white/70">
                                {song.name_singer}
                            </p>
                        </div>

                        <SongStats song={song} />
                        <SongActions song={song} />

                        {/* Additional Info */}
                        <div className="pt-6 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                                <div>
                                    <span className="text-white/40">Category:</span>
                                    <p className="text-white/80 font-medium">{song.category || "N/A"}</p>
                                </div>
                                <div>
                                    <span className="text-white/40">Duration:</span>
                                    <p className="text-white/80 font-medium">{song.time_format || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Suspense fallback={<SongCommentsLoading />}>
                    <SongComments musicId={song._id} />
                </Suspense>

                <Suspense fallback={<SongSubscribeLoading />}>
                    <SongSubscribe singerName={song.slug_name_singer} />
                </Suspense>

            </main>
        </>
    );
}

