import { motion } from "framer-motion";
import { ArrowRight, Building2, GraduationCap, Shield, Sparkles, ChevronDown, Mail, Phone, MapPin, Clock, Users, Target, Award, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { useResponsive } from "@/hooks/useResponsive";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { PageContainer } from "@/components/layout/PageContainer";

const Index = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  
  // Check if user is already logged in and redirect to appropriate dashboard
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      navigate(`/dashboard/${currentUser.role}`);
    }
  }, [navigate]);
  
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
    <PageContainer className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50" noPadding>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/dc27c7bf-1e1d-4fb1-a5c7-01b85351db67.png" 
                alt="GovStartup Navigator"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">GovStartup Navigator</h1>
                <p className="text-xs text-gray-600">Government of Telangana</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">Contact</a>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex flex-col sm:flex-row items-center mb-6 sm:mb-8">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mb-2 sm:mb-0 sm:mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Empowering{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Innovation
                </span>
                {" "}in Telangana
              </h1>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mt-2 sm:mt-0 sm:ml-4" />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
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
                size={isMobile ? "default" : "lg"}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Choose Your Role
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 sm:mt-16"
            >
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto cursor-pointer" onClick={scrollToRoles} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section id="role-selection" className="py-16 sm:py-20 bg-white px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Choose Your Journey</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Select your role to access tailored features and functionality designed for your specific needs
            </p>
          </motion.div>

          <ResponsiveGrid
            cols={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
            gap={8}
            className="max-w-6xl mx-auto"
          >
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
                  <CardContent className="p-6 sm:p-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      style={{ backgroundColor: role.color }}
                    >
                      <role.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    
                    <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${role.textColor}`}>{role.title}</h3>
                    <p className="text-gray-600 mb-5 sm:mb-6 leading-relaxed">{role.description}</p>
                    
                    <div className="space-y-2 mb-6 sm:mb-8">
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
                          className="w-full text-white border-0 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
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
          </ResponsiveGrid>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Platform Features</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and AI-powered features designed to streamline operations and accelerate growth
            </p>
          </motion.div>

          <ResponsiveGrid
            cols={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
            gap={8}
          >
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
                className="p-6 sm:p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </ResponsiveGrid>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">About GovStartup Navigator</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between innovation and governance in Telangana
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                GovStartup Navigator is a revolutionary platform developed by the Government of Telangana to foster innovation, entrepreneurship, and economic growth. We aim to create a seamless ecosystem where startups, students, and government officials can collaborate effectively.
              </p>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Our platform leverages cutting-edge AI technology to streamline compliance processes, facilitate talent acquisition, and provide intelligent recommendations for schemes and opportunities.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">500+</div>
                  <div className="text-gray-600">Registered Startups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">2000+</div>
                  <div className="text-gray-600">Active Students</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Innovation First</h4>
                  <p className="text-gray-600">Promoting cutting-edge solutions and technological advancement across Telangana.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Community Driven</h4>
                  <p className="text-gray-600">Building a strong network of entrepreneurs, students, and government officials.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Excellence</h4>
                  <p className="text-gray-600">Maintaining the highest standards in all our services and initiatives.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Get in Touch</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you navigate your journey.
            </p>
          </motion.div>

          <ResponsiveGrid
            cols={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
            gap={8}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Email Us</h3>
              <p className="text-gray-600 mb-3 sm:mb-4">Send us your queries and we'll respond within 24 hours.</p>
              <a href="mailto:support@govstartupnavigator.telangana.gov.in" className="text-blue-600 hover:text-blue-700 font-medium">
                support@govstartupnavigator.telangana.gov.in
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Call Us</h3>
              <p className="text-gray-600 mb-3 sm:mb-4">Speak directly with our support team for immediate assistance.</p>
              <a href="tel:+914023456789" className="text-emerald-600 hover:text-emerald-700 font-medium">
                +91 40 2345 6789
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">Visit Us</h3>
              <p className="text-gray-600 mb-3 sm:mb-4">Come to our office for in-person consultations and support.</p>
              <address className="text-purple-600 font-medium not-italic">
                Secretariat, Hyderabad,<br />
                Telangana - 500022
              </address>
            </motion.div>
          </ResponsiveGrid>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Office Hours</h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="text-gray-700">24/7 Online Support Available</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <img 
                  src="/lovable-uploads/dc27c7bf-1e1d-4fb1-a5c7-01b85351db67.png" 
                  alt="GovStartup Navigator"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
                <span className="text-lg sm:text-xl font-bold">GovStartup Navigator</span>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Empowering innovation and entrepreneurship across Telangana through digital governance and AI-powered solutions.
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Government of Telangana Initiative</p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Platform Features</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">About Us</a></li>
                <li><a href="/login/startup" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">For Startups</a></li>
                <li><a href="/login/student" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">For Students</a></li>
                <li><a href="/login/official" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">For Officials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Services</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><span className="text-gray-400 text-sm sm:text-base">DPIIT Registration</span></li>
                <li><span className="text-gray-400 text-sm sm:text-base">Scheme Discovery</span></li>
                <li><span className="text-gray-400 text-sm sm:text-base">Compliance Tracking</span></li>
                <li><span className="text-gray-400 text-sm sm:text-base">Job Marketplace</span></li>
                <li><span className="text-gray-400 text-sm sm:text-base">AI Recommendations</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Info</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs sm:text-sm">support@govstartupnavigator.telangana.gov.in</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs sm:text-sm">+91 40 2345 6789</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs sm:text-sm">Secretariat, Hyderabad, Telangana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-0">
                © 2024 Government of Telangana. All rights reserved.
              </p>
              <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </PageContainer>
  );
};

export default Index;