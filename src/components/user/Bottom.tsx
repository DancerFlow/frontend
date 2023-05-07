import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Music } from '../../interface';

export default function Bottom() {
    return (
        <Container>
            <SectionTitle>Liked Playlists</SectionTitle>
            <LikedContainer>
                <FontAwesomeIcon icon={faChevronLeft} />
                <LikedItems data={data}></LikedItems>
                <ChevronIcon icon={faChevronRight} />
            </LikedContainer>
        </Container>
    );
}

const Container = styled.main`
    grid-area: bottom;
    background-color: rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
    margin: 1rem 0 0 1rem;
    font-size: 1rem;
    text-align: start;
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

const LikedItems = ({ data }: { data: Music[] }) => {
    return (
        <LikedList>
            {data.map((item, index) => (
                <LikedItem key={index}>
                    <LikedItemImg src={item.music_image_url} alt={item.music_name} />
                    <LikedItemName>{item.music_name}</LikedItemName>
                    <LikedItemSinger>{item.music_singer}</LikedItemSinger>
                </LikedItem>
            ))}
        </LikedList>
    );
};

const data: Music[] = [
    {
        music_name: 'bad boy',
        music_image_url:
            'https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg',
        music_singer: 'red velvet'
    },
    {
        music_name: 'Sunday Night Drive',
        music_image_url:
            'https://lh3.googleusercontent.com/NmlKI9pzrI6dtC9yKxwZxR5LVyzM5krQCrhjSeIrziKvfFYLxyFviMKNKoO4ixsGx-_eXKL08NYnfyEz7w=w544-h544-l90-rj',
        music_singer: 'Jay Park'
    },
    {
        music_name: 'Shoong! (feat. LISA of BLACKPINK)',
        music_image_url:
            'https://lh3.googleusercontent.com/JIO2pp9Y3a0-9HP69aZ8xH4hiOv6c1soiV40kuP9HuKTQf9qStqTXzFJi9K96wWKLnoukexoau2U3ldu=w544-h544-l90-rj',
        music_singer: 'TAEYANG'
    }
];
