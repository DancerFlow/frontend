import { Music } from '../../../interface';
import ModalFrame from '../../common/ModalFrame';
import styled from 'styled-components';
interface ModalFrameProps {
    onModalOpen: boolean;
    onModalClose: () => void;
    musicDetailInfo: Music;
}

const MusicModal = ({ onModalClose, onModalOpen, musicDetailInfo }: ModalFrameProps) => {
    return (
        <ModalFrame onClose={onModalClose} isOpened={onModalOpen}>
            <MusicModalInfo>
                <MusicModalInfoHeader img={musicDetailInfo.music_image_url} />
                <MusicModalInfoContent>
                    <div className="header">
                        <div className="title">
                            <h1>{musicDetailInfo.music_name}</h1>
                        </div>
                        <div className="artist">
                            <h2>{musicDetailInfo.music_singer}</h2>
                        </div>
                    </div>
                    <div className="description">
                        <h1>{musicDetailInfo.music_description}</h1>
                    </div>
                </MusicModalInfoContent>
                <MusicModalFooter>
                    <div className="footer">
                        <div className="playBtn">
                            <h1>Play</h1>
                        </div>
                    </div>
                </MusicModalFooter>
            </MusicModalInfo>
            <MusicModalRank>
                <MusicModalRankHeader />
                <MusicModalRankContent />
            </MusicModalRank>
        </ModalFrame>
    );
};

const MusicModalInfo = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid black;
`;

interface MusicModalInfoHeaderProps {
    img: string;
}

const MusicModalInfoHeader = styled.div<MusicModalInfoHeaderProps>`
    width: 100%;
    height: 55%;
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
    background-color: yellow;
`;

const MusicModalRank = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid red;
`;

const MusicModalRankHeader = styled.div`
    width: 100%;
    height: 20%;
    background-color: red;
`;

const MusicModalRankContent = styled.div`
    width: 100%;
    height: 80%;
    background-color: blue;
`;

export default MusicModal;
