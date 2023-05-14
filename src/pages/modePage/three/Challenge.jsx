import React, { useEffect, useRef, useState } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

export default function Challenge({ area }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('/models/challenge.glb');
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const navigate = useNavigate();
    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, area === 1 ? 1 : 0.2, 0.1, 0.01);
        easing.damp(ref.current.position, 'y', area === 1 ? -1.3 : 1, 0.1, 0.01);
    });

    return (
        <group ref={ref} position={[-8, -1.3, -8]}>
            <primitive
                object={gltf.scene}
                scale={1.1}
                rotation={[0, 0.2 * Math.PI, 0]}
                castShadow
                receiveShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            ></primitive>
        </group>
    );
}