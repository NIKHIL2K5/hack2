
import { motion } from "framer-motion";
import { ArrowRight, Building2, GraduationCap, Shield, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const roles = [
    {
      title: "Startup Founder",
      description: "Discover schemes, post internships, track compliance with AI assistance",
      icon: Building2,
      path: "/login/startup",
      color: "#007ACC",
      bgGradient: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      features: ["DPIIT Recognition", "Scheme Discovery AI", "Compliance Tracker", "Talent Acquisition"]
    },
    {
      title: "Student / Freelancer", 
      description: "Browse opportunities, apply for internships, get AI-powered job recommendations",
      icon: GraduationCap,
      path: "/login/student",
      color: "#10B981",
      bgGradient: "from-emerald-50 to-emerald-100",
      textColor: "text-emerald-700",
      features: ["Smart Job Matching", "Application Tracking", "Skill Development", "Resume Builder"]
    },
    {
      title: "Government Official",
      description: "Manage schemes, monitor compliance, view district-level analytics",
      icon: Shield,
      path: "/login/official", 
      color: "#7C3AED",
      bgGradient: "from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      features: ["Scheme Management", "Compliance Monitoring", "Analytics Dashboard", "Policy Insights"]
    }
  ];

  const scrollToRoles = () => {
    document.getElementById('role-selection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GovStartup Navigator</h1>
                <p className="text-xs text-gray-600">Government of Telangana</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="inline-flex items-center mb-8"
            >
              <Sparkles className="w-8 h-8 text-yellow-500 mr-4" />
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Empowering{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Innovation
                </span>
                {" "}in Telangana
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-500 ml-4" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Your comprehensive platform connecting startups, talent, and government initiatives. 
              Streamline compliance, discover opportunities, and accelerate growth in Telangana's innovation ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={scrollToRoles}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Choose Your Role
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-16"
            >
              <ChevronDown className="w-8 h-8 text-gray-400 mx-auto cursor-pointer" onClick={scrollToRoles} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section id="role-selection" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your role to access tailored features and functionality designed for your specific needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className={`h-full bg-gradient-to-br ${role.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-500`}>
                  <CardContent className="p-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      style={{ backgroundColor: role.color }}
                    >
                      <role.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className={`text-2xl font-bold mb-4 ${role.textColor}`}>{role.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>
                    
                    <div className="space-y-2 mb-8">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: role.color }}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Link to={role.path}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          className="w-full text-white border-0 py-3 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                          style={{ backgroundColor: role.color }}
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Platform Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and AI-powered features designed to streamline operations and accelerate growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Scheme Discovery", desc: "Intelligent matching with government schemes and funding opportunities", icon: "🤖" },
              { title: "Smart Job Marketplace", desc: "Advanced filtering and AI recommendations for perfect job matches", icon: "💼" },
              { title: "Compliance Automation", desc: "Real-time tracking of MSME, GST, DPIIT, and other regulatory requirements", icon: "📋" },
              { title: "District Analytics", desc: "Comprehensive insights and performance metrics across Telangana", icon: "📊" },
              { title: "Multilingual Support", desc: "Full Telugu and English language support with voice commands", icon: "🌐" },
              { title: "Secure Authentication", desc: "Role-based access control with government-grade security", icon: "🔐" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">GovStartup Navigator</span>
          </motion.div>
          <p className="text-gray-400 text-lg">
            © 2024 Government of Telangana. Empowering innovation through digital governance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
