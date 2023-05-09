export interface Status {
    error?: object;
    massage?: string;
    status_code: number;
}

export interface User {
    Status: Status;
    access_token: string;
}

export enum Tier {
    Bronze,
    Silver,
    Gold,
    Platinum,
    Diamond
}

export interface Profile {
    Status?: Status;
    user_nickname: string;
    user_email: string;
    user_profile_image_url?: string;
    user_tier?: Tier;
    user_xp?: number;
}

export interface UserRank {
    user_tier: Tier;
    user_xp: number;
}

export interface Calendar {
    calendar_date: Date[];
}

export interface UserGameHistory {
    music_name: string;
    music_image_url: string;
    music_singer: string;
    user_music_best_score: number;
    music_total_score: number;
}

export interface UserGameMusicHistory {
    music_best_score_detail: {
        score: number;
        rank: number;
        perfect: number;
        good: number;
        miss: number;
    };
    music_total_score: number;
    music_score_by_date: { music_score: number; music_score_created_at: Date };
}

interface MusicSinger {
    id: number;
    name: string;
}
export interface Music {
    id: number;
    name: string;
    music_genre: string | null;
    music_singer: MusicSinger;
    album_image_url: string;
}

export interface MusicRank {
    user_name: string;
    user_score: number;
    created_at: Date;
    my_score: string;
    my_rank: number;
}
