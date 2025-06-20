
import { Float, Sphere } from "@react-three/drei";

export const AnimatedSphere = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.1}
        metalness={0.1}
      />
    </Sphere>
  </Float>
);
