import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4, fa5 } from '@fortawesome/free-solid-svg-icons';
import avatar1 from '../../../assets/avatarImg/avatar1.png';
import avatar2 from '../../../assets/avatarImg/avatar2.png';
import avatar3 from '../../../assets/avatarImg/avatar3.png';
import avatar4 from '../../../assets/avatarImg/avatar4.png';
import avatar5 from '../../../assets/avatarImg/avatar5.png';
import RankingBanner from './RankingBanner';
interface RankProps {
    rank: number;
    musicName: string;
    userAvatar: string;
    score: number;
}

console.log(avatar1);
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

const TopRankingUI = () => {
    const rankings = [
        { rank: 1, musicName: '양갈래', userAvatar: avatar1, score: 1000 },
        { rank: 2, musicName: '댄스마스터', userAvatar: avatar2, score: 800 },
        { rank: 3, musicName: '초롱이', userAvatar: avatar3, score: 600 },
        { rank: 4, musicName: '나이쁨', userAvatar: avatar4, score: 400 },
        { rank: 5, musicName: 'car은우', userAvatar: avatar5, score: 200 },
        { rank: 6, musicName: 'car은우', userAvatar: avatar5, score: 200 },
        { rank: 7, musicName: 'car은우', userAvatar: avatar5, score: 200 },
        { rank: 8, musicName: 'car은우', userAvatar: avatar5, score: 200 },
        { rank: 9, musicName: 'car은우', userAvatar: avatar5, score: 200 }
    ];

    return (
        <MusicModalRankContent>
            <div className="rankList">
                <Header>
                    <RankingBanner />
                    <div className="Header-title">
                        <h1>Ranking</h1>
                    </div>
                </Header>
                <RankList>
                    {rankings.map((rank) => (
                        <Rank key={rank.rank} rank={rank.rank} musicName={rank.musicName} userAvatar={rank.userAvatar} score={rank.score} />
                    ))}
                </RankList>
            </div>
        </MusicModalRankContent>
    );
};

const Header = styled.div`
    height: 2rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -2rem;
    left: 0;
    right: 0;
    margin: auto;

    .Header-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #fff;
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
    margin-top: 0.5rem;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 1rem;
`;

const RankContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ffc905;
    padding: 0.5rem 0;
    margin: 2rem 0;
`;

const RankNumber = styled.span`
    font-size: 1.5rem;
    color: #ffc905;
`;

const RankUserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const RankUserAvatar = styled.div`
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
    color: #fff;
`;

const RankScore = styled.span`
    font-size: 1rem;
    margin-left: auto;
    margin-right: 0.2rem;
    color: #ffc905;
`;

const MusicModalRankContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .rankList {
        width: 90%;
        height: 90%;
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }
`;

export default TopRankingUI;
