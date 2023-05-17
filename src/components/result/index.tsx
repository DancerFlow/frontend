import styled from 'styled-components';
import Lottie from 'lottie-react';
import animationData from '../../assets/star.json';
import ProgressBar from '../../components/common/ProgressBar';
import RankInfo from '../../pages/resultPage/RankInfo';
import { useGetMusicRankingQuery } from '../../api/useGetMusicRankingQuery';
import { useGetMusicDetailQuery } from '../../api/useGetMusicDetailQuery';
import { useGetGameResultQuery } from '../../api/useGetGameResult';

export default function Main({ scoreId, musicId }: { scoreId: number; musicId: number }) {
    const { data: musicDetail, isLoading: detailLoading } = useGetMusicDetailQuery(musicId, {
        enabled: Boolean(musicId)
    });
    const { data: musicRank, isLoading: rankLoading } = useGetMusicRankingQuery(musicId);
    const { data: gameResult, isLoading: resultLoading } = useGetGameResultQuery(scoreId);

    console.log('scoreId', scoreId);
    console.log('musicId', musicId);
    console.log('musicDetail', musicDetail);
    console.log('musicRank', musicRank);
    console.log('gameResult', gameResult);

    return (
        <Container>
            <RankInfo musicDetail={musicDetail}></RankInfo>
            <ResultInfo>
                <Lottie animationData={animationData} loop={true} />
                <Score>{gameResult?.score}points</Score>
                <MyRank>{gameResult?.rank}</MyRank>
            </ResultInfo>
            <ScoreDetail>
                <Combo>
                    <p>Perfect</p> <p>{gameResult?.perfect}</p>
                </Combo>
                <Combo>
                    <p>Great</p> <p>{gameResult?.great}</p>
                </Combo>
                <Combo>
                    <p>Good</p> <p>{gameResult?.good}</p>
                </Combo>
                <Combo>
                    <p>Good</p> <p>{gameResult?.good}</p>
                </Combo>
                <Combo>
                    <p>Bad</p> <p>7</p>
                </Combo>
                <XpContainer>
                    <p>Xp: </p>
                    <ProgressBar progress={60} height={50}></ProgressBar>
                    <p>+5</p>
                </XpContainer>
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
`;
const ScoreDetail = styled.section`
    display: flex;
    align-items: center;
    width: 400px;
    font-size: 2rem;
    & > :first-child {
        margin-top: 3rem;
    }
`;

const ComboContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const Combo = styled.div`
    display: flex;
    margin-bottom: 1rem;

    p {
        margin-right: 1rem;
    }
`;

const XpContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    & > * {
        margin-right: 1rem;
    }
`;
