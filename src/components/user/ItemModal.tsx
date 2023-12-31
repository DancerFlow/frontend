import styled from 'styled-components';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Status } from '../../interface';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface ItemModalProps {
    onCloseModal: () => void;
    itemRefetch: () => void;
}
interface Image {
    id: number;
    url: string;
}

const images: Image[] = [];
for (let i = 1; i <= 24; i++) {
    images.push({ id: i, url: `/items/${i}.png` });
}

export default function ItemModal({ onCloseModal, itemRefetch }: ItemModalProps) {
    const mutationItem = useMutation(
        async (itemId: number) => {
            const response = await axios.patch(`${baseUrl}/user/item/${itemId}`, null, { withCredentials: true });
            return response.data;
        },
        {
            onSuccess: () => {
                // 아이템 다시 refetch하기
                onCloseModal();
                itemRefetch();
            },

            onError: (error: AxiosError<Status>) => {
                alert(error.response?.data.message);
            }
        }
    );

    const handleItemClick = (itemId: number) => {
        console.log('clickeditem', itemId);
        mutationItem.mutate(itemId);
    };

    const [slideIndex, setSlideIndex] = useState<number>(0);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(images.length / itemsPerPage); //24.6 =>4page

    const handlePrevSlide = (): void => {
        setSlideIndex((prevIndex) => (prevIndex - itemsPerPage < 0 ? prevIndex + images.length - itemsPerPage : prevIndex - itemsPerPage));
    };

    const handleNextSlide = (): void => {
        setSlideIndex((prevIndex) => (prevIndex + itemsPerPage > images.length - itemsPerPage ? 0 : prevIndex + itemsPerPage));
    };

    const visibleImages = images.slice(slideIndex, slideIndex + itemsPerPage); //image를 0~6개로 자른다 // 6
    console.log('visibleImages', visibleImages);

    return (
        <>
            <ModalBackground onClick={onCloseModal} />
            <Container>
                <Section>
                    <Title>Select Your Character</Title>
                    <ImageContainer>
                        <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevSlide} color="white" style={{ fontSize: '24px' }} />
                        <ImageGrid>
                            {visibleImages.map((image) => (
                                <ImageItem key={image.id} src={image.url} alt="image" onClick={() => handleItemClick(image.id)} />
                            ))}
                        </ImageGrid>
                        <FontAwesomeIcon icon={faChevronRight} onClick={handleNextSlide} color="white" style={{ fontSize: '24px' }} />
                    </ImageContainer>
                    <Pagination>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationIndicator
                                key={index}
                                active={index === Math.floor(slideIndex / itemsPerPage)}
                                onClick={() => setSlideIndex(index * itemsPerPage)}
                            />
                        ))}
                    </Pagination>
                </Section>
            </Container>
        </>
    );
}
const ModalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    background-color: #00000042;
`;
const Container = styled.div`
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 700px;
    height: 450px;
`;

const Title = styled.h1`
    display: flex;
    color: ${(props) => props.theme.green};
    margin-bottom: 2rem;
    font-size: 2rem;
`;
const Section = styled.div`
    display: flex;
    background-color: #000;
    width: 500px;
    height: 400px;
    flex-direction: column;
    align-items: center;
    border: 3px solid ${(props) => props.theme.green};
    border-radius: 10px;
    padding: 2rem 4rem;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    padding: 0 3rem;
`;

const ImageItem = styled.img`
    width: 100px;
    height: 140px;
    object-fit: cover;
`;

const Pagination = styled.div`
    display: flex;
    margin-top: 1rem;
`;

const PaginationIndicator = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: ${(props) => (props.active ? props.theme.green : 'gray')};
`;
