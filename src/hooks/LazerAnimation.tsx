import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const numLasers = 250;
const tail = 400;

const createLasers = (n: any) => {
    const lasers = [];
    for (let i = 0; i < n; ++i) {
        lasers.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            s: Math.random() * 2 + 1
        });
    }
    return lasers;
};

const LaserAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lasersRef = useRef(createLasers(numLasers));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        const ctx = canvas.getContext('2d');

        const renderLaser = (l: any) => {
            if (ctx === null) return;
            const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + tail);
            const a = 1 - ((canvas.height - l.y) / canvas.height) * 0.8;
            grad.addColorStop(0, `hsla(340,100%,100%,${a})`);
            grad.addColorStop(1, 'hsla(340,100%,50%,0)');
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(l.x, l.y + tail);
            ctx.stroke();
        };

        const updateLaser = (l: any) => {
            l.y -= l.s;
            if (l.y < -tail) {
                l.y = window.innerHeight;
            }
        };

        const render = (lasers: any) => {
            if (ctx === null) return;
            ctx.fillStyle = 'hsl(261,43%,7%)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            for (let l of lasers) {
                renderLaser(l);
                updateLaser(l);
            }
            requestAnimationFrame(() => render(lasers));
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lasersRef.current = createLasers(numLasers);
        };

        window.addEventListener('resize', handleResize);

        const animationId = requestAnimationFrame(() => render(lasersRef.current));

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <LaserCanvas ref={canvasRef} />;
};
const LaserCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export default LaserAnimation;
