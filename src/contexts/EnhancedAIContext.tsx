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

// Predefined answers for common student questions
const STUDENT_FAQ = {
  'apply job internship': '**How to Apply for Jobs/Internships:**\n\n1. Go to the **Job Board** from your dashboard\n2. Use **filters** to find relevant opportunities\n3. Click **"Apply"** on any job you like\n4. Fill the application form with your details\n5. Upload your **resume** and submit\n\n✅ Your application will be tracked automatically!',
  
  'track application': '**Application Tracking:**\n\nYes! Use the **Application Tracker** to monitor all your applications.\n\n📊 **Status Flow:**\nApplied → Reviewed → Interview → Offer/Rejection\n\n🔍 You can see:\n• Application date\n• Current status\n• Company responses\n• Interview schedules',
  
  'smart job suggestion': '**Smart Job Recommendations:**\n\n🤖 Our AI analyzes:\n• Your profile & skills\n• Past application history\n• Saved jobs & preferences\n• Academic background\n\n💡 It then suggests **personalized opportunities** that match your profile for higher success rates!',
  
  'upload resume': '**Resume Management:**\n\n✅ **Yes, you can:**\n• Upload multiple resume versions\n• Update your existing resume anytime\n• Download your uploaded resumes\n\n📝 **How to update:**\n1. Go to **Profile → Settings**\n2. Click **"Upload Resume"**\n3. Select your new file\n4. Save changes',
  
  'verified jobs': '**Job Verification:**\n\n✅ **All jobs are verified!**\n\n🔐 **Our verification process:**\n• Jobs reviewed by our team\n• Posted by registered startups only\n• Company credentials verified\n• Regular monitoring for authenticity\n\n🛡️ You can apply with confidence!',
  
  'save jobs': '**Save Jobs Feature:**\n\n✅ **Yes, you can save jobs!**\n\n📌 **How to save:**\n1. Click **"Save Job"** on any listing\n2. Access saved jobs in **Job Board → Saved**\n3. Apply to saved jobs anytime\n\n💡 **Tip:** Save interesting jobs to apply later when you have time to craft good applications!',
  
  'login issues': '**Login Troubleshooting:**\n\n🔧 **Try these steps:**\n1. **Reset Password** - Click "Forgot Password"\n2. **Clear browser cache** and cookies\n3. **Check email** for verification links\n4. **Try different browser** or incognito mode\n\n❌ **Still having issues?**\nContact our support team - we\'ll help you within 24 hours!',
  
  'delete account': '**Account Deletion:**\n\n✅ **Yes, you can delete your account.**\n\n⚠️ **Steps:**\n1. Go to **Profile → Settings**\n2. Scroll to **Account Management**\n3. Click **"Request Account Deletion"**\n4. Confirm your decision\n\n📧 **Note:** This action is permanent and cannot be undone. All your data will be removed.',
  
  'email notifications': '**Email Notifications:**\n\n✅ **Yes, you\'ll receive alerts for:**\n• 📧 Interview calls & schedules\n• 📈 Application status changes\n• 🎯 New job matches for your profile\n• 🔔 Important updates from companies\n\n⚙️ **Customize notifications** in Profile → Settings → Notifications',
  
  'telugu language': '**Language Switch:**\n\n🇮🇳 **Switch to Telugu:**\n1. Look for the **language toggle** in the top-right corner\n2. Click to switch between **English ↔ తెలుగు**\n3. The entire interface will change\n\n💡 **Note:** All job postings and applications support both languages!',
  
  'platform free': '**Platform Cost:**\n\n✅ **Completely FREE for students!**\n\n🎓 **What\'s included at no cost:**\n• Unlimited job applications\n• Profile creation & management\n• Application tracking\n• AI assistance & career guidance\n• Resume uploads & updates\n\n💰 **No hidden fees, no premium plans needed!**',
  
  'contact startup': '**Contacting Startups:**\n\n📞 **After applying:**\n1. Wait for **shortlisting notification**\n2. You\'ll receive **contact details** or **interview link**\n3. Some companies may **call directly**\n\n💼 **Professional tip:** Always be ready for unexpected interview calls!',
  
  'job types': '**Types of Jobs Available:**\n\n💼 **Job Categories:**\n• 🔬 **Internships** (3-6 months)\n• 💪 **Full-time positions**\n• 📚 **Research opportunities**\n• ⏰ **Part-time & flexible work**\n\n🎯 **Sectors:** Tech, Non-tech, Government, Startups, NGOs, and more!',
  
  'job board updates': '**Job Board Updates:**\n\n📅 **Updated daily!**\n\n🔄 **Fresh opportunities added by:**\n• Verified startups\n• Government officials\n• Partner organizations\n• Recruitment teams\n\n⏰ **Best time to check:** Morning hours for newest listings!',
  
  'profile feedback': '**Profile Feedback:**\n\n✅ **Get feedback through:**\n• 🤖 **AI Assistant** - Ask me for profile tips!\n• 👥 **Mentor consultations** via chatbot\n• 📊 **Profile completion score**\n• 💡 **Automated suggestions**\n\n💬 **Just ask:** "Review my profile" or "How to improve my chances?"',
  
  'application history': '**Application History:**\n\n✅ **Yes, full history available!**\n\n📊 **Application Tracker shows:**\n• All past applications\n• Application dates & status\n• Company responses\n• Interview records\n• Success/rejection reasons\n\n📈 **Use it to improve your future applications!**',
  
  'export data': '**Data Export:**\n\n🚧 **Coming Soon!**\n\nWe\'re working on a **PDF download feature** that will include:\n• Application history\n• Profile summary\n• Achievement records\n\n📧 **Stay tuned** for updates - this feature will be available soon!',
  
  'improve selection chances': '**Boost Your Selection Chances:**\n\n🎯 **Proven tips:**\n• ✅ **Complete profile 100%**\n• 📄 **Upload clean, ATS-friendly resume**\n• 📝 **Write tailored cover letters**\n• 🎯 **Apply to relevant jobs only**\n• 📞 **Follow up professionally**\n• 💼 **Highlight relevant skills & projects**',
  
  'resume template': '**Resume Templates:**\n\n✅ **Yes, templates available!**\n\n📄 **Access templates:**\n1. Go to **Resources** section\n2. Download **resume samples**\n3. Use **ATS-friendly formats**\n4. Follow **industry-specific templates**\n\n💡 **Pro tip:** Customize templates with your information for best results!',
  
  'career guidance ai': '**AI Career Guidance:**\n\n✅ **Absolutely! I can help with:**\n• 📈 **Career planning & roadmaps**\n• 📝 **Resume & interview tips**\n• 🎯 **Skill development advice**\n• 💼 **Job search strategies**\n• 📓 **Course & certification recommendations**\n\n💬 **Just ask specific questions** and I\'ll provide detailed, personalized guidance!'
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

  // Function to check if message matches any FAQ
  const findFAQAnswer = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, answer] of Object.entries(STUDENT_FAQ)) {
      if (key.split(' ').every(keyword => lowerMessage.includes(keyword))) {
        return answer;
      }
    }
    
    // Additional pattern matching for common variations
    if (lowerMessage.includes('how') && (lowerMessage.includes('apply') || lowerMessage.includes('job'))) {
      return STUDENT_FAQ['apply job internship'];
    }
    
    if (lowerMessage.includes('track') && lowerMessage.includes('application')) {
      return STUDENT_FAQ['track application'];
    }
    
    if (lowerMessage.includes('save') && lowerMessage.includes('job')) {
      return STUDENT_FAQ['save jobs'];
    }
    
    if (lowerMessage.includes('resume') && (lowerMessage.includes('upload') || lowerMessage.includes('update'))) {
      return STUDENT_FAQ['upload resume'];
    }
    
    if (lowerMessage.includes('notification') || lowerMessage.includes('email')) {
      return STUDENT_FAQ['email notifications'];
    }
    
    if (lowerMessage.includes('telugu') || lowerMessage.includes('language')) {
      return STUDENT_FAQ['telugu language'];
    }
    
    if (lowerMessage.includes('free') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return STUDENT_FAQ['platform free'];
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

      // Check for FAQ answers first (especially for students)
      if (userInfo.role === 'student') {
        const faqAnswer = findFAQAnswer(message);
        if (faqAnswer) {
          return {
            type: 'text',
            content: faqAnswer
          };
        }
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
          response = `As a student on our platform, I can help you with:\n\n• Finding relevant job opportunities\n• Application tracking and status\n• Career guidance and skill development\n• Interview preparation tips\n• Resume optimization\n• Government schemes for students\n\nWhat specific assistance do you need today?`;
        }
      } else if (userInfo.role === 'startup') {
        if (lowerMessage.includes('hiring') || lowerMessage.includes('recruit')) {
          const userActions = dataSyncService.getActionsByUser(userInfo.email);
          const jobPostings = userActions.filter(a => a.action === 'job_posted').length;
          response = `You've posted ${jobPostings} job(s) so far. Here are some hiring best practices:\n\n• Write clear, detailed job descriptions\n• Specify required skills and experience\n• Offer competitive compensation\n• Respond to applications promptly\n• Provide feedback to candidates\n\nNeed help optimizing your job postings?`;
        } else if (lowerMessage.includes('funding') || lowerMessage.includes('scheme')) {
          response = `As a startup, you have access to various funding opportunities:\n\n• T-Hub Incubation Program\n• Telangana State Innovation Cell (TSIC)\n• MSME Development Schemes\n• Angel Tax Exemption\n• Startup India initiatives\n\nI can provide detailed information about eligibility and application processes for any of these schemes.`;
        } else {
          response = `As a startup on our platform, I can assist you with:\n\n• Posting and managing job openings\n• Reviewing candidate applications\n• Accessing government funding schemes\n• Compliance requirements\n• Hiring best practices\n• Market insights and analytics\n\nWhat would you like to know more about?`;
        }
      } else if (userInfo.role === 'official') {
        response = `As a government official, I can help you with:\n\n• Managing government schemes and programs\n• Monitoring application processes\n• Tracking scheme effectiveness\n• Policy implementation guidance\n• Startup ecosystem analytics\n• Compliance monitoring\n\nHow can I assist you with your administrative duties today?`;
      } else {
        response = `Welcome to our comprehensive career and startup platform! I can help you with:\n\n• Job search and career guidance\n• Startup funding and schemes\n• Application tracking\n• Market insights\n• Skill development advice\n\nPlease let me know what you'd like to explore!`;
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
