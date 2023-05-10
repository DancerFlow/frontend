import React from 'react';
import { useTexture } from '@react-three/drei';
import grid from './material/grid.png';
import * as THREE from 'three';

export default function Background() {
    const texture = useTexture(grid);

    texture.repeat.x = 1;
    texture.repeat.y = 1;

    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -10, -0]}>
            <planeBufferGeometry args={[300, 300, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    );
}
