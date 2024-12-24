import { Cloud } from './Cloud';

export const CloudGroup = () => {
  return (
    <>
      <Cloud
        position={[-8, 4, -8]}
        scale={[0.15, 0.15, 0.15]}
        castShadow={true}
        speed={1.2}
      />
      <Cloud
        position={[8, 5, -8]}
        scale={[0.2, 0.2, 0.2]}
        castShadow={true}
        speed={0.8}
      />
      <Cloud
        position={[-8, 6, 8]}
        scale={[0.18, 0.18, 0.18]}
        castShadow={true}
        speed={1.0}
      />
      <Cloud
        position={[8, 3.5, 8]}
        scale={[0.15, 0.15, 0.15]}
        castShadow={true}
        speed={1.5}
      />
      <Cloud
        position={[0, 4, -10]}
        scale={[0.17, 0.17, 0.17]}
        castShadow={true}
        speed={0.9}
      />
      <Cloud
        position={[0, 5, 10]}
        scale={[0.16, 0.16, 0.16]}
        castShadow={true}
        speed={1.1}
      />
    </>
  );
};
