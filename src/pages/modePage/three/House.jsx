import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

export default function House() {
    // Fetch model and a separate texture
    const gltf = useGLTF('/models/house.glb');
    // Skinned meshes cannot be re-used in threejs without cloning them
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    });

    const navigate = useNavigate();

    const handleHouseClick = (e) => {
        e.stopPropagation();
        navigate('/user');
    };

    return <primitive object={gltf.scene} castShadow receiveShadow position={[-2, 0, -2]} onClick={(e) => handleHouseClick(e)}></primitive>;
}
