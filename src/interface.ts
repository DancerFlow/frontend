export interface Status {
    error?: object;
    message?: string;
    status_code?: number;
}

export interface UserRespose {
    Status?: Status;
}
export interface UserForm {
    email: string;
    password: string;
    passwordConfirm?: string;
    nickname?: string;
}
export interface UserVerify {
    isLoggedIn: boolean;
    isAdmin: boolean;
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
    nickname: string;
    email: string;
    profile_image_url?: string;
    current_tier: Tier;
    // user_xp: number;
}

export interface UserRank {
    user_tier: Tier;
    user_xp: number;
}

export interface Stamps {
    created_at: string[];
}

export interface UserGameHistory {
    music_id: number;
    music_name: string;
    album_image_url: string;
    music_singer: string;
    user_music_best_score: number;
    music_total_score: number;
}

export interface UserGameHistoryDetail {
    music_id: number;
    music_best_score_detail: {
        score: number;
        rank: number;
        perfect: number;
        good: number;
        miss: number;
    };
    music_total_score: number;
    music_score_by_date: { music_score: number; music_score_created_at: Date }[];
}

interface MusicSinger {
    id: number;
    name: string;
}
export interface Music {
    id: number;
    name: string;
    _genre: string | null;
    music_singer: MusicSinger;
    album_image_url: string;

    likes?: number;
    music_genre?: string;
    palyed?: number;
    description?: string;
}

export interface MusicRank {
    id: number;
    nickname: string;
    profile_image_url: string;
    score: number;
    rank: number;
}

export interface UserLikes {
    id: number;
    user_id: number;
    music_id: number;
    created_at: Date;
    music: Music;
}
