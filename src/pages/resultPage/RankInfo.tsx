import styled from 'styled-components';
import { Music } from '../../interface';

export default function RankInfo() {
    return (
        <Section>
            <MusicInfo>
                <Img src={data.music_image_url}></Img>
                <div>
                    <Title>{data.music_name}</Title>
                    <div>{data.music_singer}</div>
                </div>
            </MusicInfo>
        </Section>
    );
}

const RankingList = ({ rankers }) => {
    return (
        <ul>
            {rankers.map((ranker, index) => (
                <li key={ranker.id}>{`${index + 1}. ${ranker.name} - ${ranker.score}`}</li>
            ))}
        </ul>
    );
};

const Section = styled.section``;

const MusicInfo = styled.div`
    display: flex;
    margin-top: 3rem;

    div {
        text-align: start;
        margin-left: 0.5rem;
    }
`;

const data: Music = {
    music_name: 'Bad boy',
    music_image_url:
        'https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg',
    music_singer: 'red velvet'
};

const Img = styled.img`
    width: 6rem;
    height: auto;
`;

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;
