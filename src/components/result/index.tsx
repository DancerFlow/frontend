import styled from 'styled-components';
import Lottie from 'lottie-react';
import animationData from '../../assets/star.json';
import ProgressBar from '../../components/common/ProgressBar';
import MusicInfo from './MusicInfo';
import { useGetMusicRankingQuery } from '../../api/useGetMusicRankingQuery';
import { useGetMusicDetailQuery } from '../../api/useGetMusicDetailQuery';
import { useGetGameResultQuery } from '../../api/useGetGameResult';
import TopRanking from './TopRanking';
import { getPercentageToNextTier } from '../../utils/tierUtils';
import { useState, useEffect } from 'react';
import RiseLoader from 'react-spinners/RiseLoader';
import { keyframes } from 'styled-components';

interface ResultData {
    guestData?: any;
    scoreId?: any;
    musicId: number;
}

export default function Main({ resultdata }: { resultdata: ResultData }) {
    const [loading, setLoading] = useState(true);

    let gameResultQuery;

    if (Boolean(resultdata?.scoreId)) {
        //유저인 경우 scoreId를 받아서 api 요청
        gameResultQuery = useGetGameResultQuery(resultdata?.scoreId);
    } else {
        gameResultQuery = {
            //게스트인 경우 guestData를 받아서 화면에 보여줌.
            data: resultdata?.guestData,
            isLoading: false
        };
    }

    const gameResult = gameResultQuery.data;
    const resultLoading = gameResultQuery.isLoading;

    const { data: musicDetail, isLoading: detailLoading } = useGetMusicDetailQuery(resultdata?.musicId, {
        enabled: Boolean(resultdata?.musicId)
    });
    const { data: musicRank, isLoading: rankLoading } = useGetMusicRankingQuery(resultdata?.musicId);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 2500); //게임 끝나고 고의적으로 2초정도 로딩 걸어줌

        return () => clearTimeout(timeoutId);
    }, []);

    if (detailLoading || rankLoading || resultLoading || loading) {
        return (
            <LoadingContainer>
                <RiseLoader color={'#FE23FF'} size={50}></RiseLoader>
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <MusicContainer>
                <MusicInfo musicDetail={musicDetail}></MusicInfo>
                <RankingContainer>
                    <TopRanking rankingList={musicRank}></TopRanking>
                </RankingContainer>
                <div className="arrow"> &#8595;</div>
            </MusicContainer>
            <ResultContainer>
                <Lottie animationData={animationData} loop={true} />
                <Score>{gameResult?.score?.toFixed(0)}점</Score>
                {gameResult.xp !== undefined && (
                    <XpContainer>
                        <ProgressBar progress={getPercentageToNextTier(gameResult ? gameResult?.xp : 0)} height={50}></ProgressBar>
                    </XpContainer>
                )}
            </ResultContainer>
            <ScoreContainer>
                <MyRank>{gameResult?.rank}</MyRank>
                <Combo>
                    <p>Perfect</p>
                    <p> {gameResult?.perfect}</p>
                </Combo>
                <Combo>
                    <p>Great</p>
                    <p> {gameResult?.great}</p>
                </Combo>
                <Combo>
                    <p>Good </p>
                    <p>{gameResult?.good}</p>
                </Combo>
                <Combo>
                    <p>Normal</p>
                    <p> {gameResult?.normal}</p>
                </Combo>
                <Combo>
                    <p>Miss</p>
                    <p> {gameResult?.miss}</p>
                </Combo>
                {gameResult.xp !== undefined && <DeltaXp>XP +{gameResult?.delta_xp}</DeltaXp>}
            </ScoreContainer>
        </Container>
    );
}

const LoadingContainer = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
`;
const Container = styled.section`
    display: flex;

    section {
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        margin: 0 1rem;
        justify-content: flex-start;
        /* background-color: red; */
        flex-shrink: 0;
        width: 25%;
    }
    margin: 0 3rem;
    justify-content: center;
`;

const RankingContainer = styled.div`
    overflow-y: auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ScoreAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultContainer = styled.section`
    display: flex;
    align-items: center;
    animation: ${ScoreAnimation} 0.5s ease-in-out forwards;
`;

const XpContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 4rem;
`;

const Score = styled.div`
    font-size: 3rem;
    margin-top: 1rem;
`;

const MusicContainer = styled.section`
    display: flex;
    align-items: center;
    animation: ${ScoreAnimation} 0.5s ease-in-out forwards;
`;

const ScoreContainer = styled.section`
    display: flex;
    font-size: 2rem;
    & > :first-child {
        margin: 4rem 0 3rem 0;
    }

    & > div {
        opacity: 0;
        animation: ${ScoreAnimation} 0.5s ease-in-out forwards;
    }
    & > div:nth-child(1) {
        animation-delay: 0s;
    }
    & > div:nth-child(2) {
        animation-delay: 0.2s;
    }
    & > div:nth-child(3) {
        animation-delay: 0.4s;
    }
    & > div:nth-child(4) {
        animation-delay: 0.6s;
    }
    & > div:nth-child(5) {
        animation-delay: 0.8s;
    }
    & > div:nth-child(6) {
        animation-delay: 1s;
    }
    & > div:nth-child(7) {
        animation-delay: 1.2s;
    }
`;

const MyRank = styled.div`
    font-size: 4rem;
    text-align: center;
    font-style: italic;
`;
const Combo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding: 0 3rem;
`;

const DeltaXp = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 1rem;
    padding: 0 3rem;
`;
