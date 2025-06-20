
import { motion } from "framer-motion";
import { ArrowRight, Building2, GraduationCap, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const FloatingElement = ({ position, children }: any) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <mesh position={position}>
      {children}
    </mesh>
  </Float>
);

const Scene3D = () => (
  <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    
    <FloatingElement position={[-4, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </FloatingElement>
    
    <FloatingElement position={[4, -2, 0]}>
      <sphereGeometry args={[0.8]} />
      <meshStandardMaterial color="#14b8a6" />
    </FloatingElement>
    
    <FloatingElement position={[0, 3, -2]}>
      <torusGeometry args={[0.8, 0.3, 16, 100]} />
      <meshStandardMaterial color="#6366f1" />
    </FloatingElement>
    
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
  </Canvas>
);

const Index = () => {
  const roles = [
    {
      title: "Startup Founder",
      description: "Post jobs, track compliance, discover schemes with AI assistance",
      icon: Building2,
      path: "/login/startup",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      title: "Student / Freelancer", 
      description: "Find opportunities, apply for jobs, get AI recommendations",
      icon: GraduationCap,
      path: "/login/student",
      color: "bg-teal-600",
      hoverColor: "hover:bg-teal-700",
      gradient: "from-teal-500 to-teal-700"
    },
    {
      title: "Government Official",
      description: "Manage schemes, review applications, view analytics",
      icon: Shield,
      path: "/login/official", 
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700",
      gradient: "from-indigo-500 to-indigo-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 opacity-20">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center"
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">GovStartup Navigator</h1>
                <p className="text-sm text-white/70">Telangana Innovation Hub</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#features" 
                className="text-white/80 hover:text-white transition-colors"
              >
                Features
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#about" 
                className="text-white/80 hover:text-white transition-colors"
              >
                About
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="#contact" 
                className="text-white/80 hover:text-white transition-colors"
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(20, 184, 166, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center justify-center mb-6"
            >
              <Sparkles className="w-8 h-8 text-yellow-400 mr-4" />
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                Connecting{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Startups
                </span>
                ,{" "}
                <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  Talent
                </span>
                {" "}&{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                  Government
                </span>
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-4" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-white/90 mb-16 leading-relaxed max-w-4xl mx-auto"
            >
              Telangana's AI-powered platform for startup ecosystem growth, talent discovery, 
              and government scheme navigation. Experience the future of innovation collaboration.
            </motion.p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <motion.h2 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Choose Your Journey
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {roles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 * index,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -20, 
                    rotateY: 5,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group perspective-1000"
                >
                  <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 transform-gpu">
                    <CardContent className="p-8 text-center">
                      <motion.div 
                        whileHover={{ 
                          scale: 1.2, 
                          rotateY: 360,
                          transition: { duration: 0.6 }
                        }}
                        className={`w-20 h-20 bg-gradient-to-r ${role.gradient} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl`}
                      >
                        <role.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-white">{role.title}</h3>
                      <p className="text-white/70 mb-8 leading-relaxed">{role.description}</p>
                      
                      <Link to={role.path}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button className={`w-full bg-gradient-to-r ${role.gradient} hover:shadow-2xl text-white border-0 py-4 text-lg font-semibold`}>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Start Your Journey
                            </motion.span>
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Next-Generation Platform Features
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Powered by AI and built for the future of innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI Job Marketplace", desc: "Smart matching with 3D visualization", icon: "🚀" },
              { title: "Scheme Discovery Bot", desc: "Multilingual AI assistant for government schemes", icon: "🤖" },
              { title: "Real-time Compliance", desc: "MSME, GST, DPIIT tracking with live updates", icon: "📊" },
              { title: "3D Analytics Dashboard", desc: "Immersive district-level insights", icon: "📈" },
              { title: "Voice Commands", desc: "Navigate with Telugu and English voice input", icon: "🎤" },
              { title: "Blockchain Security", desc: "Government-grade security protocols", icon: "🔐" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-900 to-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">GovStartup Navigator</span>
          </motion.div>
          <p className="text-white/60 text-lg">
            © 2024 Government of Telangana. Empowering innovation through next-generation digital governance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
