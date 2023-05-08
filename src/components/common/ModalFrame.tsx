import React from 'react';
import styled from 'styled-components';

interface ModalFrameProps {
    isOpened: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalFrame = ({ onClose, children, isOpened, ...rest }: ModalFrameProps) => {
    return (
        <>
            {isOpened && (
                <Container>
                    <Background onClick={onClose} />
                    <ModalBlock {...rest}>
                        <Close onClick={onClose} />
                        <Contents>{children}</Contents>
                    </ModalBlock>
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    animation: modal-bg-show 0.5s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalBlock = styled.div`
    position: absolute;
    top: 6.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: white;
    width: 40rem;
    @media (max-width: 1120px) {
        width: 50rem;
    }
    @media (max-width: 50rem) {
        width: 80%;
    }
    min-height: 35rem;
    animation: modal-show 1s;
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
`;

const Close = styled.img.attrs({
    src: '#'
})`
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    cursor: pointer;
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 600px;
`;

export default ModalFrame;
