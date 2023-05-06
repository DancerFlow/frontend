import { useState, useEffect } from 'react';
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

    const onSetModal = (e: any, data?: Music) => {
        setIsOpenModal(!isOpenModal);
        if (data) {
            setMusicDetailInfo(data);
        }
    };

    return (
        <Wrapper>
            <ContentSlide onClickMusic={onSetModal} musicList={musicList} onKeyModalClose={setIsOpenModal} />
            <MusicModal onClickModalClose={onSetModal} isOpenModal={isOpenModal} musicDetailInfo={musicDetailInfo} />
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
