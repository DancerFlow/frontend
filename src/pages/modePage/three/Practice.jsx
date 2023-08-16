import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { easing } from 'maath';

export default function Practice({ area }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('https://d1q7niitd49esc.cloudfront.net/models/practice.glb');
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
        easing.damp3(ref.current.scale, area === 0 ? 1 : 0.2, 0.1, 0.01);
        easing.damp(ref.current.position, 'y', area === 0 ? -0.94 : 0.3, 0.1, 0.01);
    });

    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);
    const onPointerOver = useCallback(() => setHovered(true), []);
    const onPointerOut = useCallback(() => setHovered(false), []);

    return (
        <group ref={ref} position={[7.8, -0.94, -10]}>
            <primitive
                object={gltf.scene}
                scale={1.4}
                rotation={[0, 0.05 * Math.PI, 0]}
                castShadow
                receiveShadow
                onPointerOut={onPointerOut}
                onPointerOver={onPointerOver}
                onClick={() => navigate('/musiclist/practice')}
            ></primitive>
        </group>
    );
}
