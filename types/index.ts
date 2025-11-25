export type Song = {
    link_mv: string;
    sum_comment: number;
    view: number;
    favorite: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
    id_account: string;
    name_singer: string;
    slug_name_singer: string;
    src_music: string;
    image_music: string;
    time_format: string;
    seconds: number;
    name_music: string;
    slug_name_music: string;
    category: string;
    slug_category: string;
    subscribe: string;
    slug_subscribe: string;
    slug_alias: string;
}

export type Comment = {
    _id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    id_music: string;
    id_account: string;
    id_reply: string | null;
    reply: Comment[];
    edit_content: boolean;
    account: {
        _id: string;
        user_name: string;
        image: string;
    };
}

export type CommentsResponse = {
    pagination: {
        _limit: number;
        _page: number;
        _total: number;
    };
    data: Comment[];
}

