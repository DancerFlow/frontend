import styled, { keyframes } from 'styled-components';
import Calendar from 'react-calendar';
import Bronze from '../../assets/ranks/bronze.png';
import Silver from '../../assets/ranks/silver.png';
import Gold from '../../assets/ranks/gold.png';
import Platinum from '../../assets/ranks/platinum.png';
import Diamond from '../../assets/ranks/diamond.png';
import { UserRank, Tier } from '../../interface';

export default function Sidebar() {
    const data: UserRank = {
        user_tier: Tier.Platinum,
        user_xp: 1890
    };

    return (
        <Container>
            <RankImgWrapper>
                <img src={getTierName(data.user_tier)} alt="Rank" />
            </RankImgWrapper>
            <RankContainer>
                <div>Rank: Platinum</div>
                <div>
                    <StyledProgressBar progress={60}>
                        <div></div>
                    </StyledProgressBar>
                    <NextRankImg src={getNextTierName(data.user_tier)} alt="nextRank" />
                </div>
            </RankContainer>
            <StyledCalendar calendarType="US" formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}></StyledCalendar>
        </Container>
    );
}

function getTierName(tier: Tier): string {
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

function getNextTierName(tier: Tier): string {
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

const StyledProgressBar = styled.div<{ progress: number }>`
    height: 20px;
    width: 100%;
    background-color: rgba(254, 35, 255, 0.5);
    border: 1px solid #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    margin: 2px 0;
    div {
        height: 100%;
        width: ${(props) => props.progress}%;
        background-color: #fe23ff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-right: none;
        border-radius: 10px;
        text-align: start;
        padding-left: 1rem;
    }
`;

const NextRankImg = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 10px;
`;

const StyledCalendar = styled(Calendar)`
    border-radius: 20px;
    padding: 10px 20px;

    .react-calendar__tile--active {
        background-color: 27fd1c;
    }

    .react-calendar__navigation {
        margin: 1rem 0;
    }

    .react-calendar__tile--now {
        background-color: #fe23ff;
    }

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
