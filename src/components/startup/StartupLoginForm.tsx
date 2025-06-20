
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  startup: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface StartupLoginFormProps {
  isLogin: boolean;
  showPassword: boolean;
  formData: FormData;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
}

export const StartupLoginForm = ({
  isLogin,
  showPassword,
  formData,
  onSubmit,
  onInputChange,
  onTogglePassword
}: StartupLoginFormProps) => (
  <form onSubmit={onSubmit} className="space-y-6">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
          onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder="Enter password" 
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/50 h-12 text-lg pr-12"
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={onTogglePassword}
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
            onChange={onInputChange}
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
);
