import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface WaterProps {
  position: [number, number, number];
  size?: [number, number];
  color?: string;
  segments?: number;
}

export const Water = ({
  position,
  size = [100, 100],
  color = '#4AC6FF',
  segments = 16,
}: WaterProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const waterShader = {
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color('#4AC6FF') },
      darkColor: { value: new THREE.Color('#2A95FF') },
    },
    vertexShader: `
        varying vec3 vPosition;
        uniform float time;

        void main() {
            vPosition = position;

            // より大きな三角形状の波を作成
            float elevation = sin(position.x * 0.2 + position.z * 0.2 + time * 0.3) * 0.4;
            elevation += sin(position.x * 0.15 - position.z * 0.25 + time * 0.2) * 0.3;

            vec3 newPosition = position;
            newPosition.y += elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 baseColor;
        uniform vec3 darkColor;

        void main() {
            // 水面の色を計算
            vec3 waterColor = mix(darkColor, baseColor, 0.5);
            gl_FragColor = vec4(waterColor, 0.9);
        }
    `,
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size[0], size[1], segments, segments]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={waterShader.uniforms}
        vertexShader={waterShader.vertexShader}
        fragmentShader={waterShader.fragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
