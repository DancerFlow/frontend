import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from '../../../assets/rankingBanner.json';

const RankingBanner = () => {
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
                // SVG의 크기를 조정할 width와 height 값 추가
            }
        });
        return () => {
            animation.destroy();
        };
    }, []);
    return <div ref={lottieRef as React.RefObject<HTMLDivElement>} />;
};

export default RankingBanner;
