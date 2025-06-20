
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Bot, User, ArrowLeft, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const AnimatedBot = () => (
  <motion.div
    className="relative w-20 h-20 mx-auto mb-4"
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
      <Bot className="w-8 h-8 text-white" />
    </div>
    <motion.div
      className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Sparkles className="w-3 h-3 text-white" />
    </motion.div>
  </motion.div>
);

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Sethu, your AI assistant for discovering government schemes and opportunities. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [language, setLanguage] = useState("english");
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses = {
    schemes: "Here are some relevant government schemes for your startup:\n\n1. T-Hub Incubation Program\n2. Telangana State Innovation Cell (TSIC)\n3. WE-Hub (Women Entrepreneurs Hub)\n4. MSME Development Schemes\n\nWould you like detailed information about any of these?",
    funding: "For startup funding in Telangana, consider:\n\n1. Seed Fund Scheme (Up to ₹50 lakhs)\n2. Angel Tax Exemption\n3. SIDBI Fund of Funds\n4. T-Angel Network\n\nI can help you understand eligibility criteria for each.",
    compliance: "For startup compliance, you need:\n\n1. Company Registration\n2. DPIIT Recognition\n3. MSME Registration\n4. GST Registration\n5. EPF & ESI Registration\n\nShall I guide you through any specific process?"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I understand your query. Let me help you with that information.";
      
      if (inputMessage.toLowerCase().includes("scheme")) {
        botResponse = predefinedResponses.schemes;
      } else if (inputMessage.toLowerCase().includes("fund")) {
        botResponse = predefinedResponses.funding;
      } else if (inputMessage.toLowerCase().includes("compliance")) {
        botResponse = predefinedResponses.compliance;
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);

    setInputMessage("");
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-3 max-w-[80%]">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/startup">
                <motion.div whileHover={{ scale: 1.1, x: -5 }}>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </motion.div>
              </Link>
              <div className="flex items-center space-x-3">
                <AnimatedBot />
                <div>
                  <h1 className="text-2xl font-bold">Sethu - AI Assistant</h1>
                  <p className="text-white/60">Discover government schemes & opportunities</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-white/60" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-1 text-white text-sm"
              >
                <option value="english" className="bg-indigo-800">English</option>
                <option value="telugu" className="bg-indigo-800">తెలుగు</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="relative z-10 container mx-auto px-6 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {/* Messages Area */}
          <div className="h-full flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-blue-500" 
                        : "bg-gradient-to-r from-indigo-500 to-purple-500"
                    }`}>
                      {message.sender === "user" ? 
                        <User className="w-4 h-4 text-white" /> : 
                        <Bot className="w-4 h-4 text-white" />
                      }
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.sender === "user"
                        ? "bg-blue-500/20 text-blue-100"
                        : "bg-white/10 text-white"
                    }`}>
                      <p className="whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-60 mt-2">{message.timestamp}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10">
              <div className="flex space-x-4">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={language === "english" ? "Ask Sethu about government schemes..." : "సేతుని ప్రభుత్వ పథకాల గురించి అడుగండి..."}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  disabled={isTyping}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            "Show available schemes",
            "Funding opportunities",
            "Compliance requirements"
          ].map((action, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }}>
              <Button
                onClick={() => setInputMessage(action)}
                variant="outline"
                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 h-12"
                disabled={isTyping}
              >
                {action}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ChatbotPage;
