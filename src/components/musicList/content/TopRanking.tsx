import styled from 'styled-components';
import { useRef, useState } from 'react';
import { getTier, tierImages } from '../../../utils/tierUtils';

interface RankProps {
    rank: number;
    musicName: string;
    userAvatar: string;
    score: number;
    xp: number;
}

const Rank = ({ rank, musicName, userAvatar, score, xp }: RankProps) => {
    const userTier = getTier(xp);
    const tierImage = tierImages[userTier];
    return (
        <RankContainer>
            <RankNumber>{rank}</RankNumber>
            <RankUserInfo>
                <RankUserAvatar rank={rank}>
                    <img src={userAvatar} alt="" />
                </RankUserAvatar>
                <RankUserName>{musicName}</RankUserName>
            </RankUserInfo>
            <RankUserTier>
                <img src={tierImage} alt="" />
            </RankUserTier>
            <RankScore>{score} 점</RankScore>
        </RankContainer>
    );
};

const TopRankingUI = ({ rankingList }: any) => {
    const rankListRef = useRef<HTMLDivElement>(null);
    const lastMouseDownTimeRef = useRef(0);
    const animationFrameIdRef = useRef<number | null>(null);

    const [isScrolling, setIsScrolling] = useState(false); // 스크롤 진행 여부

    const scrollStep = () => {
        if (rankListRef.current) {
            rankListRef.current.scrollTop += 10; // 스크롤 속도 조절
            if (rankListRef.current.scrollTop % 50 !== 0) {
                animationFrameIdRef.current = requestAnimationFrame(scrollStep);
            }
        }
    };

    const handleMouseDown = () => {
        lastMouseDownTimeRef.current = Date.now();
        setIsScrolling(true);
        if (rankListRef.current) {
            if (rankListRef.current.scrollTop + rankListRef.current.clientHeight == rankListRef.current.scrollHeight) {
                setIsScrolling(false); // 스크롤이 끝에 도달하면, 스크롤을 멈춤
            } else {
                scrollStep();
            }
        }
    };
    const handleMouseUp = () => {
        const mouseUpTime = Date.now(); // 마우스를 뗀 시간을 기록
        const timeDifference = mouseUpTime - lastMouseDownTimeRef.current; // 마우스를 누르고 뗀 시간의 차이를 계산
        setIsScrolling(false);
        if (!animationFrameIdRef.current) return;
        cancelAnimationFrame(animationFrameIdRef.current); // 현재의 애니메이션 프레임 요청을 취소
        // 시간 차이가 매우 작으면 (예: 200ms 미만), 마우스를 뗄 때의 스크롤 중지 동작을 무시
        if (timeDifference < 200) {
            return;
        }
    };

    return (
        <MusicModalRankContent>
            <div className="rankList">
                <Header>
                    <div className="Header-title">
                        <h1>Ranking</h1>
                    </div>
                </Header>
                <RankList ref={rankListRef}>
                    {rankingList && rankingList.length === 0 ? (
                        <NoRanking>no ranking history...</NoRanking>
                    ) : (
                        rankingList?.map((rank: any) => (
                            <Rank
                                key={rank.id}
                                rank={rank.rank}
                                xp={rank.xp}
                                musicName={rank.nickname}
                                userAvatar={rank.profile_image_url}
                                score={rank.score}
                            />
                        ))
                    )}
                </RankList>
            </div>
            <Arrow
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // 마우스가 요소 밖으로 벗어나면 스크롤 중지
            >
                &#8595;
            </Arrow>
        </MusicModalRankContent>
    );
};

const Header = styled.div`
    position: absolute;
    top: -2.8rem;
    left: 0;
    right: 0;

    .Header-title {
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
            font-size: 1.5rem;
            font-weight: 700;
        }
        position: absolute;
        top: 1.5rem;
        left: 0;
        right: 0;
        margin: auto;
    }
`;

const RankList = styled.div`
    width: 90%;
    margin-top: 0.5rem;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 1rem;
`;

const RankContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddede;
    padding: 0.3rem 0;
`;

const RankNumber = styled.span`
    font-size: 1rem;
    color: #dddede;
    flex-basis: 10%;
`;

const RankUserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 50%;
`;

const RankUserAvatar = styled.div<{ rank: number }>`
    width: 3rem;
    height: 3rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    }
`;
const RankUserTier = styled.div`
    width: 2rem;
    height: 2rem;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    }
`;

const RankUserName = styled.div`
    font-size: 0.7rem;
    margin-top: 0.1rem;
    width: 5rem;
`;

const RankScore = styled.span`
    font-size: 0.9rem;
    flex-basis: 20%;
`;

const MusicModalRankContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #dddede;
    .rankList {
        width: 90%;
        height: 90%;
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
`;

const NoRanking = styled.div`
    margin-top: 2rem;
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

export default TopRankingUI;
