import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TreeProps {
  position: [number, number, number];
  rotation?: number;
  scale?: number;
}

export const Tree = ({ position, rotation = 0, scale = 1 }: TreeProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/scene.gltf');

  // オリジナルのマテリアルをクローン
  const materials = {
    trunk: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#A0522D'),
      roughness: 0.8,
      metalness: 0.2,
    }),
    leaves: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#90EE90'),
      roughness: 0.7,
      metalness: 0.1,
    }),
  };

  // シーン内のすべてのメッシュのマテリアルを更新
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name.includes('Object_4') || child.name.includes('Object_6')) {
        child.material = materials.trunk;
      } else {
        child.material = materials.leaves;
      }
    }
  });

  useFrame((state) => {
    if (group.current) {
      const windStrength = 0.002;
      const time = state.clock.elapsedTime;
      group.current.rotation.z = Math.sin(time) * windStrength;
      group.current.position.x =
        position[0] + Math.sin(time * 0.5) * windStrength;
    }
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotation, 0]}
      scale={[scale, scale, scale]}
      dispose={null}
    >
      <primitive object={scene.clone()} />
    </group>
  );
};

useGLTF.preload('/models/scene.gltf');
