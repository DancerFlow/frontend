import MusicModalContent from './MusicModalContent';
import { useGetMusicDetailQuery } from '../../../api/useGetMusicDetailQuery';
import { useGetMusicRankingQuery } from '../../../api/useGetMusicRankingQuery';

interface ModalInfoProps {
    opened: boolean;
    onClose: () => void;
    selected_music_id: number;
}

const MusicModal = ({ opened, selected_music_id, onClose }: ModalInfoProps) => {
    const { data: musicDetail, isLoading: detailLoading } = useGetMusicDetailQuery(selected_music_id, {
        enabled: Boolean(selected_music_id)
    });

    const { data: musicRank, isLoading: rankLoading } = useGetMusicRankingQuery(selected_music_id, {
        enabled: Boolean(selected_music_id)
    });

    const loading = detailLoading || rankLoading;

    return (
        <>
            {loading ? (
                null
            ) : (
                <MusicModalContent onModalClose={onClose} onModalOpen={opened} musicDetailInfo={musicDetail} musicRankInfo={musicRank} />
            )}
        </>
    );
};

export default MusicModal;
