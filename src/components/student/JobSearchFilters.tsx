
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface JobSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  skillFilter: string;
  setSkillFilter: (skill: string) => void;
}

export const JobSearchFilters = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  skillFilter,
  setSkillFilter
}: JobSearchFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <Card className="glass-card border-neutral-200">
        <CardHeader>
          <CardTitle className="text-neutral-800 flex items-center">
            <Search className="w-5 h-5 mr-2 text-primary-600" />
            Search Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-neutral-700 text-sm mb-2 font-medium">Search by title or company</label>
              <Input
                placeholder="e.g. Frontend Developer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-neutral-700 text-sm mb-2 font-medium">Location</label>
              <Input
                placeholder="e.g. Hyderabad"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-neutral-700 text-sm mb-2 font-medium">Skills</label>
              <Input
                placeholder="e.g. React, Python"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
