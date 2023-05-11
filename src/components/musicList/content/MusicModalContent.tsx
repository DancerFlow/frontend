import { Music } from '../../../interface';
import ModalFrame from '../../common/ModalFrame';
import styled from 'styled-components';
import StartBtn from './StartBtn';
import Tropy from './Tropy';
import TopRanking from './TopRanking';
import LikeBtn from './LikeBtn';
import { useNavigate } from 'react-router-dom';
interface ModalFrameProps {
    onModalOpen: boolean;
    onModalClose: () => void;
    musicDetailInfo: Music;
}

const MusicModalContent = ({ onModalClose, onModalOpen, musicDetailInfo, musicRankInfo }: ModalFrameProps) => {
    const navigate = useNavigate();

    const onStartClick = () => {
        navigate(`/challenge/${musicDetailInfo.id}`);
    };

    return musicDetailInfo ? (
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
                        <div className="description-content">{musicDetailInfo.description}</div>
                    </div>
                </MusicModalInfoContent>
                <MusicModalFooter>
                    <LikeBtn />
                    <div onClick={onStartClick}>
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
                        <TopRanking rankingList={musicRankInfo} />
                    </div>
                </MusicModalRankContent>
            </MusicModalRank>
        </ModalFrame>
    ) : (
        null
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
    color: ${(props) => props.theme.modal.fontColorTwo};
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
            color: ${(props) => props.theme.modal.fontColorThree};

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
        flex-direction: column;
        align-items: flex-start;
        position: relative;

        .description-content {
            width: 80%;
            height: 80%;
            font-size: 1rem;
            overflow: auto;
            position: absolute;
            top: 10%;
            left: 0;
            right: 0;
            margin: auto;
            border: 1px solid ${(props) => props.theme.modal.container};
            border-radius: 10px;
        }
    }
`;

const MusicModalFooter = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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
