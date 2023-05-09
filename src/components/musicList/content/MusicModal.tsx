import MusicModalContent from './MusicModalContent';
import { useGetMusicDetailQuery } from '../../../api/useGetMusicDetailQuery';

interface ModalInfoProps {
    opened: boolean;
    onClose: () => void;
    selected_music_id: number;
}

const MusicModal = ({ opened, selected_music_id, onClose }: ModalInfoProps) => {
    const { data: musicDetail } = useGetMusicDetailQuery(selected_music_id, {
        enabled: Boolean(selected_music_id)
    });
    if (!musicDetail || musicDetail?.length === 0) {
        return null;
    }

    return <MusicModalContent onModalClose={onClose} onModalOpen={opened} musicDetailInfo={musicDetail} />;
};

export default MusicModal;
