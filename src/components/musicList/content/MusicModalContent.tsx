import { Music } from '../../../interface';
import ModalFrame from '../../common/ModalFrame';
import styled from 'styled-components';
import StartBtn from './StartBtn';
import Tropy from './Tropy';
import TopRanking from './TopRanking';

interface ModalFrameProps {
    onModalOpen: boolean;
    onModalClose: () => void;
    musicDetailInfo: Music;
}

const MusicModalContent = ({ onModalClose, onModalOpen, musicDetailInfo }: ModalFrameProps) => {
    return (
        <ModalFrame onClose={onModalClose} isOpened={onModalOpen}>
            <MusicModalInfo>
                <MusicModalInfoHeader>
                    <MusicModalInfoImg img={musicDetailInfo.album_image_url} />
                </MusicModalInfoHeader>
                <MusicModalInfoContent>
                    <div className="header">
                        <div className="title">
                            <h1>{musicDetailInfo.name}</h1>{' '}
                        </div>
                        <div className="artist">
                            <h2>{musicDetailInfo.music_singer.name}</h2>
                        </div>
                    </div>
                    <div className="description">
                        <h1>{musicDetailInfo.description}</h1>
                    </div>
                </MusicModalInfoContent>
                <MusicModalFooter>
                    <div className="startBtn">
                        <StartBtn key={musicDetailInfo.id} />
                    </div>
                </MusicModalFooter>
            </MusicModalInfo>
            <MusicModalRank>
                <MusicModalRankHeader>
                    <Tropy />
                </MusicModalRankHeader>
                <MusicModalRankContent>
                    <div className="rankList">
                        <TopRanking />
                    </div>
                </MusicModalRankContent>
            </MusicModalRank>
        </ModalFrame>
    );
};

const MusicModalInfo = styled.div`
    width: 50%;
    height: 100%;
    background-color: ${(props) => props.theme.modal.container};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-left: 20px;
`;

interface MusicModalInfoHeaderProps {
    img: string;
}
const MusicModalInfoHeader = styled.div`
    width: 100%;
    height: 40%;
    background-color: ${(props) => props.theme.modal.content};
    border-radius: 10px;
`;

const MusicModalInfoImg = styled.div<MusicModalInfoHeaderProps>`
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center;
`;

const MusicModalInfoContent = styled.div`
    width: 100%;
    height: 35%;
    background-color: ${(props) => props.theme.modal.content};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .header {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 28px;
                font-weight: bold;
                margin: 0;
            }
        }

        .artist {
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            h2 {
                font-size: 20px;
                margin: 0;
            }
        }
    }

    .description {
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 18px;
            margin: 0;
            text-align: center;
        }
    }
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
    background-color: ${(props) => props.theme.modal.container};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const MusicModalRankHeader = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
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
        background-color: ${(props) => props.theme.modal.content};
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export default MusicModalContent;
