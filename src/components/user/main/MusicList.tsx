import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { UserGameHistory } from '../../../interface';

export default function MusicList() {
    return (
        <Container>
            {data.map((game: UserGameHistory, index) => (
                <Card>
                    <Left>
                        <AlbumCover src={game.music_image_url}></AlbumCover>
                        <MusicInfo>
                            <MusicTitle>{game.music_name}</MusicTitle>
                            <p>{game.music_singer}</p>
                        </MusicInfo>
                    </Left>
                    <Right>
                        <UserGameHistoryPieCharts key={index} game={game} />
                        <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                    </Right>
                </Card>
            ))}
        </Container>
    );
}

const COLORS = ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)'];

const data: UserGameHistory[] = [
    {
        music_name: 'Bad boy',
        music_image_url:
            'https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg',
        music_singer: 'Red velvet',
        user_music_best_score: 255,
        music_total_score: 300
    },
    {
        music_name: 'Sunday Night Drive',
        music_image_url:
            'https://lh3.googleusercontent.com/NmlKI9pzrI6dtC9yKxwZxR5LVyzM5krQCrhjSeIrziKvfFYLxyFviMKNKoO4ixsGx-_eXKL08NYnfyEz7w=w544-h544-l90-rj',
        music_singer: 'Jay Park',
        user_music_best_score: 150,
        music_total_score: 200
    },

    {
        music_name: 'Shoong! (feat. LISA of BLACKPINK)',
        music_image_url:
            'https://lh3.googleusercontent.com/JIO2pp9Y3a0-9HP69aZ8xH4hiOv6c1soiV40kuP9HuKTQf9qStqTXzFJi9K96wWKLnoukexoau2U3ldu=w544-h544-l90-rj',
        music_singer: 'TAEYANG',
        user_music_best_score: 150,
        music_total_score: 200
    },

    {
        music_name: 'You & Me (Flume Remix) (feat. Eliza Doolittle)',
        music_image_url:
            'https://lh3.googleusercontent.com/2UTUgzceFC44xJOGOkvGMpHLBklqtlkRuJIY8RmJBE5XHQm9JmkuSRmecD3FVmua_3Ksz2SN8MzU9V0=w544-h544-l90-rj',
        music_singer: 'Disclosure',
        user_music_best_score: 177,
        music_total_score: 230
    },

    {
        music_name: 'You & Me (Flume Remix) (feat. Eliza Doolittle)',
        music_image_url:
            'https://lh3.googleusercontent.com/2UTUgzceFC44xJOGOkvGMpHLBklqtlkRuJIY8RmJBE5XHQm9JmkuSRmecD3FVmua_3Ksz2SN8MzU9V0=w544-h544-l90-rj',
        music_singer: 'Disclosure',
        user_music_best_score: 177,
        music_total_score: 230
    }
];

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.5rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    flex: 3;
    margin-right: 1rem;
`;

const Card = styled.div`
    display: flex;
    border-radius: 10px;
    max-height: 40px;
    background-color: ${(props) => props.theme.pink};
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    justify-content: space-between;
    align-items: center;
    h3 {
        font-size: 1.5rem;
        margin: 3px 0;
    }
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
        font-size: 0.8rem;
    }
`;

const MusicTitle = styled.p`
    margin: 5px 0;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
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
                    fill="rgba(255, 255, 255, 0.5)"
                    stroke="none"
                >
                    <Label
                        value={`${game.user_music_best_score}`}
                        position="center"
                        fill="#000"
                        fontSize={12}
                        fontWeight={600}
                        color={'#fff'}
                    />
                    <Cell key={`cell-0`} fill={COLORS[0]} />
                    <Cell key={`cell-1`} fill={COLORS[1]} />
                </Pie>
            </PieChart>
        </>
    );
};
