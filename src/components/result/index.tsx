import styled from 'styled-components';
import Lottie from 'lottie-react';
import animationData from '../../assets/star.json';
import ProgressBar from '../../components/common/ProgressBar';
import MusicInfo from './MusicInfo';
import { useGetMusicRankingQuery } from '../../api/useGetMusicRankingQuery';
import { useGetMusicDetailQuery } from '../../api/useGetMusicDetailQuery';
import { useGetGameResultQuery } from '../../api/useGetGameResult';
import TopRankingUI from '../musicList/content/TopRanking';
import { getPercentageToNextTier } from '../../utils/tierUtils';

interface ResultData {
    guestData?: any;
    scoreId?: any;
    musicId: number;
}

export default function Main({ resultdata }: { resultdata: ResultData }) {
    const { data: musicDetail, isLoading: detailLoading } = useGetMusicDetailQuery(resultdata?.musicId, {
        enabled: Boolean(resultdata?.musicId)
    });
    const { data: musicRank, isLoading: rankLoading } = useGetMusicRankingQuery(resultdata?.musicId);
    const { data: gameResult, isLoading: resultLoading } = useGetGameResultQuery(resultdata?.scoreId);

    if (resultLoading || detailLoading || rankLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <ColumnContainer>
                <MusicInfo musicDetail={musicDetail}></MusicInfo>
                <TopRankingUI rankingList={musicRank}></TopRankingUI>
            </ColumnContainer>
            <ResultInfo>
                <Lottie animationData={animationData} loop={true} />
                <Score>{gameResult?.score}점</Score>
                <XpContainer>
                    <p>Xp: </p>
                    <ProgressBar progress={getPercentageToNextTier(gameResult ? gameResult?.xp : 0)} height={50}></ProgressBar>
                    <p>+{gameResult?.delta_xp}</p>
                </XpContainer>
            </ResultInfo>
            <ScoreDetail>
                <MyRank>{gameResult?.rank}</MyRank>
                <Combo>
                    <p>Perfect {gameResult?.perfect}</p>
                </Combo>
                <Combo>
                    <p>Great {gameResult?.great}</p>
                </Combo>
                <Combo>
                    <p>Good {gameResult?.good}</p>
                </Combo>
                <Combo>
                    <p>Normal {gameResult?.normal}</p>
                </Combo>
                <Combo>
                    <p>Miss {gameResult?.miss}</p>
                </Combo>
            </ScoreDetail>
        </Container>
    );
}

const Container = styled.section`
    display: flex;
    section {
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }
    overflow-y: auto;
`;

const ResultInfo = styled.section`
    display: flex;
    align-items: center;
    width: 400px;
`;

const Score = styled.div`
    font-size: 3rem;
    margin-top: 1rem;
`;

const MyRank = styled.div`
    font-size: 2.5rem;
    margin-top: 2rem;
    text-align: center;
    font-style: italic;
`;
const ScoreDetail = styled.section`
    display: flex;
    width: 400px;
    font-size: 2rem;
    & > :first-child {
        margin: 4rem 0 3rem 0;
    }
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const Combo = styled.div`
    display: flex;
    align-items: flex-start;
    font-size: 1.2rem;
    margin-bottom: 1rem;

    p {
        margin-right: 1rem;
        margin-left: 3rem;
    }
`;

const XpContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    & > * {
        margin-right: 1rem;
    }
    margin-top: 2rem;
`;
