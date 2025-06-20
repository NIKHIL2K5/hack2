
import { motion } from "framer-motion";
import { ArrowRight, Building2, GraduationCap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const roles = [
    {
      title: "Startup Founder",
      description: "Post jobs, track compliance, discover schemes",
      icon: Building2,
      path: "/login/startup",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      title: "Student / Freelancer", 
      description: "Find opportunities, apply for jobs, track applications",
      icon: GraduationCap,
      path: "/login/student",
      color: "bg-teal-600",
      hoverColor: "hover:bg-teal-700"
    },
    {
      title: "Government Official",
      description: "Manage schemes, review applications, analytics",
      icon: Shield,
      path: "/login/official", 
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GovStartup Navigator</h1>
                <p className="text-sm text-gray-600">Telangana</p>
              </div>
            </motion.div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connecting <span className="text-blue-600">Startups</span>, 
              <span className="text-teal-600"> Talent</span> & 
              <span className="text-indigo-600"> Government</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Telangana's unified platform for startup ecosystem growth, talent discovery, 
              and government scheme navigation. Empowering innovation through seamless collaboration.
            </p>
          </motion.div>

          {/* Role Selection CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Choose Your Role to Get Started</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 ${role.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{role.title}</h3>
                      <p className="text-gray-600 mb-6">{role.description}</p>
                      <Link to={role.path}>
                        <Button className={`w-full ${role.color} ${role.hoverColor} text-white group-hover:shadow-lg transition-all duration-300`}>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
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
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Ecosystem Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to navigate Telangana's startup ecosystem in one powerful platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Job Marketplace", desc: "Connect startups with talented students and freelancers" },
              { title: "Scheme Discovery", desc: "AI-powered government scheme recommendations" },
              { title: "Compliance Tracking", desc: "Stay compliant with MSME, GST, and DPIIT requirements" },
              { title: "Analytics Dashboard", desc: "District-level insights and performance metrics" },
              { title: "Multilingual Support", desc: "Available in English and Telugu" },
              { title: "Secure Authentication", desc: "Role-based access with government-grade security" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">GovStartup Navigator</span>
          </div>
          <p className="text-gray-400">
            © 2024 Government of Telangana. Empowering innovation through digital governance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
