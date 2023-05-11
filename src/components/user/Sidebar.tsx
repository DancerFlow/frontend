import styled, { keyframes } from 'styled-components';
import Calendar from 'react-calendar';
import Bronze from '../../assets/ranks/bronze.png';
import Silver from '../../assets/ranks/silver.png';
import Gold from '../../assets/ranks/gold.png';
import Platinum from '../../assets/ranks/platinum.png';
import Diamond from '../../assets/ranks/diamond.png';
import { Tier, Profile } from '../../interface';
import ProgressBar from '../common/ProgressBar';

export default function Sidebar({ profile }: { profile: Profile }) {
    const rank: string[] = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];

    return (
        <Container>
            <RankImgWrapper>
                <img src={getTierImage(profile.user_tier)} alt="Rank" />
            </RankImgWrapper>
            <RankContainer>
                <div>Rank: {rank[profile.user_tier]}</div>
                <div>
                    <ProgressBar progress={60} height={20}></ProgressBar>
                    <NextRankImg src={getNextTierImage(profile.user_tier)} alt="nextRank" />
                </div>
            </RankContainer>
            <div>Attendance Check</div>
            <StyledCalendar calendarType="US" formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}></StyledCalendar>
        </Container>
    );
}

function getTierImage(tier: Tier): string {
    switch (tier) {
        case Tier.Bronze:
            return Bronze;
        case Tier.Silver:
            return Silver;
        case Tier.Gold:
            return 'Gold';
        case Tier.Platinum:
            return Platinum;
        case Tier.Diamond:
            return Diamond;
        default:
            return '';
    }
}

function getNextTierImage(tier: Tier): string {
    switch (tier) {
        case Tier.Bronze:
            return Silver;
        case Tier.Silver:
            return Gold;
        case Tier.Gold:
            return Platinum;
        case Tier.Platinum:
            return Diamond;
        case Tier.Diamond:
            return Diamond;
        default:
            return '';
    }
}

const Container = styled.aside`
    grid-area: sidebar;
    background-color: rgba(255, 255, 255, 0.1);
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RankImgWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #fe23ff;

    img {
        position: absolute;
        top: 10px;
        left: 10px;
        /* transform: translate(-50%, -50%); */
        width: 60px;
        height: 60px;
        border-radius: 50%;
        animation: ${spin} 0.5s ease-in-out;
        transform-origin: center center;
    }
    margin: 1rem 0;
`;

const RankContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div:last-child {
        display: flex;
        align-items: center;
        margin: 1rem;
    }
`;

const NextRankImg = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 10px;
`;

const StyledCalendar = styled(Calendar)`
    border-radius: 20px;
    padding: 1rem 1.5rem;

    .react-calendar__tile--active {
        background-color: 27fd1c;
    }

    /* .react-calendar__navigation {
        margin: 1rem 0;
    } */

    /* .react-calendar__tile--now {
        background-color: #fe23ff;
    } */

    .react-calendar__tile--weekend {
        color: #000 !important;
    }

    button {
        border: 0;
        background-color: transparent;
        color: #fff;
        padding: 1rem 0.5rem;
    }

    .react-calendar__month-view__weekdays {
        color: #fff;
    }
`;
