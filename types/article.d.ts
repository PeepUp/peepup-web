export interface PreviewArticleMeta {
    id: string;
    title: string;
    content: string;
    description: string;
    category: string;
    categories: Category[];
    slug: string;
    created_at: string;
    image_cover: string;
    updated_at: string;
    timeToRead?: string;
    visit_count: number;
    stars: Star[];
    reposts: Repost[];
    read_count?: number;
    author_id?: string;
}

export type Star = {
    user_id: string;
    article_id: string;
    star_value: number;
    length?: number;
};

export type Repost = {
    id: number;
    user_id: string;
    article_id: string;
};

export type Category = {
    label: string;
    id: number;
};
