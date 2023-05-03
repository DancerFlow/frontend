import styled, { keyframes } from 'styled-components';
import Calendar from 'react-calendar';

export default function Sidebar() {
    return (
        <Container>
            <RankImgWrapper>
                <img src="../../../public/ranks/platinum.png" alt="Rank" />
            </RankImgWrapper>
            <RankContainer>
                <div>Rank: Platinum</div>
                <div>
                    <StyledProgressBar progress={60}>
                        <div></div>
                    </StyledProgressBar>
                    <NextRankImg src="../../../public/ranks/diamond.png" alt="nextRank" />
                </div>
            </RankContainer>
            <StyledCalendar calendarType="US" formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}></StyledCalendar>
        </Container>
    );
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
