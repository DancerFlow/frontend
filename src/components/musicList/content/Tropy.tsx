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
            animationData: animationData
        });
        return () => {
            animation.destroy();
        };
    }, []);
    return <div ref={lottieRef} style={{ width: '30%', background: '#906f8c', borderRadius: '10px',padding:"5px", marginTop:"10px" }} />;
};

export default Tropy;
