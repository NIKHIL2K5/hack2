import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingParticles } from "@/components/startup/FloatingParticles";
import { StartupLoginHeader } from "@/components/startup/StartupLoginHeader";
import { StartupLoginForm } from "@/components/startup/StartupLoginForm";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { authService } from "@/services/authService";

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

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      navigate(`/dashboard/${currentUser.role}`);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!isLogin) {
      if (!formData.name || !formData.startup) {
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
        if (currentUser && currentUser.role === 'startup') {
          navigate("/dashboard/startup");
        } else {
          toast.error("This account doesn't have startup permissions");
        }
      }
    } else {
      // Register
      const success = await authService.register(formData.email, formData.password, {
        name: formData.name,
        role: 'startup',
        organization: formData.startup
      });
      if (success) {
        navigate("/dashboard/startup");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background with gradient instead of 3D */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
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