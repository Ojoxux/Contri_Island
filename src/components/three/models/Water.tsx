import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface WaterProps {
  position: [number, number, number];
  size?: [number, number];
  color?: string;
}

export const Water = ({
  position,
  size = [15, 15],
  color = '#4AC6FF',
}: WaterProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const waterShader = {
    uniforms: {
      time: { value: 0 },
      lightColor: { value: new THREE.Color('#8CE6FF') },
      baseColor: { value: new THREE.Color('#59C1FF') },
      patternColor: { value: new THREE.Color('#3AA3FF') },
      sunReflection: { value: new THREE.Color('#FFFFFF') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vPosition;
      uniform float time;

      void main() {
        vUv = uv;
        vPosition = position;
        vec3 pos = position;
        
        float wave = 
          floor(sin(pos.x * 0.5 + pos.z * 0.5 + time * 0.3) * 2.0) * 0.15;
        
        pos.y += wave;
        vElevation = wave;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 lightColor;
      uniform vec3 baseColor;
      uniform vec3 patternColor;
      uniform vec3 sunReflection;
      uniform float time;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vPosition;
      
      void main() {
        // 基本の水色
        vec3 waterColor = baseColor;
        
        // 横縞パターン
        float stripes = step(0.5, fract((vUv.y + time * 0.1) * 4.0)) * 0.08;
        
        // 斜めパターン
        float diagonal = step(0.5, fract((vUv.x + vUv.y + time * 0.1) * 2.5)) * 0.05;
        
        // 太陽の反射 (動く楕円形)
        vec2 sunCenter = vec2(0.7, 0.3); // 反射の中心位置
        vec2 pos = vUv - sunCenter;
        pos.x *= 2.0; // 楕円形に
        float sunSpot = 1.0 - smoothstep(0.0, 0.2, length(pos));
        sunSpot *= 0.8; // 反射の強さを調整
        
        // 反射のきらめき効果
        float sparkle = step(0.98, sin(vPosition.x * 10.0 + time * 2.0) * 
                                 sin(vPosition.z * 10.0 - time * 1.5));
        
        // パターンを組み合わせ
        waterColor = mix(waterColor, patternColor, stripes + diagonal);
        waterColor = mix(waterColor, lightColor, step(0.2, vElevation));
        waterColor = mix(waterColor, sunReflection, sunSpot + sparkle * 0.3);
        
        float alpha = 0.95;
        gl_FragColor = vec4(waterColor, alpha);
      }
    `,
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size[0], size[1], 12, 12]} />
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
