
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Briefcase, GraduationCap, Building2, Search, TrendingUp, MapPin, Clock, Award, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface AIResponseData {
  type: 'text' | 'job_recommendations' | 'scheme_info' | 'application_status' | 'analytics' | 'career_guidance';
  content: string;
  data?: any;
}

interface EnhancedAIResponseProps {
  response: AIResponseData;
  userRole: string;
}

export const EnhancedAIResponse: React.FC<EnhancedAIResponseProps> = ({ response, userRole }) => {
  const renderJobRecommendations = (jobs: any[]) => (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 mb-3">{response.content}</p>
      <div className="grid gap-3">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-3 border-l-4 border-l-blue-500">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{job.title}</h4>
                  <Badge variant="outline" className="text-xs">{job.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {job.stipend}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.skills?.slice(0, 3).map((skill: string, skillIndex: number) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSchemeInfo = (schemes: any[]) => (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 mb-3">{response.content}</p>
      <div className="grid gap-3">
        {schemes.map((scheme, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-3 border-l-4 border-l-green-500">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{scheme.name}</h4>
                  <Badge variant="outline" className="text-xs text-green-700">
                    {scheme.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Funding: {scheme.funding}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Duration: {scheme.duration}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-600">
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = (analytics: any) => (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 mb-3">{response.content}</p>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(analytics).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-3 text-center">
              <CardContent className="p-0">
                <div className="text-lg font-bold text-blue-600">{value as string}</div>
                <div className="text-xs text-gray-600 capitalize">
                  {key.replace('_', ' ')}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCareerGuidance = (guidance: any) => (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 mb-3">{response.content}</p>
      <div className="space-y-2">
        {guidance.steps?.map((step: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2"
          >
            <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
              {index + 1}
            </div>
            <p className="text-sm text-gray-700">{step}</p>
          </motion.div>
        ))}
      </div>
      {guidance.resources && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-sm mb-2">Recommended Resources:</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {guidance.resources.map((resource: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                {resource}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  switch (response.type) {
    case 'job_recommendations':
      return renderJobRecommendations(response.data || []);
    case 'scheme_info':
      return renderSchemeInfo(response.data || []);
    case 'analytics':
      return renderAnalytics(response.data || {});
    case 'career_guidance':
      return renderCareerGuidance(response.data || {});
    default:
      return (
        <div className="text-sm text-gray-700 whitespace-pre-wrap">
          {response.content}
        </div>
      );
  }
};
