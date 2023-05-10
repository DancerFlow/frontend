import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/startBtn.json';
import { render } from 'react-dom';

const StartBtn = () => {
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
                width: 300,
                height: 100
            }
        });
        return () => {
            animation.destroy();
        };
    }, []);

    return <div ref={lottieRef} style={{ cursor: 'pointer'}} />;
};

export default StartBtn;
