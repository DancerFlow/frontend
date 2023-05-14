import React, { useState } from 'react';
import styled from 'styled-components';
import { usePatchMusicLikeMutation } from '../../../api/usePatchMusicLikeMutation';
import { useDeleteMusicLikeMutation } from '../../../api/useDeleteMusicLikeMutation';
import { useMutation, useQueryClient } from 'react-query';
interface Props {
    onClick: () => void;
    isLiked: boolean;
    musicId: number;
}

interface Props {
    onClick: () => void;
    isLiked: boolean;
    musicId: number;
    musicDetailInfo: any; // make sure to replace 'any' with the actual type
}

const LikeBtn: React.FC<Props> = ({ onClick, isLiked, musicId, musicDetailInfo }) => {
    const [liked, setLiked] = useState(isLiked);
    const queryClient = useQueryClient();
    const patchMusicLikeMutation = usePatchMusicLikeMutation(musicId, {
        onSuccess: () => {
            queryClient.invalidateQueries(['music', musicId]);
            queryClient.invalidateQueries(['userlikes', 1]);

            setLiked(true);
        },
        onError: () => {}
    });
    const deleteMusicLikeMutation = useDeleteMusicLikeMutation(musicId, {
        onSuccess: () => {
            queryClient.invalidateQueries(['music', musicId]);
            queryClient.invalidateQueries(['userlikes', 1]);
            setLiked(false);
        },
        onError: () => {
            alert('Error updating unlike status');
        }
    });

    const handleClick = () => {
        if (liked) {
            deleteMusicLikeMutation.mutate();
        } else {
            patchMusicLikeMutation.mutate();
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
