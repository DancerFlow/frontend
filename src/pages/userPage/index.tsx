import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPen } from '@fortawesome/free-solid-svg-icons';

// export default function userPage() {
//     return (
//         <Circle>
//             <CircleImage src="../../../public/ranks/diamond.png" alt="your-image-alt" />
//         </Circle>
//     );
// }
// const spin = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;
// const Circle = styled.div`
//     position: relative;
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     border: 2px solid #000;
// `;

// const CircleImage = styled.img`
//     position: absolute;
//     top: 20px;
//     left: 20px;
//     width: 60px;
//     height: 60px;
//     border-radius: 50%;

//     animation: ${spin} 2s linear;
//     transform-origin: center center;
// `;

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
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.clientWidth);
                setHeight(containerRef.current.clientHeight);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '80%' }} ref={containerRef}>
            <LineChart width={width} height={height} data={historyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#ff69b4" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

const data = [
    { name: 'Score', value: 60 },
    { name: 'Remainder', value: 40 }
];
const COLORS = ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)'];

const UserPage = () => {
    return (
        <Container>
            <Header>
                <Avatar src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"></Avatar>
                <UserInfo>
                    <Title>Hello, Anna</Title>
                    <div>
                        <p>Edit Profile</p> <FontAwesomeIcon icon={faPen} style={{ display: 'inline' }} />
                    </div>
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
                            <div></div>
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
                <MainContent>
                    <MusicList>
                        <Music>
                            <AlbumCover src="https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg"></AlbumCover>
                            <MusicInfo>
                                <MusicTitle>Badboy</MusicTitle>
                                <p>Redvelvet</p>
                            </MusicInfo>
                            <PieChart width={60} height={40}>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    cx={30}
                                    cy={15}
                                    innerRadius={15}
                                    outerRadius={20}
                                    startAngle={90}
                                    endAngle={-270}
                                    fill="rgba(255, 255, 255, 0.5)"
                                    stroke="none"
                                >
                                    <Label value={`${data[0].value}`} position="center" fill="#fff" fontSize={15} fontWeight={600} />
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Music>
                        <Music>
                            <AlbumCover src="https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg"></AlbumCover>
                            <MusicInfo>
                                <MusicTitle>Badboy</MusicTitle>
                                <p>Redvelvet</p>
                            </MusicInfo>
                            <PieChart width={60} height={40}>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    cx={30}
                                    cy={15}
                                    innerRadius={15}
                                    outerRadius={20}
                                    startAngle={90}
                                    endAngle={-270}
                                    fill="rgba(255, 255, 255, 0.5)"
                                    stroke="none"
                                    paddingAngle={5}
                                >
                                    <Label value={`${data[0].value}`} position="center" fill="#fff" fontSize={15} fontWeight={600} />
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Music>
                    </MusicList>

                    <Graph>
                        <LineGraph></LineGraph>
                    </Graph>
                    <MusicRank>
                        <MusicRankComponent></MusicRankComponent>
                    </MusicRank>
                </MainContent>
            </Main>
            <Bottom>
                <SectionTitle>Liked Playlists</SectionTitle>
                <LikedContainer>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <LikedItems items={items}></LikedItems>
                    <ChevronIcon icon={faChevronRight} />
                </LikedContainer>
            </Bottom>
        </Container>
    );
};

export default UserPage;

const Container = styled.div`
    box-sizing: border-box;
    height: 100vh;
    background-color: #000;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        'header header '
        'sidebar main  '
        'sidebar bottom ';
    padding: 1rem;
    grid-auto-rows: minmax(100px, auto);
    grid-auto-columns: minmax(100px, auto);
    color: #fff;
    & > * {
        padding: 10px;
        border-radius: 20px;
    }
`;

const Header = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    /* margin: 1rem 1rem 1rem 0; */
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
    margin-left: 1.5rem;
`;

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
const RankWrapper = styled.div`
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

const RankInfo = styled.div`
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

const Main = styled.main`
    grid-area: main;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.h2`
    margin: 1rem 0 0 1rem;
    font-size: 1rem;
    text-align: start;
`;

const MainContent = styled.div`
    display: flex;
    height: 100%;
    padding: 1rem;
    div {
        border-radius: 20px;
    }
`;

// First section
const MusicList = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.5rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    flex: 2;
    margin-right: 1rem;
`;

const Music = styled.div`
    display: flex;
    border-radius: 10px;
    max-height: 40px;
    background-color: #fe23ff;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
    h3 {
        font-size: 1.5rem;
        margin: 3px 0;
    }
`;

const AlbumCover = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 10px;
`;

const MusicInfo = styled.div`
    text-align: start;
    p {
        font-size: 0.8rem;
    }
    margin-right: 2rem;
`;

const MusicTitle = styled.p`
    margin: 5px 0;
`;

// 2nd(Middle) section
const Graph = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    padding-right: 1.2rem;
`;

// Right
const StarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    position: relative;
`;

const Star = styled.img`
    width: 3rem;
    height: auto;
    position: absolute;
    transform: ${({ degree }) => `rotate(${degree}deg) translate(-50%, -50%)`};
`;

const MusicRank = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem 2rem;
`;

const archDegrees = [-45, 0, 45];

const MusicRankComponent = () => {
    return (
        <MusicRank>
            <StarContainer>
                {archDegrees.map((degree, index) => (
                    <Star key={index} degree={degree} src="../../../public/ranks/star.png" />
                ))}
                <div>Top 5 Player</div>
            </StarContainer>
            <RankUsers ranklists={ranklists}></RankUsers>
        </MusicRank>
    );
};
const Ranker = styled.div`
    display: flex;
    background-color: #27fd1c;
    align-items: center;
    justify-content: space-between;

    /* img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    } */
    margin-top: 1rem;
    padding: 0.2rem 1rem;
`;

const RankImg = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`;

const RankUsers = ({ ranklists }) => {
    return (
        <>
            {ranklists.map((item, index) => (
                <Ranker key={index}>
                    <RankImg src={item.imgSrc} alt={item.name} />
                    <div>{item.name}</div>
                    <div>{item.score}</div>
                </Ranker>
            ))}
        </>
    );
};

const ranklists = [
    {
        imgSrc: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        name: 'anna',
        score: 377
    },
    {
        imgSrc: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        name: 'anna',
        score: 375
    },
    {
        imgSrc: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        name: 'anna',
        score: 370
    },
    {
        imgSrc: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        name: 'anna',
        score: 359
    },
    {
        imgSrc: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        name: 'anna',
        score: 357
    }
];

// Bottom Playlist
const Bottom = styled.main`
    grid-area: bottom;
    background-color: rgba(255, 255, 255, 0.1);
`;

const LikedContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`;

const LikedList = styled.section`
    display: flex;
    justify-content: flex-start;
`;

const ChevronIcon = styled(FontAwesomeIcon)`
    margin-left: auto;
`;

const LikedItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5rem 0 0 1rem;
    flex-basis: 10%;
    flex-grow: 0;
`;

const LikedItemImg = styled.img`
    width: 80%;
    height: auto;
`;

const LikedItemName = styled.div`
    margin-top: 0.5rem;
    font-size: 0.7rem;
    text-align: left;
`;
const LikedItemSinger = styled.div`
    font-size: 0.6rem;
    text-align: left;
`;

const LikedItems = ({ items }) => {
    return (
        <LikedList>
            {items.map((item, index) => (
                <LikedItem key={index}>
                    <LikedItemImg src={item.imgSrc} alt={item.name} />
                    <LikedItemName>{item.name}</LikedItemName>
                    <LikedItemSinger>{item.singer}</LikedItemSinger>
                </LikedItem>
            ))}
        </LikedList>
    );
};

const items = [
    {
        imgSrc: 'https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg',
        name: 'bad boy',
        singer: 'red velvet'
    },
    {
        imgSrc: 'https://lh3.googleusercontent.com/NmlKI9pzrI6dtC9yKxwZxR5LVyzM5krQCrhjSeIrziKvfFYLxyFviMKNKoO4ixsGx-_eXKL08NYnfyEz7w=w544-h544-l90-rj',
        name: 'Sunday Night Drive (Sunday Night Drive)',
        singer: 'Jay Park'
    },
    {
        imgSrc: 'https://lh3.googleusercontent.com/JIO2pp9Y3a0-9HP69aZ8xH4hiOv6c1soiV40kuP9HuKTQf9qStqTXzFJi9K96wWKLnoukexoau2U3ldu=w544-h544-l90-rj',
        name: 'Shoong! (feat. LISA of BLACKPINK)',
        singer: 'TAEYANG'
    }
];
