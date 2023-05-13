import React from 'react';
import { useTexture } from '@react-three/drei';
import grid from './material/grid.png';
import * as THREE from 'three';

export default function Floor({ setDestinatioPoint }) {
    const texture = useTexture(grid);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 1;
    texture.repeat.y = 1;

    const handleFloorClick = (e) => {
        e.stopPropagation();
        const { x, y, z } = e.point;
        setDestinatioPoint([x, y, z]);
        console.log(e.point);
    };

    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -2, 0]} receiveShadow onClick={(e) => handleFloorClick(e)}>
            <boxBufferGeometry args={[30, 30, 2, 1, 1, 1]} />
            <shadowMaterial transparent opacity={0.2} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}
