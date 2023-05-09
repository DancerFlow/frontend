import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentSlide from './ContentSlide';
import MusicModal from './MusicModal';
import { Music } from '../../../interface';
import { useGetMusicDetailQuery } from '../../../api/useGetMusicDetailQuery';

export interface ContentProps {
    musicList: Music[];
}

const Content = ({ musicList }: ContentProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [musicDetailInfo, setMusicDetailInfo] = useState<Music | null>(null);
    const [musicId, setMusicId] = useState<number>(1);

    const { data: musicDetail } = useGetMusicDetailQuery(musicId);

    useEffect(() => {
        if (musicDetail) {
            setMusicDetailInfo(musicDetail);
        }
    }, [musicDetail]);

    const handleModalToggle = async (musicId: number) => {
        setIsOpenModal(!isOpenModal);
        if (musicId) {
            setMusicId(musicId);
        }
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };
    return (
        <Wrapper>
            <ContentSlide onMusicClick={handleModalToggle} musicList={musicList} onModalClose={setIsOpenModal} />
            {musicDetailInfo ? (
                <MusicModal onModalClose={handleModalClose} onModalOpen={isOpenModal} musicDetailInfo={musicDetailInfo} />
            ) : null}
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
