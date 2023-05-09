import { Music } from '../../../interface';
import ModalFrame from '../../common/ModalFrame';
import styled from 'styled-components';
import StartBtn from './StartBtn';
import Tropy from './Tropy';
import TopRankingUI from './TopRanking';

interface ModalFrameProps {
    onModalOpen: boolean;
    onModalClose: () => void;
    musicDetailInfo: Music;
}

const MusicModal = ({ onModalClose, onModalOpen, musicDetailInfo }: ModalFrameProps) => {
    console.log(musicDetailInfo[0]);
    return (
        <ModalFrame onClose={onModalClose} isOpened={onModalOpen}>
            <MusicModalInfo>
                <MusicModalInfoHeader img={musicDetailInfo[0].album_image_url} />
                <MusicModalInfoContent>
                    <div className="header">
                        <div className="title">
                            <h1>{musicDetailInfo[0].name}</h1>{' '}
                        </div>
                        <div className="artist">
                            <h2>{musicDetailInfo[0].music_singer.name}</h2>
                        </div>
                    </div>
                    <div className="description">
                        <h1>{musicDetailInfo[0].description}</h1>
                    </div>
                </MusicModalInfoContent>
                <MusicModalFooter>
                    <div className="startBtn">
                        <StartBtn key={musicDetailInfo[0].id} />
                    </div>
                </MusicModalFooter>
            </MusicModalInfo>
            <MusicModalRank>
                <MusicModalRankHeader>
                    <div className="Tropy">
                        <Tropy />
                    </div>
                </MusicModalRankHeader>
                <MusicModalRankContent>
                    <div className="rankList">
                        <TopRankingUI />
                    </div>
                </MusicModalRankContent>
            </MusicModalRank>
        </ModalFrame>
    );
};

const MusicModalInfo = styled.div`
    width: 50%;
    height: 100%;
    background-color: #81607b;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

interface MusicModalInfoHeaderProps {
    img: string;
}

const MusicModalInfoHeader = styled.div<MusicModalInfoHeaderProps>`
    width: 100%;
    height: 50%;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center;
`;

const MusicModalInfoContent = styled.div`
    width: 100%;
    height: 35%;
`;

const MusicModalFooter = styled.div`
    width: 100%;
    height: 10%;

    .startBtn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;

const MusicModalRank = styled.div`
    width: 50%;
    height: 100%;
    background-color: #81607b;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const MusicModalRankHeader = styled.div`
    width: 100%;
    height: 20%;

    .Tropy {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const MusicModalRankContent = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    .rankList {
        width: 90%;
        height: 90%;
        background-color: #906f8c;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export default MusicModal;
