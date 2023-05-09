import styled from 'styled-components';

interface RankProps {
    rank: number;
    musicName: string;
    tierImageUrl: string;
    score: number;
}

const Rank = ({ rank, musicName, tierImageUrl, score }: RankProps) => {
    return (
        <RankContainer>
            <RankNumber>{rank}.</RankNumber>
            <RankUserInfo>
                <RankUserTier>
                    <img src={tierImageUrl} alt="User Tier" />
                </RankUserTier>
                <RankUserName>{musicName}</RankUserName>
            </RankUserInfo>
            <RankScore>{score} pts</RankScore>
        </RankContainer>
    );
};

const RankContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const RankNumber = styled.span`
    font-size: 1.5rem;
    margin-right: 0.5rem;
`;

const RankUserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
`;

const RankUserTier = styled.div`
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;

const RankUserName = styled.span`
    font-size: 1.5rem;
`;

const RankScore = styled.span`
    font-size: 1.5rem;
`;

const MusicModalRankContent = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    .rankList {
        width: 90%;
        height: 90%;
        background-color: #906f8c;
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }
`;

const TopRankingUI = () => {
    const rankings = [
        { rank: 1, musicName: 'user A', tierImageUrl: '/img/silver-tier.png', score: 1000 },
        { rank: 2, musicName: 'user B', tierImageUrl: '/img/bronze-tier.png', score: 800 },
        { rank: 3, musicName: 'user C', tierImageUrl: '/img/gold-tier.png', score: 600 },
        { rank: 4, musicName: 'user D', tierImageUrl: '/img/platinum-tier.png', score: 400 },
        { rank: 5, musicName: 'user E', tierImageUrl: '/img/bronze-tier.png', score: 200 }
    ];

    return (
        <MusicModalRankContent>
            <div className="rankList">
                <h1>Top Ranking</h1>
                {rankings.map((rank) => (
                    <Rank key={rank.rank} rank={rank.rank} musicName={rank.musicName} tierImageUrl={rank.tierImageUrl} score={rank.score} />
                ))}
            </div>
        </MusicModalRankContent>
    );
};

export default TopRankingUI;
