import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CloudProps {
  position: [number, number, number];
  scale?: [number, number, number];
  castShadow?: boolean;
  speed?: number;
}

export const Cloud = ({
  position,
  scale = [1, 1, 1],
  castShadow = false,
  speed = 1,
}: CloudProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/cloud/scene.gltf');
  const initialPosition = useRef(position);

  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.9,
    roughness: 0.1,
    metalness: 0.0,
    envMapIntensity: 2.0,
  });

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = cloudMaterial;
      child.castShadow = castShadow;
      child.receiveShadow = false;
    }
  });

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;

      group.current.position.y =
        initialPosition.current[1] + Math.sin(time * 0.3) * 0.2;

      group.current.rotation.z = Math.sin(time * 0.2) * 0.08;

      group.current.position.x =
        initialPosition.current[0] + Math.sin(time * 0.1 * speed) * 2;
      group.current.position.z =
        initialPosition.current[2] + Math.cos(time * 0.1 * speed) * 2;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} dispose={null}>
      <primitive object={scene.clone()} />
    </group>
  );
};

useGLTF.preload('/models/cloud/scene.gltf');
