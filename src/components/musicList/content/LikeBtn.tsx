import React, { useState } from 'react';

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
        <button onClick={handleClick} style={{ backgroundColor: liked ? 'green' : 'gray', color: 'white' }}>
            Like
        </button>
    );
};

export default LikeBtn;
