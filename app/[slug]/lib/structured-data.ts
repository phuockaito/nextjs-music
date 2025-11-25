import type { Song } from "@/types";

export function generateStructuredData(song: Song) {
    return {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        name: song.name_music,
        byArtist: {
            "@type": "MusicGroup",
            name: song.name_singer,
        },
        duration: song.time_format || `PT${song.seconds}S`,
        image: song.image_music,
        genre: song.category,
        aggregateRating: song.favorite > 0
            ? {
                  "@type": "AggregateRating",
                  ratingValue: "4.5",
                  ratingCount: song.favorite.toString(),
              }
            : undefined,
        interactionStatistic: [
            {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/ListenAction",
                userInteractionCount: song.view,
            },
            {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/CommentAction",
                userInteractionCount: song.sum_comment,
            },
        ],
    };
}

