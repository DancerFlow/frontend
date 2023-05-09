import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/startBtn.json';

const StartBtn = () => {
    const lottieRef = useRef(null);

    useEffect(() => {
        const animation = Lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
        return () => {
            animation.destroy();
        };
    }, []);

    return <div ref={lottieRef} />;
};

export default StartBtn;
