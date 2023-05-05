import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentSlide from './ContentSlide';
import MusicModal from './MusicModal';
import { Music } from '../../../interface';
import { useGetMusicInfo } from '../../../api/useGetMusicInfo';
export interface ContentProps {
    musicList: Music[];
}

const Content = ({ musicList }: ContentProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalId, setModalId] = useState('' as string);
    const [musicDetailInfo, setMusicDetailInfo] = useState<Music>({} as Music);
    const handleModal = (e: any) => {
        setModalId(e.target.id);
        setModalOpen(!modalOpen);
    };

    const musicDetail = useGetMusicInfo();
    console.log(modalId);
    useEffect(() => {
        if (modalOpen) {
            musicDetail.map((item) => {
                if (item.music_name === modalId) {
                    setMusicDetailInfo(item);
                }
            });
        }
    }, [modalOpen]);

    return (
        <Wrapper>
            <ContentSlide handleModal={handleModal} musicList={musicList} setModalOpen={setModalOpen} />
            <MusicModal handleModal={handleModal} modalOpen={modalOpen} musicDetailInfo={musicDetailInfo} />
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
