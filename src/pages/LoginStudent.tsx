
import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import { toast } from "sonner";

const AnimatedTorus = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Torus args={[1, 0.4, 16, 100]}>
      <meshStandardMaterial color="#14b8a6" />
    </Torus>
  </Float>
);

const LoginStudent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    setTimeout(() => navigate("/dashboard/student"), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedTorus />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotateY: -30 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center text-white hover:text-teal-200 mb-6 group">
          <motion.div whileHover={{ x: -5 }} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Back to Home
          </motion.div>
        </Link>

        <motion.div whileHover={{ scale: 1.02 }} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="text-center pb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Student Portal" : "Join Our Community"}
              </CardTitle>
              <p className="text-white/80 text-lg">
                {isLogin ? "Access your learning dashboard" : "Start your journey with us"}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:ring-teal-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college" className="text-white font-medium">College/Institution</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          id="college" 
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="Enter your college name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:ring-teal-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email</Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="student@college.edu" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:ring-teal-400/50 h-12 text-lg"
                    />
                  </motion.div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">Password</Label>
                  <div className="relative">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password" 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:ring-teal-400/50 h-12 text-lg pr-12"
                      />
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>

                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password" 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:ring-teal-400/50 h-12 text-lg"
                      />
                    </motion.div>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white border-0 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLogin ? "Access Dashboard" : "Join Community"}
                  </Button>
                </motion.div>
              </form>

              <div className="text-center pt-6 border-t border-white/20">
                <p className="text-white/80">
                  {isLogin ? "New to our platform? " : "Already have an account? "}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-teal-300 hover:text-teal-200 font-semibold underline"
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

export default LoginStudent;
