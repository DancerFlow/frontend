export interface User {
    email: string;
    password: string;
    isAdmin: number;
    createdAt: Date;
    deletedAt: Date | null;
    isDeleted: number;
    nickname: string;
    profile_image_url: string;
    grade: number;
    user_id: number;
    frame_url: string;
    Calendar: object;
}

export interface Token {
    refresh_token: string;
    user_id: number;
    expiredIn: Date | null;
}

export interface Playlist {
    score_id: number;
    user_id: number;
    music_list: object;
}

export interface GameScore {
    score: number;
    user_id: number;
    music_id: number;
    createdAt: Date;
    // isDeleted : number;
}

export interface PracticeScore {
    score_list: object;
    user_id: number;
    music_id: number;
    createdAt: Date;
    // isDeleted : number;
}

export interface Music {
    music_id: number;
    name: string;
    singer: string;
    img_url: string;
    description: string;
    likes: number;
    played: number;
    createdAt: Date;
    deletedAt: Date;
    isDeleted: number;
    play_url: string;
    answer_id: number;
}

export interface Answer {
    answer_id: number;
    answer_sheet: object;
    music_id: number;
}
