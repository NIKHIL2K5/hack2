
import { dataSyncService } from '@/services/dataSync';
import { applicationSyncService } from '@/services/applicationSync';

export const generateJobRecommendations = (userRole: string, context: string) => {
  const jobs = JSON.parse(localStorage.getItem('platform_job_postings') || '[]');
  const studentJobs = [
    {
      title: "AI Research Intern",
      company: "TechCorp AI Labs",
      location: "Hyderabad",
      stipend: "₹45,000",
      duration: "6 months",
      skills: ["Python", "TensorFlow", "Machine Learning"],
      type: "Research Internship"
    },
    {
      title: "Full Stack Developer",
      company: "StartupTech Solutions",
      location: "Warangal",
      stipend: "₹35,000",
      duration: "6 months",
      skills: ["React", "Node.js", "MongoDB"],
      type: "Full-time Internship"
    }
  ];

  return userRole === 'student' ? [...jobs.slice(0, 3), ...studentJobs] : jobs.slice(0, 5);
};

export const generateSchemeInfo = (userRole: string) => {
  const schemes = [
    {
      name: "T-Hub Startup Accelerator",
      category: "Acceleration",
      description: "Comprehensive startup acceleration program with mentorship and funding opportunities.",
      funding: "Up to ₹50 lakhs",
      duration: "6 months",
      eligibility: "Early-stage startups with innovative ideas"
    },
    {
      name: "TSIC Innovation Challenge",
      category: "Competition",
      description: "Annual innovation challenge for students and entrepreneurs in Telangana.",
      funding: "₹10 lakhs prize",
      duration: "3 months",
      eligibility: "Students and startups in Telangana"
    },
    {
      name: "WE-Hub Women Entrepreneur Program",
      category: "Incubation",
      description: "Supporting women entrepreneurs with funding and mentorship.",
      funding: "Up to ₹25 lakhs",
      duration: "12 months",
      eligibility: "Women-led startups"
    }
  ];

  return userRole === 'startup' ? schemes : schemes.slice(0, 2);
};

export const generateAnalytics = (userRole: string, userEmail: string) => {
  const userActions = dataSyncService.getActionsByUser(userEmail);
  const applications = applicationSyncService.getApplicationsForStudent(userEmail);
  
  switch (userRole) {
    case 'student':
      return {
        applications_sent: applications.length,
        jobs_viewed: userActions.filter(a => a.action.includes('job')).length,
        profile_views: Math.floor(Math.random() * 50) + 10,
        response_rate: `${Math.floor(Math.random() * 30) + 15}%`
      };
    case 'startup':
      const companyApps = applicationSyncService.getApplicationsForCompany(userEmail);
      return {
        job_postings: userActions.filter(a => a.action === 'job_posted').length,
        applications_received: companyApps.length,
        profile_visits: Math.floor(Math.random() * 100) + 50,
        hiring_rate: `${Math.floor(Math.random() * 25) + 10}%`
      };
    case 'official':
      return {
        schemes_managed: Math.floor(Math.random() * 15) + 5,
        applications_processed: Math.floor(Math.random() * 200) + 100,
        success_rate: `${Math.floor(Math.random() * 20) + 70}%`,
        active_programs: Math.floor(Math.random() * 10) + 3
      };
    default:
      return {};
  }
};

export const generateCareerGuidance = (userRole: string, message: string) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('interview')) {
    return {
      steps: [
        "Research the company and role thoroughly",
        "Practice common interview questions",
        "Prepare specific examples using STAR method",
        "Dress professionally and arrive early",
        "Prepare thoughtful questions to ask the interviewer"
      ],
      resources: [
        "Practice on LeetCode for technical roles",
        "Use Glassdoor for company insights",
        "Record yourself practicing answers"
      ]
    };
  } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return {
      steps: [
        "Use a clean, professional format",
        "Tailor your resume to each job application",
        "Quantify your achievements with numbers",
        "Include relevant skills and keywords",
        "Keep it to 1-2 pages maximum"
      ],
      resources: [
        "Use Canva or Google Docs templates",
        "Get feedback from career counselors",
        "Use action verbs to describe experiences"
      ]
    };
  } else if (lowerMessage.includes('skill')) {
    return {
      steps: [
        "Identify industry-relevant skills",
        "Create a learning schedule",
        "Practice with real projects",
        "Build a portfolio to showcase work",
        "Get certified where applicable"
      ],
      resources: [
        "Coursera and edX for online courses",
        "GitHub for project portfolio",
        "LinkedIn Learning for professional skills"
      ]
    };
  }

  return {
    steps: [
      "Define your career goals clearly",
      "Assess your current skills and gaps",
      "Network with industry professionals",
      "Gain relevant experience through internships",
      "Keep learning and stay updated"
    ],
    resources: [
      "Join professional associations",
      "Attend industry conferences and meetups",
      "Follow industry leaders on social media"
    ]
  };
};
