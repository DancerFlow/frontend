import React, { useEffect, useRef, useState } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { easing } from 'maath';

export default function Construction({ area }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('https://ai11dancerflow-upload-user-profile-image.s3.ap-northeast-2.amazonaws.com/construction.glb');
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
        easing.damp3(ref.current.scale, area === 2 ? 1 : 0.2, 0.1, 0.01);
        easing.damp(ref.current.position, 'y', area === 2 ? 0.2 : 1, 0.1, 0.01);
    });
    return (
        <group ref={ref} position={[9, 0, 9]}>
            <primitive object={gltf.scene} scale={1.6} rotation={[0, 0.5 * Math.PI, 0]} castShadow receiveShadow></primitive>
        </group>
    );
}
