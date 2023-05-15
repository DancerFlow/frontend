import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/startBtn.json';

const StartBtn = () => {
    const lottieRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!lottieRef.current) return;
        const animation = Lottie.loadAnimation({
            container: lottieRef.current,
            renderer: 'svg',
            loop: true,
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

    return <div ref={lottieRef as React.RefObject<HTMLDivElement>} style={{ cursor: 'pointer' }} />;
};

export default StartBtn;
