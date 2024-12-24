import * as THREE from 'three';
import { useRef } from 'react';

export const Sky = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: {
      colorA: { value: new THREE.Color('#FFFFFF') },
      colorB: { value: new THREE.Color('#F5FDFF') },
      colorC: { value: new THREE.Color('#E8FBFF') },
      colorD: { value: new THREE.Color('#DBF9FF') },
      colorE: { value: new THREE.Color('#CEF7FF') },
      colorF: { value: new THREE.Color('#C1F5FF') },
      colorG: { value: new THREE.Color('#B4F3FF') },
      colorH: { value: new THREE.Color('#A7F1FF') },
      colorI: { value: new THREE.Color('#9AEFFF') },
      colorJ: { value: new THREE.Color('#8DEDFF') },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform vec3 colorC;
      uniform vec3 colorD;
      uniform vec3 colorE;
      uniform vec3 colorF;
      uniform vec3 colorG;
      uniform vec3 colorH;
      uniform vec3 colorI;
      uniform vec3 colorJ;
      varying vec3 vWorldPosition;
      
      void main() {
        float h = normalize(vWorldPosition).y;
        float t = max(0.0, min(1.0, (h + 1.0) * 0.5));
        
        vec3 color;
        if (t < 0.1) {
          color = mix(colorA, colorB, t * 10.0);
        } else if (t < 0.2) {
          color = mix(colorB, colorC, (t - 0.1) * 10.0);
        } else if (t < 0.3) {
          color = mix(colorC, colorD, (t - 0.2) * 10.0);
        } else if (t < 0.4) {
          color = mix(colorD, colorE, (t - 0.3) * 10.0);
        } else if (t < 0.5) {
          color = mix(colorE, colorF, (t - 0.4) * 10.0);
        } else if (t < 0.6) {
          color = mix(colorF, colorG, (t - 0.5) * 10.0);
        } else if (t < 0.7) {
          color = mix(colorG, colorH, (t - 0.6) * 10.0);
        } else if (t < 0.8) {
          color = mix(colorH, colorI, (t - 0.7) * 10.0);
        } else if (t < 0.9) {
          color = mix(colorI, colorJ, (t - 0.8) * 10.0);
        } else {
          color = colorJ;
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[500, 128, 128]} />
      <primitive object={skyMaterial} attach="material" />
    </mesh>
  );
};
