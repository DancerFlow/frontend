import { useState } from 'react';
import styled from 'styled-components';
import ContentSlide from './ContentSlide';
import MusicModal from './MusicModal';
import { Music } from '../../../interface';

export interface ContentProps {
    musicList: Music[];
}

const Content = ({ musicList }: ContentProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModal = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <Wrapper>
            <ContentSlide handleModal={handleModal} musicList={musicList} />
            <MusicModal handleModal={handleModal} modalOpen={modalOpen} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Content;
