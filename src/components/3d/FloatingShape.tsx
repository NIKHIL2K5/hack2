
import { Float } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

interface FloatingShapeProps {
  position: Vector3;
  color: string;
  shape?: "box" | "sphere";
}

export const FloatingShape = ({ position, color, shape = "box" }: FloatingShapeProps) => (
  <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
    <mesh position={position}>
      {shape === "box" ? (
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      ) : (
        <sphereGeometry args={[0.3]} />
      )}
      <meshStandardMaterial color={color} />
    </mesh>
  </Float>
);
