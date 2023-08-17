import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { Environment, Effects, useGLTF, Html } from '@react-three/drei';

// import Floor from './Floor';
// import Player from './Player';
// import Logo from './Logo';
// import Practice from './Practice';
// import Challenge from './Challenge';
// import Construction from './Construction';
// import Room from './Room';
const LazyFloor = Loadable(() => import('./Floor'));
const LazyPlayer = Loadable(() => import('./Player'));
const LazyLogo = Loadable(() => import('./Logo'));
const LazyPractice = Loadable(() => import('./Practice'));
const LazyChallenge = Loadable(() => import('./Challenge'));
const LazyConstruction = Loadable(() => import('./Construction'));
const LazyRoom = Loadable(() => import('./Room'));

import Loadable from '../../../components/common/Loadable';

const FLOOR_WIDTH = 30;
const FLOOR_HEIGHT = 30;
const FLOOR_CENTER = [0, -1, 0];

const CAMERA_PROPS = {
    position: [FLOOR_CENTER[0], FLOOR_CENTER[1] + 15, FLOOR_CENTER[2]],
    fov: 50,
    zoom: 40,
    left: -FLOOR_WIDTH / 2,
    right: FLOOR_HEIGHT / 2,
    top: FLOOR_HEIGHT / 2,
    bottom: -FLOOR_HEIGHT / 2,
    near: -1000,
    far: 1000
};

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

const Three = () => {
    const [destinationPoint, setDestinatioPoint] = useState([0, 0, -2]);
    const [playerAnimation, setPlayerAnimation] = useState(0);
    const [area, setArea] = useState(-1); // 0: practice, 1: challenge, 2: construction, 3: room
    const [isLoading, setIsLoading] = useState(true);
    const roomRef = useRef();

    const handlePlayerClick = throttle(() => {
        setPlayerAnimation(2);
    }, 1000);

    return (
        <Canvas orthographic={true} shadows camera={CAMERA_PROPS}>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 30, 10]}
                intensity={1}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                color="white"
            />

            <LazyFloor setDestinatioPoint={setDestinatioPoint} width={FLOOR_WIDTH} height={FLOOR_HEIGHT} center={FLOOR_CENTER} />
            <LazyConstruction area={area} />
            <LazyPractice area={area}></LazyPractice>
            <LazyRoom area={area} />
            <LazyChallenge area={area} />
            <LazyLogo />
            <LazyPlayer
                destinationPoint={destinationPoint}
                playerAnimation={playerAnimation}
                setPlayerAnimation={setPlayerAnimation}
                setArea={setArea}
                area={area}
            />
        </Canvas>
    );
};

export default Three;
