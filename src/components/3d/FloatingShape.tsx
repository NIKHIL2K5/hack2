
import { Float } from "@react-three/drei";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  shape?: "box" | "sphere";
}

export const FloatingShape = ({ position, color, shape = "box" }: FloatingShapeProps) => (
  <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
    <mesh position={position}>
      {shape === "box" ? (
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      ) : (
        <sphereGeometry args={[0.3, 16, 16]} />
      )}
      <meshStandardMaterial color={color} />
    </mesh>
  </Float>
);
