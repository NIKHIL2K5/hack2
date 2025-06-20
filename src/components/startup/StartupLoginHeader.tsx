
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface StartupLoginHeaderProps {
  isLogin: boolean;
}

export const StartupLoginHeader = ({ isLogin }: StartupLoginHeaderProps) => (
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
);
