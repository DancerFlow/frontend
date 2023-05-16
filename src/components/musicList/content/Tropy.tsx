import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/tropy.json';
import styled from 'styled-components';
const Tropy = () => {
    const lottieRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!lottieRef.current) return;
        const animation = Lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        });
        return () => {
            animation.destroy();
        };
    }, []);
    return <Container ref={lottieRef} />;
};
const Container = styled.div`
    width: 34px;
    background-color: ${(props) => props.theme.modal.content};
    border-radius: 10px;
    margin-left: 20px;
`;

export default Tropy;
