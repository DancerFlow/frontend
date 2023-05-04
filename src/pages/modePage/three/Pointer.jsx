import React from 'react';
import { useTexture } from '@react-three/drei';
import grid from './source/images/grid.png';
import * as THREE from 'three';

export default function Pointer() {
    const texture = useTexture(grid);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 4;
    texture.repeat.y = 4;

    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[1, -0.99, 1]} receiveShadow>
            <planeBufferGeometry args={[2, 2, 1, 1]} />
            <shadowMaterial transparent opacity={0.2} />
            <meshStandardMaterial color="pink" transparent opacity={0.8} />
        </mesh>
    );
}
