import styled from 'styled-components';

import RankingBanner from './RankingBanner';
interface RankProps {
    rank: number;
    musicName: string;
    userAvatar: string;
    score: number;
}

const Rank = ({ rank, musicName, userAvatar, score }: RankProps) => {
    return (
        <RankContainer>
            <RankNumber>{rank}</RankNumber>
            <RankUserInfo>
                <RankUserAvatar rank={rank}>
                    <img src={userAvatar} alt="" />
                </RankUserAvatar>
                <RankUserName>{musicName}</RankUserName>
            </RankUserInfo>
            <RankScore>{score} 점</RankScore>
        </RankContainer>
    );
};

const TopRankingUI = ({ rankingList }: any) => {
    return (
        <MusicModalRankContent>
            <div className="rankList">
                <Header>
                    <div className="Header-title">
                        <h1>Ranking</h1>
                    </div>
                </Header>
                <RankList>
                    {rankingList.map((rank: any) => (
                        <Rank
                            key={rank.id}
                            rank={rank.rank}
                            musicName={rank.nickname}
                            userAvatar={rank.profile_image_url}
                            score={rank.score}
                        />
                    ))}
                </RankList>
            </div>
            <div className="arrow"> &#8595;</div>
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
            margin-left: 2rem;
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
    justify-content: center;
    border-bottom: 1px solid #dddede;
    padding: 0.5rem 0;
`;

const RankNumber = styled.span`
    font-size: 1rem;
    color: #dddede;
`;

const RankUserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const RankUserAvatar = styled.div<{ rank: number }>`
    width: 3rem;
    height: 3rem;
    margin-right: ${(props) => (props.rank === 1 ? '-0.1rem' : '0.5rem')};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    }
`;

const RankUserName = styled.div`
    font-size: 0.5rem;
    margin-top: 0.2rem;
    width: 5rem;
`;

const RankScore = styled.span`
    font-size: 0.9rem;
    margin-left: auto;
    margin-right: 0.2rem;
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

export default TopRankingUI;
