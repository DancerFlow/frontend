import { useState } from 'react';
import styled from 'styled-components';
import ContentSlide from './components/ContentSlide';
import MusicModal from './components/MusicModal';

const Content = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModal = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <Wrapper>
            <ContentSlide handleModal={handleModal} />
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
