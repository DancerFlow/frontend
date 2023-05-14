import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UserLikes } from '../../interface';
import { useGetUserLikesQuery } from '../../api/useGetUserLikesQuery';

export default function Bottom() {
    const { data, isLoading, isError, error } = useGetUserLikesQuery();

    if (isLoading) {
        return <>loading...</>;
    }

    if (isError) {
        return <>error loading liked playlists</>;
    }

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

const LikedItems = ({ data }: { data: UserLikes[] | undefined }) => {
    return (
        <LikedList>
            {data?.length ? (
                data.map((item) => (
                    <LikedItem key={item.id}>
                        <LikedItemImg src={item.music.album_image_url} alt={item.music.name} />
                        <LikedItemName>{item.music.name}</LikedItemName>
                        <LikedItemSinger>{item.music.music_singer.name}</LikedItemSinger>
                    </LikedItem>
                ))
            ) : (
                <div>No liked playlists</div>
            )}
        </LikedList>
    );
};

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
    margin-top: 1rem;
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
