
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Octahedron } from "@react-three/drei";
import { toast } from "sonner";

const AnimatedOctahedron = () => (
  <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
    <Octahedron args={[1]}>
      <meshStandardMaterial color="#6366f1" />
    </Octahedron>
  </Float>
);

const LoginOfficial = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.endsWith('@telangana.gov.in')) {
      toast.error("Please use your official @telangana.gov.in email address");
      return;
    }
    
    toast.success(isLogin ? "Secure access granted!" : "Official account created!");
    setTimeout(() => navigate("/dashboard/official"), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedOctahedron />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotateY: -30 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center text-white hover:text-indigo-200 mb-6 group">
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
                className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Secure Access" : "Official Registration"}
              </CardTitle>
              <p className="text-white/80 text-lg flex items-center justify-center">
                <Lock className="w-4 h-4 mr-2" />
                {isLogin ? "Government portal login" : "Create official account"}
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
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-white font-medium">Department</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          id="department" 
                          value={formData.department}
                          onChange={handleInputChange}
                          placeholder="Enter your department" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId" className="text-white font-medium">Employee ID</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          id="employeeId" 
                          value={formData.employeeId}
                          onChange={handleInputChange}
                          placeholder="Enter your employee ID" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Government Email</Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="official@telangana.gov.in" 
                      pattern=".*@telangana\.gov\.in$"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg"
                    />
                  </motion.div>
                  <p className="text-xs text-white/50">Must use @telangana.gov.in email domain</p>
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
                        placeholder="Enter secure password" 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg pr-12"
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg"
                      />
                    </motion.div>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white border-0 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {isLogin ? "Secure Sign In" : "Register Account"}
                  </Button>
                </motion.div>
              </form>

              <div className="text-center pt-6 border-t border-white/20">
                <p className="text-white/80">
                  {isLogin ? "Need official access? " : "Already registered? "}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-indigo-300 hover:text-indigo-200 font-semibold underline"
                  >
                    {isLogin ? "Request account" : "Sign in"}
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

export default LoginOfficial;
