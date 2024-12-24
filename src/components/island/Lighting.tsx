export const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.0}
        castShadow
        color="#FFE5CC"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0005}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-25, 25, 25, -25, 0.1, 50]}
        />
      </directionalLight>
      <pointLight position={[-10, 10, -10]} intensity={0.4} color="#FFE5CC" />
    </>
  );
};
