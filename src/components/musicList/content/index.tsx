import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentSlide from './ContentSlide';
import { Music } from '../../../interface';
import MusicModal from './MusicModal';

export interface ContentProps {
    musicList: Music[];
}

const Content = ({ musicList, musicSearchList }: ContentProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [musicId, setMusicId] = useState<number | undefined>();

    const handleModalOpen = async (musicId: number) => {
        setIsOpenModal(!isOpenModal);
        await setMusicId(musicId);
    };

    const handleModalClose = () => {
        setMusicId(undefined);
        setIsOpenModal(false);
    };
    return (
        <>
            {musicList?.length ? (
                <Wrapper>
                    <ContentSlide
                        onMusicClick={handleModalOpen}
                        musicList={musicList}
                        musicSearchList={musicSearchList}
                        onModalClose={setIsOpenModal}
                    />
                    <MusicModal opened={isOpenModal} selected_music_id={musicId} onClose={handleModalClose} />
                </Wrapper>
            ) : null}
        </>
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
