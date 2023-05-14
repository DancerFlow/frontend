import React, { useState } from 'react';
import styled from 'styled-components';
import { usePatchMusicLikeMutation } from '../../../api/usePatchMusicLikeMutation';
import { useDeleteMusicLikeMutation } from '../../../api/useDeleteMusicLikeMutation';
interface Props {
    onClick: () => void;
}

const LikeBtn: React.FC<Props> = ({ onClick, isLiked, musicId, musicDetailInfo }) => {
    const [liked, setLiked] = useState(isLiked);

    const patchMusicLikeMutation = usePatchMusicLikeMutation(musicId);
    const deleteMusicLikeMutation = useDeleteMusicLikeMutation(musicId);

    const handleClick = () => {
        if (liked) {
            deleteMusicLikeMutation.mutate();
            setLiked(false);
        } else {
            patchMusicLikeMutation.mutate();
            setLiked(true);
        }
        onClick();
    };

    return (
        <LikeController>
            <button onClick={handleClick} style={{ backgroundColor: liked ? 'green' : 'gray', color: 'white' }}>
                {liked ? 'Liked' : 'Like'}
            </button>
            <p>Likes: {musicDetailInfo.likes}</p>
        </LikeController>
    );
};

const LikeController = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 50px;
    /* position: absolute;
    top: 1;
    left: 0; */
    border-radius: 10px;
`;

export default LikeBtn;
