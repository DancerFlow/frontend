import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell } from 'recharts';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const historyData = [
    { name: 'Jan', value: 150 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 250 },
    { name: 'Jun', value: 500 },
    { name: 'Jul', value: 350 },
    { name: 'Aug', value: 450 },
    { name: 'Sep', value: 300 },
    { name: 'Oct', value: 550 },
    { name: 'Nov', value: 400 },
    { name: 'Dec', value: 600 }
];

const LineGraph = () => {
    return (
        <LineChart width={400} height={300} data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff69b4" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

const data = [
    { name: 'Progress', value: 60 },
    { name: 'Remainder', value: 40 }
];
const COLORS = ['#fe23ff', '#f0f0f0'];

const locale = {
    weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

const UserPage = () => {
    return (
        <Container>
            <Header>
                <Avatar src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"></Avatar>
                <UserInfo>
                    <Title>Hello, Anna</Title>
                    <div>Edit Profile</div>
                </UserInfo>
            </Header>
            <Sidebar>
                <RankWrapper>
                    <img src="../../../public/ranks/platinum.png" alt="Rank" />
                </RankWrapper>
                <RankInfo>
                    <div>Rank: Platinum</div>
                    <div>
                        <StyledProgressBar progress={60}>
                            <div>Play</div>
                        </StyledProgressBar>

                        <NextRankImg src="../../../public/ranks/diamond.png" alt="nextRank" />
                    </div>
                </RankInfo>

                <StyledCalendar
                    calendarType="US"
                    formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
                ></StyledCalendar>
            </Sidebar>
            <Main>
                <SectionTitle>My History</SectionTitle>
                <div>
                    <MusicList>
                        <Music>
                            <AlbumCover src="https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg"></AlbumCover>
                            <MusicInfo>
                                <h3>Badboy</h3>
                                <p>Redvelvet</p>
                            </MusicInfo>
                            <PieChart width={80} height={80}>
                                <Pie
                                    data={data}
                                    cx={30}
                                    cy={30}
                                    innerRadius={20}
                                    outerRadius={30}
                                    startAngle={90}
                                    endAngle={-270}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Music>
                    </MusicList>
                    <Graph>
                        <LineGraph></LineGraph>
                    </Graph>
                    <MusicRank>top-ranking</MusicRank>
                </div>
            </Main>
            <Main2></Main2>
        </Container>
    );
};

export default UserPage;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #000;
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        'header header '
        'sidebar main  '
        'sidebar main2 ';
    grid-auto-rows: minmax(100px, auto);
    grid-auto-columns: minmax(100px, auto);
    color: #fff;
    & > * {
        padding: 10px;
    }
`;

const Header = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    margin-top: 4rem;
    margin-left: 2rem;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 2px;
`;

const Avatar = styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    margin-left: 2rem;
`;

const Sidebar = styled.aside`
    grid-area: sidebar;
    margin-left: 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
`;

const RankWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #fe23ff;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    margin: 1rem 0;
`;

const RankInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem 0 2rem 0;

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
    border-radius: 10px;
    overflow: hidden;

    div {
        height: 100%;
        width: ${(props) => props.progress}%;
        background-color: #fe23ff;
        border-radius: 10px;
        text-align: start;
        padding-left: 1rem;
    }

    margin: 2px 0;
`;

const NextRankImg = styled.img`
    width: 50px;
    height: 50px;
`;

const StyledCalendar = styled(Calendar)`
    border-radius: 20px;
    padding: 10px 20px;
    margin-top: 1rem;

    .react-calendar__tile--active {
        background-color: 27fd1c;
    }

    .react-calendar__navigation {
        /* background-color: #fe23ff; */
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

const Main = styled.main`
    grid-area: main;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;

    & > div:last-child {
        display: flex;
        align-items: stretch;
        height: 100%;

        div {
            border-radius: 20px;
            margin: 0 1rem 0 0;
            flex-grow: 1;
        }
    }
`;

const MusicList = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    display: flex;
    flex: 3;
`;

const SectionTitle = styled.h2`
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: start;
`;

const Music = styled.div`
    display: flex;
    border-radius: 10px;
    height: 70px;
    background-color: #fe23ff;
    padding: 1rem;
    h3 {
        font-size: 1.5rem;
        margin: 3px 0;
    }
`;

const AlbumCover = styled.img`
    height: 100%;
    margin-right: 1rem;
    border-radius: 10px;
`;

const MusicInfo = styled.div`
    /* display: flex; */
    text-align: start;
`;

const Graph = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MusicRank = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    flex: 2;
`;

const Main2 = styled.main`
    grid-area: main2;
    background-color: #fefd1e;
`;
