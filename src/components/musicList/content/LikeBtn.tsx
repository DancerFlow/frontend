import React, { useState } from 'react';
import styled from 'styled-components';
import { usePatchMusicLikeMutation } from '../../../api/usePatchMusicLikeMutation';
import { useDeleteMusicLikeMutation } from '../../../api/useDeleteMusicLikeMutation';
import { useQueryClient } from 'react-query';
import { useContext } from 'react';
import { GlobalContext } from '../../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onClick: () => void;
    isLiked: boolean;
    musicId: number;
    musicDetailInfo: any; // make sure to replace 'any' with the actual type
}

const LikeBtn: React.FC<Props> = ({ onClick, isLiked, musicId, musicDetailInfo }) => {
    const [liked, setLiked] = useState(isLiked);
    const { state } = useContext(GlobalContext);
    const queryClient = useQueryClient();
    const patchMusicLikeMutation = usePatchMusicLikeMutation(musicId, {
        onSuccess: () => {
            queryClient.invalidateQueries(['music', musicId]);
            queryClient.invalidateQueries(['userlikes']);

            setLiked(true);
        },
        onError: () => {}
    });
    const deleteMusicLikeMutation = useDeleteMusicLikeMutation(musicId, {
        onSuccess: () => {
            queryClient.invalidateQueries(['music', musicId]);
            queryClient.invalidateQueries(['userlikes']);
            setLiked(false);
        },
        onError: () => {
            alert('Error updating unlike status');
        }
    });

    const handleClick = () => {
        if (!state.userState.login) {
            window.alert('로그인이 필요합니다.');
            return;
        }
        if (liked) {
            deleteMusicLikeMutation.mutate();
        } else {
            patchMusicLikeMutation.mutate();
        }
        onClick();
    };

    return (
        <LikeController onClick={handleClick}>
            <FontAwesomeIcon
                icon={faHeart}
                size="xl"
                style={{
                    color: `
                ${liked ? '#fa22fb' : 'gray'}
                `
                }}
            />
            <p>{musicDetailInfo.likes}</p>
        </LikeController>
    );
};
const LikeController = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* position: absolute;
    top: 1;
    left: 0; */

    &:hover {
        cursor: pointer;
    }
`;

export default LikeBtn;
