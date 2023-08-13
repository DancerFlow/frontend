import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';

// glTF 모델을 사전 로드
useGLTF.preload('https://ai11dancerflow-upload-user-profile-image.s3.ap-northeast-2.amazonaws.com/dflogo.glb');

export default function Logo() {
    const ref = useRef();
    const gltf = useGLTF('https://ai11dancerflow-upload-user-profile-image.s3.ap-northeast-2.amazonaws.com/dflogo.glb');
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    });
    const navigate = useNavigate();
    const [direction, setDirection] = useState(1);
    const [clicked, setClicked] = useState(false);
    const [prevPosition, setPrevPosition] = useState();

    const handleHouseClick = (e) => {
        e.stopPropagation();
    };

    useFrame((state) => {
        if (ref.current.position.y > 3) setDirection(-1);
        if (ref.current.position.y < 2.2) setDirection(1);
        ref.current.position.y += direction * 0.008;
    });

    return (
        <primitive
            ref={ref}
            rotation={[0.4 * Math.PI, 0, 0]}
            object={gltf.scene}
            castShadow
            receiveShadow
            position={[0, 1, -15]}
            onClick={handleHouseClick}
            scale={0.9}
        ></primitive>
    );
}
