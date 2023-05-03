import ModalFrame from './ModalFrame';
import styled from 'styled-components';
interface ModalFrameProps {
    modalOpen: boolean;
    handleModal: () => void;
}

const MusicModal = ({ handleModal, modalOpen }: ModalFrameProps) => {
    return (
        <ModalFrame handleModal={handleModal} modalOpen={modalOpen}>
            <MusicModalInfo>
                <MusicModalInfoHeader />
                <MusicModalInfoContent />
                <MusicModalFooter />
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

const MusicModalInfoHeader = styled.div`
    width: 100%;
    height: 45%;
    background-color: red;
`;

const MusicModalInfoContent = styled.div`
    width: 100%;
    height: 40%;
    background-color: blue;
`;

const MusicModalFooter = styled.div`
    width: 100%;
    height: 15%;
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
