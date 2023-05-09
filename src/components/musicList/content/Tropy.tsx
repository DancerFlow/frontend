import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/tropy.json';
import styled from 'styled-components';
const Tropy = () => {
    const lottieRef = useRef(null);

    useEffect(() => {
        const animation = Lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
                // SVG의 크기를 조정할 width와 height 값 추가
                width: 100,
                height: 100
            }
        });
        return () => {
            animation.destroy();
        };
    }, []);
    return <Container ref={lottieRef} />;
};
const Container = styled.div`
    background-color: ${(props) => props.theme.modal.content};
    border-radius: 10px;
    margin-left: 20px;
`;

export default Tropy;
