import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/tropy.json';

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
    return <div ref={lottieRef} style={{ background: '#906f8c', borderRadius: '10px', marginLeft:'20px' }} />;
};

export default Tropy;
