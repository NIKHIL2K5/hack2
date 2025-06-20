
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeedbackSentiment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 text-white">
      <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/official">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Feedback & Sentiment Analysis</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <MessageSquare className="w-16 h-16 text-white/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Sentiment Analysis Dashboard</h2>
          <p className="text-white/70">Monitor and analyze user feedback sentiment</p>
        </motion.div>
      </main>
    </div>
  );
};

export default FeedbackSentiment;
