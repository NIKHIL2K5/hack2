
import { Float } from "@react-three/drei";

export const AnimatedSphere = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  </Float>
);
