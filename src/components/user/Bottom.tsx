import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useGetUserLikesQuery } from '../../api/useGetUserLikesQuery';
import { useState } from 'react';

export default function Bottom() {
    const [pageNo, setPageNo] = useState(1);
    const { data, isLoading, isError } = useGetUserLikesQuery(pageNo);

    if (isLoading) {
        return <>loading...</>;
    }

    if (isError) {
        return <>Error loading liked playlists</>;
    }

    const { userLikes, maxPage } = data;

    const handlePrevPage = () => {
        setPageNo((prevPageNo) => Math.max(prevPageNo - 1, 1));
    };

    const handleNextPage = () => {
        setPageNo((prevPageNo) => Math.min(prevPageNo + 1, maxPage));
    };

    return (
        <Container>
            <SectionTitle>Liked Playlists</SectionTitle>
            <LikedContainer>
                {maxPage > 1 && <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevPage} />}
                <LikedList>
                    {userLikes?.length ? (
                        userLikes.map((item) => (
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
                {maxPage > 1 && <ChevronIcon icon={faChevronRight} onClick={handleNextPage} />}
            </LikedContainer>
            <div>
                {pageNo}/{maxPage}
            </div>
        </Container>
    );
}

const Container = styled.main`
    grid-area: bottom;
    background-color: rgba(255, 255, 255, 0.1);
    /* max-height: 200px; */
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
    width: 4rem;
    height: 4rem;
`;

const LikedItemName = styled.div`
    margin-top: 0.5rem;
    font-size: 0.7rem;
    text-align: left;
    min-height: 30px;
`;
const LikedItemSinger = styled.div`
    font-size: 0.6rem;
    text-align: left;
`;
