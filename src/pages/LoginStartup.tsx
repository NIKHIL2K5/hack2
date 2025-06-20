
import { motion } from "framer-motion";
import { Building2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { toast } from "sonner";
import { isValidOfficialEmail, getOrganizationByEmail } from "@/services/officialAuth";

const AnimatedSphere = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
      />
    </Sphere>
  </Float>
);

const LoginStartup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startup: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that email ends with "org.in"
    if (!formData.email.toLowerCase().endsWith('org.in')) {
      toast.error("Only official organization emails ending with 'org.in' are allowed!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    // Check if email is from an allowed organization
    if (!isValidOfficialEmail(formData.email)) {
      toast.error("This email is not registered as an official organization partner. Please contact support if you believe this is an error.");
      return;
    }

    // Get organization details
    const organization = getOrganizationByEmail(formData.email);
    if (!organization) {
      toast.error("Unable to find organization details for this email.");
      return;
    }

    // Create official user object and store it
    const officialUser = {
      email: formData.email,
      name: formData.name || `${organization.name} User`,
      organization: organization,
      department: "HR/Recruitment",
      employeeId: `EMP_${Date.now()}`,
      registeredAt: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('officialUser', JSON.stringify(officialUser));

    // Simulate authentication
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    setTimeout(() => {
      navigate("/dashboard/startup");
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

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
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
            <CardHeader className="text-center pb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotateY: 180 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Building2 className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back!" : "Join the Innovation"}
              </CardTitle>
              <p className="text-white/80 text-lg">
                {isLogin ? "Sign in to your startup dashboard" : "Create your startup founder account"}
              </p>
              <p className="text-yellow-300 text-sm mt-2 font-medium">
                Only official organization emails ending with "org.in" are accepted
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
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startup" className="text-white font-medium">Organization Name</Label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          id="startup" 
                          value={formData.startup}
                          onChange={handleInputChange}
                          placeholder="Enter your organization name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 h-12 text-lg"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Official Email</Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="hiring@company.org.in" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 h-12 text-lg"
                    />
                  </motion.div>
                  <p className="text-xs text-yellow-200 mt-1">
                    Must end with "org.in" and be from a registered organization
                  </p>
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 h-12 text-lg pr-12"
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 h-12 text-lg"
                      />
                    </motion.div>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-0 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isLogin ? "Sign In to Dashboard" : "Create Account"}
                    </motion.span>
                  </Button>
                </motion.div>
              </form>

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
