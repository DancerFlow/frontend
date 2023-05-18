import { Music } from '../../../interface';
import ModalFrame from '../../common/ModalFrame';
import styled from 'styled-components';
import Tropy from './Tropy';
import TopRanking from './TopRanking';
import LikeBtn from './LikeBtn';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface ModalFrameProps {
    onModalOpen: boolean;
    onModalClose: () => void;
    musicDetailInfo: Music;
    musicRankInfo: any;
    isLiked: boolean;
    mode: string | undefined;
}

const MusicModalContent = ({ onModalClose, onModalOpen, musicDetailInfo, musicRankInfo, isLiked, mode }: ModalFrameProps) => {
    const navigate = useNavigate();

    const onStartClick = () => {
        navigate(`/challenge/${musicDetailInfo.id}`);
    };
    console.log(mode, 'mode');

    console.log(musicDetailInfo, 'musicDetailInfo');
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

                    <MusicModalFooter>
                        <LikeBtn onClick={() => {}} isLiked={isLiked} musicId={musicDetailInfo.id} musicDetailInfo={musicDetailInfo} />

                        <div>
                            <FontAwesomeIcon icon={faPlay} size="xl" />
                            <p>{musicDetailInfo.played}</p>
                        </div>
                    </MusicModalFooter>
                    <GameStartBtn onClick={onStartClick} disabled={!musicDetailInfo.answer} aria-label="GAME START">
                        {musicDetailInfo.answer ? 'GAME START' : 'Coming Soon'}
                    </GameStartBtn>
                </MusicModalInfoContent>
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
    ) : null;
};

const MusicModalInfo = styled.div`
    width: 100%;
    height: 50%;
    background-color: ${(props) => props.theme.modal.container};
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-left: 20px;
`;

interface MusicModalInfoHeaderProps {
    img: string;
}
const MusicModalInfoHeader = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.modal.content};
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        -webkit-box-reflect: below 0 linear-gradient(transparent, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.034));
    }
`;

const MusicModalInfoImg = styled.div<MusicModalInfoHeaderProps>`
    width: 80%;
    padding-top: 80%;
    box-sizing: border-box;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.385);
`;

const MusicModalInfoContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.modal.content};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.modal.fontColorTwo};
    .header {
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #dddede;

            h1 {
                font-size: 28px;
                margin: 8px;
                font-family: 'NanumSquareNeoExtraBold';
            }
        }

        .artist {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${(props) => props.theme.pink};
            margin-bottom: 40px;

            h2 {
                font-size: 24px;
                font-family: 'NanumSquareNeoExtraBold';
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
        }
    }
`;

const MusicModalFooter = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    margin-bottom: 60px;
    svg {
        margin-bottom: 6px;
    }
`;

const GameStartBtn = styled.button<{ disabled: boolean }>`
    width: 150px;
    height: 40px;
    margin-top: 20px;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    background: ${(props) => (props.disabled ? 'grey' : props.theme.pink)};
    color: white;
    position: relative;
    transition: all 0.3s;
    position: absolute;
    bottom: 30px;
    font-family: 'NanumSquareNeoExtraBold';
    box-shadow: 0 0 16px rgb(0, 0, 0);
    &:hover {
        color: ${(props) => (!props.disabled ? props.theme.blue : 'white')};
        cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    }
`;

const MusicModalRank = styled.div`
    width: 100%;
    height: 50%;
    background-color: ${(props) => props.theme.modal.container};
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export default MusicModalContent;
