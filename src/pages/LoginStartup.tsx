
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { AnimatedSphere } from "@/components/startup/AnimatedSphere";
import { FloatingParticles } from "@/components/startup/FloatingParticles";
import { StartupLoginHeader } from "@/components/startup/StartupLoginHeader";
import { StartupLoginForm } from "@/components/startup/StartupLoginForm";
import { useStartupAuth } from "@/hooks/useStartupAuth";

const LoginStartup = () => {
  const {
    isLogin,
    setIsLogin,
    showPassword,
    setShowPassword,
    formData,
    handleSubmit,
    handleInputChange
  } = useStartupAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
        </Canvas>
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 50, rotateY: -30 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-white hover:text-blue-200 mb-6 group">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Back to Home
          </motion.div>
        </Link>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
        >
          <Card className="bg-transparent border-0 shadow-none">
            <StartupLoginHeader isLogin={isLogin} />
            
            <CardContent className="space-y-6 px-8 pb-8">
              <StartupLoginForm
                isLogin={isLogin}
                showPassword={showPassword}
                formData={formData}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <div className="text-center pt-6 border-t border-white/20">
                <p className="text-white/80">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-300 hover:text-blue-200 font-semibold underline"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </motion.button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginStartup;
