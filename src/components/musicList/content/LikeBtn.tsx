import React, { useState } from 'react';
import styled from 'styled-components';
interface Props {
    onClick: () => void;
}

const LikeBtn: React.FC<Props> = ({ onClick }) => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
        onClick();
    };

    return (
        <LikeController>
            <button onClick={handleClick} style={{ backgroundColor: liked ? 'green' : 'gray', color: 'white' }}>
                Like
            </button>
        </LikeController>
    );
};

const LikeController = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    position: absolute;
    top: 1;
    left: 0;
    border-radius: 10px;
`;

export default LikeBtn;
