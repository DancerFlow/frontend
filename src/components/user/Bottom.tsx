import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useGetUserLikesQuery } from '../../api/useGetUserLikesQuery';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ItemModal from './ItemModal';
import ReactDOM from 'react-dom';
// import images from '../../../public/models/items';
import { useGetUserItemQuery } from '../../api/useGetUserItem';

interface Image {
    id: number;
    url: string;
}

const images: Image[] = [];
for (let i = 1; i <= 24; i++) {
    images.push({ id: i, url: `/items/${i}.png` });
}

export default function Bottom() {
    const [pageNo, setPageNo] = useState(1);
    const { data: userLikeswithMaxPage, isLoading: isUserLikesLaoading, isError: isUserLikesError } = useGetUserLikesQuery(pageNo);
    const { data: item, refetch: itemRefetch, isLoading: isItemLoading, isError: isItemError } = useGetUserItemQuery();

    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsItemModalOpen(true);
    };

    const handleModalClose = () => {
        setIsItemModalOpen(false);
    };

    const { userLikes, maxPage } = userLikeswithMaxPage || { userLikes: [], maxPage: 0 };

    const handlePrevPage = () => {
        setPageNo((prevPageNo) => Math.max(prevPageNo - 1, 1));
    };

    const handleNextPage = () => {
        setPageNo((prevPageNo) => Math.min(prevPageNo + 1, maxPage));
    };

    return (
        <Container>
            <LikedMusic>
                <SectionTitle>Liked Playlists</SectionTitle>
                <LikedContainer>
                    {maxPage > 1 && <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevPage} />}
                    <LikedList>
                        {isUserLikesLaoading ? (
                            <ClipLoader color="#FE23FF"></ClipLoader>
                        ) : isUserLikesError ? (
                            <div>Error loading liked playlists</div>
                        ) : userLikes && userLikes.length ? (
                            userLikes.map((like) => (
                                <LikedItem key={like.id}>
                                    <LikedItemImg src={like.music.album_image_url} alt={like.music.name} />
                                    <LikedItemName>{like.music.name}</LikedItemName>
                                    <LikedItemSinger>{like.music.music_singer.name}</LikedItemSinger>
                                </LikedItem>
                            ))
                        ) : (
                            <div>No liked playlists</div>
                        )}
                    </LikedList>
                    {maxPage > 1 && <ChevronIcon icon={faChevronRight} onClick={handleNextPage} />}
                </LikedContainer>
                {userLikes?.length > 0 && (
                    <PageNo>
                        {pageNo}/{maxPage}
                    </PageNo>
                )}
            </LikedMusic>
            <ItemBox>
                <ItemSelect onClick={handleModalOpen}>Select an Item</ItemSelect>

                {isItemLoading ? (
                    <ClipLoader color="#FE23FF" />
                ) : isItemError ? (
                    <div>Error loading item</div>
                ) : (
                    images[item?.id - 1] && <ItemPreview src={images[item?.id - 1].url} alt="item" onClick={handleModalOpen} />
                )}

                {isItemModalOpen &&
                    ReactDOM.createPortal(
                        <ItemModal onCloseModal={handleModalClose} itemRefetch={itemRefetch} />,
                        document.getElementById('modal-root') as HTMLElement
                    )}
            </ItemBox>
        </Container>
    );
}

const Container = styled.main`
    grid-area: bottom;
    /* max-height: 200px; */
    display: flex;
`;

const LikedMusic = styled.section`
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    background-color: rgba(255, 255, 255, 0.1);
    margin-right: 1rem;
    border-radius: 20px;
`;

const ItemBox = styled.section`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    flex-basis: 40%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
`;

const ItemSelect = styled.button`
    margin-top: 1rem;
    border-style: none;
    background-color: ${(props) => props.theme.green};
    cursor: pointer;
`;
const ItemPreview = styled.img`
    border-radius: 50%;
    width: 100px;
    cursor: pointer;
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
    justify-content: space-between;
    margin-top: 10px;
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
    font-size: 0.5rem;
    text-align: left;
`;

const PageNo = styled.div`
    font-size: 0.7rem;
    color: ${(props) => props.theme.green};
`;
