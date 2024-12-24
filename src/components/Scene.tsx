import { Canvas } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';
import { Island } from './island/Island';
import { ContributionData } from './island/types';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface SceneProps {
  contributionData: ContributionData | null;
}

export const Scene = ({ contributionData }: SceneProps) => {
  const controlsRef = useRef<any>(null);

  // グリッド全体の中心位置を計算
  const targetPosition = useMemo(() => {
    if (!contributionData) return new THREE.Vector3(2.11, 1.17, 11.48);

    return new THREE.Vector3(2.11, 1.17, 11.48); // 理想的なターゲット位置
  }, [contributionData]);

  return (
    <Canvas
      shadows
      camera={{
        position: [-4.95, 10.79, 18.02], // 理想的なカメラ位置
        fov: 45,
        near: 0.1,
        far: 1000,
        rotation: [-0.97, -0.55, -0.65], // 理想的な回転角度
      }}
    >
      <MapControls
        ref={controlsRef}
        enablePan={true}
        panSpeed={1.5}
        screenSpacePanning={true}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={10}
        maxDistance={50}
        target={targetPosition}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.DOLLY,
        }}
        keys={{
          LEFT: 'ArrowLeft',
          UP: 'ArrowUp',
          RIGHT: 'ArrowRight',
          BOTTOM: 'ArrowDown',
        }}
        listenToKeyEvents={() => document.body}
        onChange={() => {
          if (controlsRef.current) {
            const camera = controlsRef.current.object;
            console.log('Camera position:', {
              x: camera.position.x.toFixed(2),
              y: camera.position.y.toFixed(2),
              z: camera.position.z.toFixed(2),
            });
            console.log('Camera rotation:', {
              x: camera.rotation.x.toFixed(2),
              y: camera.rotation.y.toFixed(2),
              z: camera.rotation.z.toFixed(2),
            });
            console.log('Controls target:', {
              x: controlsRef.current.target.x.toFixed(2),
              y: controlsRef.current.target.y.toFixed(2),
              z: controlsRef.current.target.z.toFixed(2),
            });
          }
        }}
      />
      <Island contributionData={contributionData} />
    </Canvas>
  );
};
