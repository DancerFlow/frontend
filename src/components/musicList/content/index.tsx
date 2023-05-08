import { useState } from 'react';
import styled from 'styled-components';
import ContentSlide from './ContentSlide';
import MusicModal from './MusicModal';
import { Music } from '../../../interface';
export interface ContentProps {
    musicList: Music[];
}

const Content = ({ musicList }: ContentProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [musicDetailInfo, setMusicDetailInfo] = useState<Music>({} as Music);

    const handleModalToggle = (data?: Music) => {
        setIsOpenModal(!isOpenModal);
        if (data) {
            setMusicDetailInfo(data);
        }
    };

    return (
        <Wrapper>
            <ContentSlide onMusicClick={handleModalToggle} musicList={musicList} onModalClose={setIsOpenModal} />
            <MusicModal onModalClose={handleModalToggle} onModalOpen={isOpenModal} musicDetailInfo={musicDetailInfo} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Content;
