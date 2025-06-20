
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-600 to-teal-500 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <div className="w-64 h-64 mb-8">
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
          </Canvas>
        </div>
        <motion.h2
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-4xl font-bold text-white mb-4"
        >
          GovStartup Navigator
        </motion.h2>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/80 text-lg"
        >
          Initializing Telangana's Innovation Hub...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
