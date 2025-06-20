
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, GraduationCap, Shield, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    startupId: '',
    govtId: '',
    skills: '',
    resume: null as File | null
  });
  const [errors, setErrors] = useState<any>({});

  const roleConfig = {
    startup: {
      title: "Startup Founder",
      icon: Building2,
      color: "#007ACC",
      bgGradient: "from-blue-600 to-blue-800",
      description: "Access your startup dashboard to post jobs and discover schemes"
    },
    student: {
      title: "Student / Freelancer",
      icon: GraduationCap,
      color: "#10B981",
      bgGradient: "from-emerald-600 to-emerald-800",
      description: "Find opportunities and track your applications"
    },
    official: {
      title: "Government Official",
      icon: Shield,
      color: "#7C3AED",
      bgGradient: "from-purple-600 to-purple-800",
      description: "Manage schemes and monitor district-level compliance"
    }
  };

  const currentRole = roleConfig[role as keyof typeof roleConfig];

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (role === 'official' && !formData.email.endsWith('@telangana.gov.in')) {
      newErrors.email = "Government officials must use @telangana.gov.in email";
    }
    
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (role === 'startup' && !formData.startupId) newErrors.startupId = "Startup ID (DPIIT/MSME) is required";
      if (role === 'official' && !formData.govtId) newErrors.govtId = "Government ID is required";
      if (role === 'student' && !formData.skills) newErrors.skills = "Skills are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    // Simulate login/signup
    toast.success(isLogin ? "Login successful!" : "Account created successfully!");
    
    setTimeout(() => {
      navigate(`/dashboard/${role}`);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      toast.success("Resume uploaded successfully!");
    }
  };

  if (!currentRole) {
    return <div>Invalid role</div>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentRole.bgGradient} flex items-center justify-center p-4`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 backdrop-blur-lg bg-white/95">
          <CardHeader className="text-center pb-8">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{ backgroundColor: currentRole.color }}
            >
              <currentRole.icon className="w-8 h-8 text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              {currentRole.title}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">{currentRole.description}</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className={`mt-2 ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </motion.div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={role === 'official' ? "username@telangana.gov.in" : "Enter your email"}
                  className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <>
                  {role === 'startup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Label htmlFor="startupId">Startup ID (DPIIT/MSME)</Label>
                      <Input
                        id="startupId"
                        type="text"
                        value={formData.startupId}
                        onChange={(e) => setFormData(prev => ({ ...prev, startupId: e.target.value }))}
                        placeholder="DPIIT12345 or MSME67890"
                        className={`mt-2 ${errors.startupId ? 'border-red-500' : ''}`}
                      />
                      {errors.startupId && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.startupId}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {role === 'official' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Label htmlFor="govtId">Government Employee ID</Label>
                      <Input
                        id="govtId"
                        type="text"
                        value={formData.govtId}
                        onChange={(e) => setFormData(prev => ({ ...prev, govtId: e.target.value }))}
                        placeholder="GOV123456"
                        className={`mt-2 ${errors.govtId ? 'border-red-500' : ''}`}
                      />
                      {errors.govtId && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.govtId}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {role === 'student' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input
                          id="skills"
                          type="text"
                          value={formData.skills}
                          onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                          placeholder="React, Node.js, Python, Design"
                          className={`mt-2 ${errors.skills ? 'border-red-500' : ''}`}
                        />
                        {errors.skills && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.skills}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="resume">Resume Upload</Label>
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="mt-2"
                        />
                        {formData.resume && (
                          <p className="text-green-600 text-sm mt-1 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {formData.resume.name}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full text-white py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: currentRole.color }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </motion.div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
