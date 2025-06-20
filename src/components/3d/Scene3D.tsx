
import { Canvas } from "@react-three/fiber";
import { FloatingShape } from "./FloatingShape";

export const Scene3D = () => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 5, 5]} intensity={0.5} />
    <FloatingShape position={[-2, 1, 0]} color="#3b82f6" shape="box" />
    <FloatingShape position={[2, -1, 0]} color="#14b8a6" shape="sphere" />
    <FloatingShape position={[0, 2, -1]} color="#6366f1" shape="box" />
  </Canvas>
);
