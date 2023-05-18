import styled from 'styled-components';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { UserGameHistory } from '../../../interface';
import { useGetGameHistoryQuery } from '../../../api/useGetGameHistoryQuery';
import { useState } from 'react';
import ScoreInfo from './ScoreInfo';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Main() {
    const [selected, setSelected] = useState<number>();
    // const [pageNo, setPageNo] = useState(1);
    const { data, isLoading, isError } = useGetGameHistoryQuery(1);
    console.log('gamehistory', data);

    // historyList가 로딩되면 첫 번째 카드의 music_id를 selected로 설정

    useEffect(() => {
        if (data && data.historyList && data.historyList.length > 0) {
            setSelected(data.historyList[0].music_id);
        }
    }, [data]);

    if (isLoading) {
        return <ClipLoader color="#FE23FF"></ClipLoader>;
    }

    if (isError) {
        return <div>Error loading history</div>;
    }

    const { historyList } = data || { historyList: [] };

    const handleClick = (music_id: number) => {
        setSelected(music_id);
    };

    return (
        <Container>
            <SectionTitle>Play History</SectionTitle>
            <Section>
                <CardContainer>
                    {data && historyList?.length ? (
                        historyList.map((game: UserGameHistory) => (
                            <MusicCard
                                key={game.music_id}
                                onClick={() => {
                                    handleClick(game.music_id);
                                }}
                                selected={game.music_id === selected}
                            >
                                <Left>
                                    <AlbumCover src={game.album_image_url}></AlbumCover>
                                    <MusicInfo>
                                        <MusicTitle>{game.music_name}</MusicTitle>
                                        <p>{game.music_singer}</p>
                                    </MusicInfo>
                                </Left>
                                <Right>
                                    <UserGameHistoryPieCharts key={game.music_id} game={game} />
                                    <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                                </Right>
                            </MusicCard>
                        ))
                    ) : (
                        <div>No game history</div>
                    )}
                </CardContainer>
                <ScoreInfo musicId={selected}></ScoreInfo>
            </Section>
        </Container>
    );
}

const Container = styled.main`
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

const UserGameHistoryPieCharts = ({ game }: { game: UserGameHistory }) => {
    return (
        <>
            <PieChart width={50} height={40}>
                <Pie
                    data={[
                        { name: 'score', value: game.user_music_best_score },
                        { name: 'total', value: game.music_total_score - game.user_music_best_score }
                    ]}
                    dataKey="value"
                    cx={25}
                    cy={15}
                    innerRadius={15}
                    outerRadius={20}
                    startAngle={90}
                    endAngle={-270}
                    // fill="#27FD1C"
                    stroke="none"
                >
                    <Label
                        value={`${game.user_music_best_score}`}
                        position="center"
                        fill="#fff"
                        fontSize={12}
                        fontWeight={600}
                        // color={'#27FD1C'}
                    />
                    <Cell key={`cell-0`} fill={COLORS[0]} />
                    <Cell key={`cell-1`} fill={COLORS[1]} />
                </Pie>
            </PieChart>
        </>
    );
};

const COLORS = ['#27FD1C', 'rgba(255, 255, 255, 0.5)'];

const Section = styled.section`
    display: flex;
    height: 100%;
    padding: 1rem;
`;
const CardContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.5rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 1rem;
    border-radius: 20px;
`;

interface MusicCardProps {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const MusicCard = styled.div<MusicCardProps>`
    display: flex;
    border-radius: 10px;
    max-height: 15%;
    background-color: ${(props) => (props.selected ? props.theme.pink : 'rgba(254, 35, 255, 0.3)')};
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    justify-content: space-between;
    align-items: center;
    h3 {
        font-size: 1.5rem;
        margin: 3px 0;
    }
    cursor: pointer;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
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
        font-size: 0.6rem;
    }
`;

const MusicTitle = styled.p`
    margin: 5px 0;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
`;
