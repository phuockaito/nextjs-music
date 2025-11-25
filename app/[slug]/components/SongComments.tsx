import { getCommentsByMusicId } from "../lib/utils";
import type { Comment } from "@/types";
import Image from "next/image";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "vừa xong";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} ngày trước`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} tháng trước`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} năm trước`;
}

function CommentItem({ comment }: { comment: Comment }) {
    const avatarSrc = comment.account?.image;
    const userName = comment.account?.user_name || "Anonymous";
    const avatarContent = avatarSrc ? undefined : userName[0].toUpperCase();

    return (
        <div className="border border-white/10 px-4 py-4 bg-white/5 rounded-xl mb-4">
            <div className="flex gap-3">
                <div className="shrink-0">
                    {avatarSrc ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-purple-500/30 to-pink-500/30">
                            <Image
                                src={avatarSrc}
                                alt={userName}
                                fill
                                className="object-cover"
                                sizes="48px"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-white font-semibold">
                            {avatarContent}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{userName}</span>
                        <span className="text-white/40 text-xs">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-white/80">{comment.content}</p>
                </div>
            </div>
            {comment.reply && comment.reply.length > 0 && (
                <div className="ml-12 mt-4 space-y-2">
                    {comment.reply.map((reply) => (
                        <CommentItem key={reply._id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}

type SongCommentsProps = {
    musicId: string;
};

export default async function SongComments({ musicId }: SongCommentsProps) {
    const commentsData = await getCommentsByMusicId(musicId, 10, 1);
    const comments = commentsData.data || [];

    if (comments.length === 0) {
        return (
            <div className="mt-12 pt-12 border-t border-white/10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="w-1 h-8 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                        Comments
                    </h2>
                    <p className="text-white/60 text-lg">
                        Share your thoughts about this song
                    </p>
                </div>
                <div className="py-16 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">No comments yet</h3>
                    <p className="text-white/60">Be the first to comment on this song!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 pt-12 border-t border-white/10">
            {/* Section Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="w-1 h-8 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                    Comments ({commentsData.pagination._total})
                </h2>
                <p className="text-white/60 text-lg">
                    {commentsData.pagination._total} comment{commentsData.pagination._total !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Comments List */}
            <div className="bg-transparent">
                {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                ))}
            </div>

            {/* Pagination Info */}
            {commentsData.pagination._total > commentsData.pagination._limit && (
                <div className="mt-6 text-center text-white/60 text-sm">
                    Showing {comments.length} of {commentsData.pagination._total} comments
                </div>
            )}
        </div>
    );
}

