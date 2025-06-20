
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, XCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ApplicationStatsProps {
  stats: {
    total: number;
    pending: number;
    reviewed: number;
    shortlisted: number;
    rejected: number;
  };
}

export const ApplicationStats = ({ stats }: ApplicationStatsProps) => {
  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: FileText,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700"
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700"
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: CheckCircle,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-100",
      textColor: "text-green-700"
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-100",
      textColor: "text-red-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
