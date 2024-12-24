import * as THREE from 'three';
import { getContributionColor } from '../../services/github';

interface GrassBlockProps {
  position: [number, number, number];
  contributionCount: number;
}

export const GrassBlock = ({
  position,
  contributionCount,
}: GrassBlockProps) => {
  const grassColor = getContributionColor(contributionCount);

  return (
    <group position={position}>
      {/* 土の部分（茶色の立方体） */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.6, 1]} />
        <meshStandardMaterial
          color="#B4846C"
          roughness={0.8}
          metalness={0}
          side={THREE.FrontSide}
          shadowSide={THREE.FrontSide}
        />
      </mesh>

      {/* 草の部分（貢献度に応じて色が変わる上部） */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[0.98, 0.3, 0.98]} />
        <meshStandardMaterial
          color={grassColor}
          roughness={0.7}
          metalness={0}
          side={THREE.FrontSide}
          shadowSide={THREE.FrontSide}
          transparent={true}
          opacity={1}
        />
      </mesh>

      {/* 草の装飾（中央の突起） */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial
          color={grassColor}
          roughness={0.7}
          metalness={0}
          side={THREE.FrontSide}
          shadowSide={THREE.FrontSide}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
};
