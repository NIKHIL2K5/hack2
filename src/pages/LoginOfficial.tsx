import { motion } from "framer-motion";
import { Shield, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { authService } from "@/services/authService";

const FloatingShape = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-16 h-16 bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 rounded-full blur-xl"
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
    }}
  />
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!isLogin) {
      if (!formData.name || !formData.department || !formData.employeeId) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
    }
    
    if (isLogin) {
      // Login
      const success = await authService.login(formData.email, formData.password);
      if (success) {
        const currentUser = authService.getCurrentUser();
        if (currentUser && currentUser.role === 'official') {
          navigate("/dashboard/official");
        } else {
          toast.error("This account doesn't have official permissions");
        }
      }
    } else {
      // Register
      const success = await authService.register(formData.email, formData.password, {
        name: formData.name,
        role: 'official',
        department: formData.department,
        employeeId: formData.employeeId
      });
      if (success) {
        navigate("/dashboard/official");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <FloatingShape delay={0} />
        <FloatingShape delay={1} />
        <FloatingShape delay={2} />
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
                {isLogin ? "Authorized Access" : "Official Registration"}
              </CardTitle>
              <p className="text-white/80 text-lg flex items-center justify-center">
                <Lock className="w-4 h-4 mr-2" />
                {isLogin ? "Restricted to approved organizations" : "Register with authorized email"}
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
                  <Label htmlFor="email" className="text-white font-medium">Authorized Email</Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="official@organization.org.in" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg"
                    />
                  </motion.div>
                  <p className="text-xs text-white/50">Only pre-approved organization emails are accepted</p>
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
                    {isLogin ? "Secure Access" : "Register Account"}
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