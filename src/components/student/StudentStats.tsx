import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
}

interface StudentStatsProps {
  stats: StatItem[];
}

export const StudentStats = ({ stats }: StudentStatsProps) => {
  const { isMobile } = useResponsive();

  return (
    <ResponsiveGrid
      cols={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
      gap={6}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="group"
        >
          <Card className="glass-card hover:shadow-xl transition-all duration-300 group-hover:border-primary-300">
            <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-xs sm:text-sm font-medium">{stat.title}</p>
                  <p className="text-xl sm:text-3xl font-bold text-primary-700 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 sm:p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </ResponsiveGrid>
  );
};