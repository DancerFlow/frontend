import { UserGameHistoryDetail } from '../interface';

export const useGetGameHistoryDetail = (music_id: number) => {
    const currentDate = new Date();

    const gamehistoryDetail: UserGameHistoryDetail[] = [
        {
            music_id: 0,
            music_best_score_detail: {
                score: 255,
                rank: 7,
                perfect: 5,
                good: 2,
                miss: 3
            },
            music_total_score: 300,
            music_score_by_date: [
                { music_score: 255, music_score_created_at: currentDate },
                { music_score: 300, music_score_created_at: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000) },
                { music_score: 200, music_score_created_at: new Date(currentDate.getTime() - 20 * 24 * 60 * 60 * 1000) },
                { music_score: 190, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
            ]
        },
        {
            music_id: 1,
            music_best_score_detail: {
                score: 100,
                rank: 7,
                perfect: 5,
                good: 2,
                miss: 3
            },
            music_total_score: 150,
            music_score_by_date: [
                { music_score: 255, music_score_created_at: currentDate },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000) },
                { music_score: 200, music_score_created_at: new Date(currentDate.getTime() - 20 * 24 * 60 * 60 * 1000) },
                { music_score: 190, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
            ]
        },
        {
            music_id: 2,
            music_best_score_detail: {
                score: 100,
                rank: 7,
                perfect: 5,
                good: 2,
                miss: 3
            },
            music_total_score: 150,
            music_score_by_date: [
                { music_score: 255, music_score_created_at: currentDate },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000) },
                { music_score: 200, music_score_created_at: new Date(currentDate.getTime() - 20 * 24 * 60 * 60 * 1000) },
                { music_score: 190, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
            ]
        },
        {
            music_id: 3,
            music_best_score_detail: {
                score: 177,
                rank: 7,
                perfect: 5,
                good: 2,
                miss: 3
            },
            music_total_score: 233,
            music_score_by_date: [
                { music_score: 178, music_score_created_at: currentDate },
                { music_score: 233, music_score_created_at: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000) },
                { music_score: 222, music_score_created_at: new Date(currentDate.getTime() - 20 * 24 * 60 * 60 * 1000) },
                { music_score: 190, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) },
                { music_score: 210, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
            ]
        },
        {
            music_id: 4,
            music_best_score_detail: {
                score: 177,
                rank: 7,
                perfect: 5,
                good: 2,
                miss: 3
            },
            music_total_score: 233,
            music_score_by_date: [
                { music_score: 199, music_score_created_at: currentDate },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000) },
                { music_score: 200, music_score_created_at: new Date(currentDate.getTime() - 20 * 24 * 60 * 60 * 1000) },
                { music_score: 233, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) },
                { music_score: 230, music_score_created_at: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
            ]
        }
    ];

    return gamehistoryDetail[music_id];
};

// export interface UserGameHistoryDetail {
//     music_id : 1,
// music_best_score_detail: {
//     score: number;
//     rank: number;
//     perfect: number;
//     good: number;
//     miss: number;
// };
//     music_total_score: number;
//     music_score_by_date: { music_score: number; music_score_created_at: Date };
// }
