import React, { createContext, useContext, useState } from 'react';
import { dataSyncService } from '@/services/dataSync';
import { applicationSyncService } from '@/services/applicationSync';

interface AIContextType {
  askEnhancedAI: (message: string, context?: string, image?: File) => Promise<any>;
  isAIThinking: boolean;
  userRole: string;
  userName: string;
  aiMemory: any;
}

const EnhancedAIContext = createContext<AIContextType | undefined>(undefined);

export const useEnhancedAI = () => {
  const context = useContext(EnhancedAIContext);
  if (!context) {
    throw new Error('useEnhancedAI must be used within an EnhancedAIProvider');
  }
  return context;
};

// Comprehensive FAQ database with your provided Q&A
const STUDENT_FAQ = {
  'apply job internship': '**How to Apply for Jobs/Internships:**\n\n➡️ Go to the Job Board, use filters, click "Apply," fill the form, and submit your resume.',
  
  'track application': '**Application Tracking:**\n\n➡️ Yes, use the Application Tracker to see statuses like Applied → Reviewed → Interview → Offer.',
  
  'smart job suggestion': '**Smart Job Suggestions:**\n\n➡️ It analyzes your profile, skills, and past activity to recommend personalized jobs.',
  
  'upload resume multiple update': '**Resume Management:**\n\n➡️ Yes. Visit your Profile page and upload a new resume anytime.',
  
  'verified jobs': '**Job Verification:**\n\n➡️ Yes. All jobs are verified by our team or posted by registered startups.',
  
  'save jobs later': '**Save Jobs Feature:**\n\n➡️ Yes. Click "Save Job" and check your saved section under Job Board.',
  
  'login issues': '**Login Troubleshooting:**\n\n➡️ Try resetting your password. If the issue persists, contact support.',
  
  'delete account': '**Account Deletion:**\n\n➡️ Yes. Go to Profile > Settings and request account deletion.',
  
  'email notifications': '**Email Notifications:**\n\n➡️ Yes. You\'ll receive alerts for interview calls, status changes, and new matches.',
  
  'telugu language switch': '**Language Switch:**\n\n➡️ Use the toggle in the top-right corner to change between English and Telugu.',
  
  'platform free students': '**Platform Cost:**\n\n➡️ Yes. GovStartup Navigator is completely free for students.',
  
  'contact startup after applying': '**Contacting Startups:**\n\n➡️ Once shortlisted, you\'ll get their contact info or a direct interview link.',
  
  'what kind jobs posted': '**Types of Jobs:**\n\n➡️ Internships, Full-time, Research, and Part-time jobs across tech and non-tech sectors.',
  
  'job board updated': '**Job Board Updates:**\n\n➡️ Daily. New opportunities are added by startups and officials.',
  
  'feedback profile': '**Profile Feedback:**\n\n➡️ Yes. Use the AI assistant or ask mentors for suggestions via chatbot.',
  
  'application history': '**Application History:**\n\n➡️ Yes, the Application Tracker maintains all your past job records.',
  
  'export application data': '**Data Export:**\n\n➡️ Not yet, but we are working on a PDF download feature.',
  
  'improve selection chances': '**Improve Selection Chances:**\n\n➡️ Fill your profile completely, upload a clean resume, and tailor your cover letters.',
  
  'resume template': '**Resume Templates:**\n\n➡️ Yes, visit the Resources section for resume samples and templates.',
  
  'ai career guidance': '**AI Career Guidance:**\n\n➡️ Yes. Our AI assistant is trained to give basic guidance and tips.'
};

const STARTUP_FAQ = {
  'post job internship': '**Posting Jobs:**\n\n➡️ Click "Post Job" in your dashboard and fill out the form.',
  
  'see applicants': '**View Applicants:**\n\n➡️ Go to "Applications" under the Job section to view candidates and resumes.',
  
  'compliance checklist': '**Compliance Checklist:**\n\n➡️ Yes, use the Compliance Tracker in your dashboard to track legal requirements.',
  
  'edit remove job posting': '**Edit/Remove Jobs:**\n\n➡️ Click on the posted job and select Edit or Delete from the options.',
  
  'track startup performance': '**Performance Tracking:**\n\n➡️ Yes, see analytics and stats in your Startup Insights widget.',
  
  'chatbot discover schemes': '**Discover Schemes:**\n\n➡️ Ask it things like "Show me MSME schemes for food startups."',
  
  'chatbot multilingual': '**Multilingual Support:**\n\n➡️ Yes. It works in English and Telugu.',
  
  'complete compliance faster': '**Faster Compliance:**\n\n➡️ Follow the visual checklist, and you\'ll get automated alerts and suggestions.',
  
  'upload company documents': '**Document Upload:**\n\n➡️ Yes. Go to Profile > Uploads and submit GST, MSME, PAN, etc.',
  
  'sentiment analysis work': '**Sentiment Analysis:**\n\n➡️ We use AI to analyze feedback and assign sentiment tags like Positive/Negative.',
  
  'contact shortlisted students': '**Contact Students:**\n\n➡️ Yes. You\'ll receive contact info once you shortlist or schedule interviews.',
  
  'pay post jobs': '**Posting Fees:**\n\n➡️ No. It\'s free for verified startups under Telangana Govt. programs.',
  
  'startup data secure': '**Data Security:**\n\n➡️ We use secure encrypted storage and token-based access.',
  
  'post telugu': '**Telugu Posting:**\n\n➡️ Yes. Use the language toggle when creating your job or scheme.',
  
  'track applications status': '**Application Status:**\n\n➡️ Yes. You\'ll see a progress bar showing how many students applied, are shortlisted, etc.'
};

const OFFICIAL_FAQ = {
  'add new scheme': '**Add Scheme:**\n\n➡️ Go to Scheme Management and click "Add Scheme."',
  
  'edit delete schemes': '**Edit/Delete Schemes:**\n\n➡️ Yes. Click on any scheme to edit or remove it.',
  
  'monitor startups': '**Startup Monitoring:**\n\n➡️ Visit the Startup Monitoring Table for a list of all registered startups with KYC status.',
  
  'heatmap show': '**Heatmap Information:**\n\n➡️ It visualizes startup activity and job stats across Telangana districts.',
  
  'sentiment analysis help': '**Sentiment Analysis Benefits:**\n\n➡️ It flags feedback trends to help you improve schemes and services.',
  
  'export startup job data': '**Data Export:**\n\n➡️ Yes. Go to Analytics and click "Export CSV."',
  
  'verify startup compliance': '**Compliance Verification:**\n\n➡️ Check the Compliance Tracker for document status and alerts.',
  
  'switch language telugu': '**Language Switch:**\n\n➡️ Yes. Use the toggle at the top of your dashboard.',
  
  'assign mentor startups': '**Mentor Assignment:**\n\n➡️ Currently manual; a future update will allow assigning mentors via the dashboard.',
  
  'contact startups directly': '**Contact Startups:**\n\n➡️ Yes. You\'ll find contact details in their profile section.'
};

const GENERAL_FAQ = {
  'what govstartup navigator': '**About GovStartup Navigator:**\n\n➡️ It\'s a unified platform connecting students, startups, and officials in Telangana for jobs, internships, and innovation.',
  
  'data safe secure': '**Data Safety:**\n\n➡️ Yes. We use secure authentication, encrypted storage, and token-based access.',
  
  'change role signup': '**Role Changes:**\n\n➡️ No, but you can create a new account or request role change via support.',
  
  'contact support': '**Support Contact:**\n\n➡️ Click "Help" or use the chatbot to raise a support request.',
  
  'platform expand states': '**Platform Expansion:**\n\n➡️ Yes. Telangana is the pilot, but expansion is planned for other regions.'
};

export const EnhancedAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAIThinking, setIsAIThinking] = useState(false);

  // Get user info from localStorage
  const getUserInfo = () => {
    const studentUser = JSON.parse(localStorage.getItem('studentUser') || '{}');
    const officialUser = JSON.parse(localStorage.getItem('officialUser') || '{}');
    const startupAuth = JSON.parse(localStorage.getItem('startupAuth') || '{}');

    if (studentUser.email) {
      return { role: 'student', name: studentUser.name || 'Student', email: studentUser.email };
    } else if (officialUser.email) {
      return { role: 'official', name: officialUser.name || 'Official', email: officialUser.email };
    } else if (startupAuth.user) {
      return { role: 'startup', name: startupAuth.user.name || 'Startup', email: startupAuth.user.email };
    }
    return { role: 'guest', name: 'User', email: '' };
  };

  const userInfo = getUserInfo();

  // Enhanced FAQ matching function with fuzzy search
  const findFAQAnswer = (message: string, userRole: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    // Determine which FAQ set to search based on user role
    let faqSet = GENERAL_FAQ;
    if (userRole === 'student') {
      faqSet = { ...STUDENT_FAQ, ...GENERAL_FAQ };
    } else if (userRole === 'startup') {
      faqSet = { ...STARTUP_FAQ, ...GENERAL_FAQ };
    } else if (userRole === 'official') {
      faqSet = { ...OFFICIAL_FAQ, ...GENERAL_FAQ };
    }
    
    // Direct keyword matching
    for (const [key, answer] of Object.entries(faqSet)) {
      const keywords = key.split(' ');
      if (keywords.every(keyword => lowerMessage.includes(keyword))) {
        return answer;
      }
    }
    
    // Fuzzy matching for common variations
    const fuzzyMatches = [
      // Student specific matches
      { patterns: ['how', 'apply'], answer: STUDENT_FAQ['apply job internship'] },
      { patterns: ['track', 'application'], answer: STUDENT_FAQ['track application'] },
      { patterns: ['save', 'job'], answer: STUDENT_FAQ['save jobs later'] },
      { patterns: ['resume', 'upload'], answer: STUDENT_FAQ['upload resume multiple update'] },
      { patterns: ['notification', 'email'], answer: STUDENT_FAQ['email notifications'] },
      { patterns: ['telugu', 'language'], answer: STUDENT_FAQ['telugu language switch'] },
      { patterns: ['free', 'cost', 'price'], answer: STUDENT_FAQ['platform free students'] },
      { patterns: ['login', 'issue', 'problem'], answer: STUDENT_FAQ['login issues'] },
      { patterns: ['delete', 'account'], answer: STUDENT_FAQ['delete account'] },
      { patterns: ['verified', 'jobs'], answer: STUDENT_FAQ['verified jobs'] },
      
      // Startup specific matches
      { patterns: ['post', 'job'], answer: STARTUP_FAQ['post job internship'] },
      { patterns: ['applicants', 'candidates'], answer: STARTUP_FAQ['see applicants'] },
      { patterns: ['compliance'], answer: STARTUP_FAQ['compliance checklist'] },
      { patterns: ['edit', 'job'], answer: STARTUP_FAQ['edit remove job posting'] },
      { patterns: ['performance', 'analytics'], answer: STARTUP_FAQ['track startup performance'] },
      { patterns: ['documents', 'upload'], answer: STARTUP_FAQ['upload company documents'] },
      
      // Official specific matches
      { patterns: ['add', 'scheme'], answer: OFFICIAL_FAQ['add new scheme'] },
      { patterns: ['monitor', 'startup'], answer: OFFICIAL_FAQ['monitor startups'] },
      { patterns: ['heatmap'], answer: OFFICIAL_FAQ['heatmap show'] },
      { patterns: ['export', 'data'], answer: OFFICIAL_FAQ['export startup job data'] },
      
      // General matches
      { patterns: ['what', 'govstartup'], answer: GENERAL_FAQ['what govstartup navigator'] },
      { patterns: ['safe', 'secure', 'data'], answer: GENERAL_FAQ['data safe secure'] },
      { patterns: ['support', 'help'], answer: GENERAL_FAQ['contact support'] }
    ];
    
    for (const match of fuzzyMatches) {
      if (match.patterns.every(pattern => lowerMessage.includes(pattern))) {
        return match.answer;
      }
    }
    
    return null;
  };

  const generateJobRecommendations = (userRole: string, context: string) => {
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

  const generateSchemeInfo = (userRole: string) => {
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

  const generateAnalytics = (userRole: string, userEmail: string) => {
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

  const generateCareerGuidance = (userRole: string, message: string) => {
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

  const askEnhancedAI = async (message: string, context?: string, image?: File): Promise<any> => {
    setIsAIThinking(true);
    
    try {
      // Store conversation in AI memory
      dataSyncService.storeAIMemory(userInfo.email, userInfo.role, {
        message,
        context,
        timestamp: new Date().toISOString()
      });

      // Check for FAQ answers first using the enhanced matching
      const faqAnswer = findFAQAnswer(message, userInfo.role);
      if (faqAnswer) {
        return {
          type: 'text',
          content: faqAnswer
        };
      }

      const lowerMessage = message.toLowerCase();
      
      // Determine response type based on message content
      if (lowerMessage.includes('job') && (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('find'))) {
        const jobs = generateJobRecommendations(userInfo.role, context || '');
        return {
          type: 'job_recommendations',
          content: `Based on your profile and preferences, here are some recommended opportunities for you:`,
          data: jobs
        };
      }
      
      if (lowerMessage.includes('scheme') || lowerMessage.includes('funding') || lowerMessage.includes('grant')) {
        const schemes = generateSchemeInfo(userInfo.role);
        return {
          type: 'scheme_info',
          content: `Here are relevant government schemes and funding opportunities:`,
          data: schemes
        };
      }
      
      if (lowerMessage.includes('analytic') || lowerMessage.includes('stat') || lowerMessage.includes('dashboard') || lowerMessage.includes('performance')) {
        const analytics = generateAnalytics(userInfo.role, userInfo.email);
        return {
          type: 'analytics',
          content: `Here's your current performance analytics:`,
          data: analytics
        };
      }
      
      if (lowerMessage.includes('career') || lowerMessage.includes('guidance') || lowerMessage.includes('advice') || lowerMessage.includes('help')) {
        const guidance = generateCareerGuidance(userInfo.role, message);
        return {
          type: 'career_guidance',
          content: `Here's personalized career guidance for you:`,
          data: guidance
        };
      }

      // Enhanced general responses based on role and context
      let response = '';
      
      if (userInfo.role === 'student') {
        if (lowerMessage.includes('application')) {
          const applications = applicationSyncService.getApplicationsForStudent(userInfo.email);
          response = `You have submitted ${applications.length} job applications. Here's the status breakdown:\n\n`;
          const statusCounts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          Object.entries(statusCounts).forEach(([status, count]) => {
            response += `• ${status.charAt(0).toUpperCase() + status.slice(1)}: ${count}\n`;
          });
          
          if (applications.length > 0) {
            response += `\nYour most recent application was for "${applications[applications.length - 1].jobTitle}" at ${applications[applications.length - 1].companyName}.`;
          }
        } else if (lowerMessage.includes('profile')) {
          response = `Your student profile shows you're actively seeking opportunities. To improve your chances:\n\n• Keep your skills section updated\n• Add relevant projects to your portfolio\n• Write compelling cover letters\n• Follow up on applications professionally\n\nWould you like specific advice on any of these areas?`;
        } else {
          response = `As a student on our platform, I can help you with:\n\n• Finding relevant job opportunities\n\n• Application tracking and status\n\n• Career guidance and skill development\n\n• Interview preparation tips\n\n• Resume optimization\n\n• Government schemes for students\n\nWhat specific assistance do you need today?`;
        }
      } else if (userInfo.role === 'startup') {
        if (lowerMessage.includes('hiring') || lowerMessage.includes('recruit')) {
          const userActions = dataSyncService.getActionsByUser(userInfo.email);
          const jobPostings = userActions.filter(a => a.action === 'job_posted').length;
          response = `You've posted ${jobPostings} job(s) so far. Here are some hiring best practices:\n\n• Write clear, detailed job descriptions\n\n• Specify required skills and experience\n\n• Offer competitive compensation\n\n• Respond to applications promptly\n\n• Provide feedback to candidates\n\nNeed help optimizing your job postings?`;
        } else if (lowerMessage.includes('funding') || lowerMessage.includes('scheme')) {
          response = `As a startup, you have access to various funding opportunities:\n\n• T-Hub Incubation Program\n\n• Telangana State Innovation Cell (TSIC)\n\n• MSME Development Schemes\n\n• Angel Tax Exemption\n\n• Startup India initiatives\n\nI can provide detailed information about eligibility and application processes for any of these schemes.`;
        } else {
          response = `As a startup on our platform, I can assist you with:\n\n• Posting and managing job openings\n\n• Reviewing candidate applications\n\n• Accessing government funding schemes\n\n• Compliance requirements\n\n• Hiring best practices\n\n• Market insights and analytics\n\nWhat would you like to know more about?`;
        }
      } else if (userInfo.role === 'official') {
        response = `As a government official, I can help you with:\n\n• Managing government schemes and programs\n\n• Monitoring application processes\n\n• Tracking scheme effectiveness\n\n• Policy implementation guidance\n\n• Startup ecosystem analytics\n\n• Compliance monitoring\n\nHow can I assist you with your administrative duties today?`;
      } else {
        response = `Welcome to our comprehensive career and startup platform! I can help you with:\n\n• Job search and career guidance\n\n• Startup funding and schemes\n\n• Application tracking\n\n• Market insights\n\n• Skill development advice\n\nPlease let me know what you'd like to explore!`;
      }

      return {
        type: 'text',
        content: response
      };
    } catch (error) {
      console.error('Enhanced AI Error:', error);
      return {
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again, and I'll do my best to provide comprehensive assistance."
      };
    } finally {
      setIsAIThinking(false);
    }
  };

  const aiMemory = dataSyncService.getUserAIMemory(userInfo.email);

  return (
    <EnhancedAIContext.Provider
      value={{
        askEnhancedAI,
        isAIThinking,
        userRole: userInfo.role,
        userName: userInfo.name,
        aiMemory
      }}
    >
      {children}
    </EnhancedAIContext.Provider>
  );
};
