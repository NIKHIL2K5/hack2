
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <User className="w-16 h-16 text-white/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
          <p className="text-white/70">Manage your account settings and preferences</p>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfileSettings;
