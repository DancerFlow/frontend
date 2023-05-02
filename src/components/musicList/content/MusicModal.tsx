import ModalFrame from '../../common/ModalFrame';

interface ModalFrameProps {
    modalOpen: boolean;
    handleModal: () => void;
}

const MusicModal = ({ handleModal, modalOpen }: ModalFrameProps) => {
    return (
        <ModalFrame handleModal={handleModal} modalOpen={modalOpen}>
            <h1>프로젝트 내용</h1>
        </ModalFrame>
    );
};

export default MusicModal;
