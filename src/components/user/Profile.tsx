import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import Calendar from 'react-calendar';
import Bronze from '../../assets/ranks/bronze.png';
import Silver from '../../assets/ranks/silver.png';
import Gold from '../../assets/ranks/gold.png';
import Platinum from '../../assets/ranks/platinum.png';
import Diamond from '../../assets/ranks/diamond.png';
import { Tier, Profile } from '../../interface';
import ProgressBar from '../common/ProgressBar';
import { useGetUserProfile } from '../../api/useGetUserProfile';
import { useState } from 'react';
import { useGetGameStamps } from '../../api/useGetGameStamps';
import smileSvg from '../../assets/smile.svg';

import ReactDOM from 'react-dom';
import EditModal from './EditModal';

export default function Profile() {
    //edit profile
    const [isClicked, setIsClicked] = useState(false);
    const handleOpenModal = () => {
        setIsClicked(true);
    };

    const handleCloseModal = () => {
        setIsClicked(false);
    };

    //calendar
    const currDate = new Date();
    const [activeMonth, setActiveMonth] = useState(currDate.getMonth() + 1);
    const [activeYear, setActiveYear] = useState(currDate.getFullYear());

    const { data: profile, isLoading, isError } = useGetUserProfile();
    const { data: calendarData } = useGetGameStamps(activeYear, activeMonth);
    console.log('calender', calendarData);

    const tileContent = ({ date }: { date: Date }) => {
        const formattedDate = date.toISOString().split('T')[0];
        const hasStamp = calendarData?.some((item) => item.created_at && item.created_at.includes(formattedDate));

        return <Tile>{hasStamp && <StampImage src={smileSvg} />}</Tile>;
    };

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (isError) {
        return <div>Error loading profile</div>;
    }

    return (
        <>
            {profile && (
                <>
                    <Header>
                        <Avatar src={profile?.profile_image_url} alt="profile" />
                        <UserInfo>
                            <Title>Hello, {profile?.nickname}</Title>
                            <div>
                                <EditProfile onClick={handleOpenModal}>Edit Profile</EditProfile>
                                <FontAwesomeIcon icon={faPen} style={{ display: 'inline' }} onClick={handleOpenModal} />
                            </div>
                        </UserInfo>
                    </Header>
                    <Sidebar>
                        <RankImgWrapper>
                            <img src={getTierImage(profile?.current_tier)} alt="Rank" />
                        </RankImgWrapper>
                        <RankContainer>
                            <div>Rank: {rank[profile?.current_tier]}</div>
                            <div>
                                <ProgressBar progress={60} height={20}></ProgressBar>
                                <NextRankImg src={getNextTierImage(profile?.current_tier)} alt="nextRank" />
                            </div>
                        </RankContainer>
                        <CalendarContainer>
                            <CalendarTitle>
                                <ThisMonth>{activeMonth}</ThisMonth> <p>월 출석체크 </p>
                            </CalendarTitle>
                            <StyledCalendar
                                calendarType="US"
                                formatDay={(locale, date) => date.toLocaleString(locale, { day: 'numeric' }).replace('일', '')}
                                onActiveStartDateChange={({ activeStartDate }) => {
                                    if (activeStartDate) {
                                        setActiveMonth(activeStartDate.getMonth() + 1);
                                        setActiveYear(activeStartDate.getFullYear());
                                    }
                                }}
                                tileContent={tileContent}
                            />
                        </CalendarContainer>
                    </Sidebar>
                    {ReactDOM.createPortal(<EditModal />, document.getElementById('modal-root') as HTMLElement)}
                </>
            )}
        </>
    );
}

//Header

const Header = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    div {
        display: flex;
        align-items: center;
        p {
            margin-right: 5px;
        }
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 2px;
`;

const Avatar = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-left: 4rem;
`;

const EditProfile = styled.p`
    padding-top: 0.5rem;
    cursor: pointer;
`;

// Sidebar

const rank: string[] = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];

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

const Sidebar = styled.aside`
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

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: solid 2px ${(props) => props.theme.pink};
    margin-top: 1rem;
`;
const CalendarTitle = styled.div`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 2rem;
    align-items: flex-end;
`;

const ThisMonth = styled.p`
    font-size: 1.8rem;
    margin-right: 2px;
`;

const StampImage = styled.img`
    width: 2rem;
`;

const StyledCalendar = styled(Calendar)`
    padding: 1rem;

    .react-calendar__tile--active {
        background-color: 27fd1c;
    }

    .react-calendar__navigation {
        display: none;
    }

    .react-calendar__tile--weekend {
        color: #000 !important;
    }

    .react-calendar__tile {
        font-size: 0.7rem;
        position: relative;
        /* background-color: rgba(255, 255, 255, 0.1); */
        /* border-radius: 10px; */
        padding: 1rem 0;
    }

    .react-calendar__month-view__weekdays {
        font-size: 0.6rem;
        text-decoration: none;
        color: #fff;
        margin-bottom: 1rem;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: grey;
    }
    button {
        border: 0;
        background-color: transparent;
        color: #fff;
        padding: 0.5rem 0;
    }
`;

const Tile = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
