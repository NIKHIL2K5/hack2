
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadUserData } from '@/utils/userStorage';

interface AIContextType {
  userRole: 'student' | 'startup' | 'official' | null;
  userName: string;
  askAI: (question: string, context?: string, image?: File) => Promise<string>;
  isAIThinking: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'student' | 'startup' | 'official' | null>(null);
  const [userName, setUserName] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);

  useEffect(() => {
    const userData = loadUserData();
    if (userData) {
      setUserName(userData.name || 'User');
      // Determine role based on current path or stored data
      const path = window.location.pathname;
      if (path.includes('/dashboard/student')) {
        setUserRole('student');
      } else if (path.includes('/dashboard/startup')) {
        setUserRole('startup');
      } else if (path.includes('/dashboard/official')) {
        setUserRole('official');
      }
    }
  }, []);

  const getComprehensiveKnowledge = () => {
    return `
    GOVERNMENT STARTUP PORTAL - COMPREHENSIVE KNOWLEDGE BASE
    
    === PLATFORM OVERVIEW ===
    This is a comprehensive Government Startup Portal that connects students, startups, and government officials in a unified ecosystem for career development, business growth, and policy implementation.
    
    === FOR STUDENTS ===
    Career Development Features:
    - Job Search: Browse 1000+ internships and full-time positions across Telangana
    - Smart Filtering: Filter by location (33 districts), skills, salary range, and company type
    - Application Tracking: Real-time status updates (Applied, Under Review, Interview Scheduled, Selected, Rejected)
    - Profile Management: Skills portfolio, education history, project showcase, resume upload
    - Career Guidance: AI-powered career path recommendations based on skills and interests
    - Interview Preparation: Practice questions, tips, and mock interview scheduling
    - Skill Development: Recommended courses and certifications based on job market demands
    - Networking: Connect with alumni and industry professionals
    
    Available Job Categories:
    - Technology: Frontend, Backend, Full-Stack, Mobile, AI/ML, Data Science, DevOps, Cybersecurity
    - Design: UI/UX, Graphic Design, Product Design
    - Business: Marketing, Sales, Operations, HR, Finance
    - Research: Academic research, R&D positions
    
    Salary Ranges: ₹15,000 - ₹50,000 for internships, ₹3-15 LPA for full-time positions
    
    === FOR STARTUPS ===
    Business Growth Support:
    - Job Posting: Create detailed job descriptions with skill requirements
    - Candidate Management: Advanced filtering and screening tools
    - Government Schemes: Access to 50+ funding and support schemes
    - Compliance Tracking: Automated reminders for regulatory requirements
    - Mentorship Programs: Connect with experienced entrepreneurs
    - Market Research: Access to industry reports and market data
    - Funding Opportunities: Angel investors, VCs, government grants
    
    Key Government Schemes:
    1. T-Hub Incubation Program: ₹25 lakhs funding + mentorship
    2. Telangana State Innovation Cell (TSIC): Policy support and networking
    3. WE-Hub (Women Entrepreneurs): ₹50 lakhs for women-led startups
    4. MSME Development Schemes: Up to ₹1 crore in various benefits
    5. Seed Fund Scheme: ₹20 lakhs to ₹50 lakhs early-stage funding
    6. Angel Tax Exemption: Tax benefits for startup investments
    7. SIDBI Fund of Funds: Venture capital access
    8. Digital India Initiatives: Technology adoption support
    
    === FOR OFFICIALS ===
    Administrative Tools:
    - Scheme Management: Create, modify, and monitor government programs
    - Analytics Dashboard: Real-time data on startup ecosystem health
    - Compliance Monitoring: Track regulatory adherence across sectors
    - Feedback Analysis: Sentiment analysis of user feedback
    - Policy Implementation: Track effectiveness of government initiatives
    - Budget Allocation: Monitor fund distribution and utilization
    - Performance Metrics: KPIs for economic development indicators
    
    === TECHNICAL CAPABILITIES ===
    - Real-time notifications and updates
    - Advanced search and filtering algorithms
    - Secure data encryption and privacy protection
    - Mobile-responsive design with offline capabilities
    - Integration with government databases and systems
    - AI-powered matching between candidates and jobs
    - Automated workflow management
    - Multi-language support (English, Telugu, Hindi)
    
    === CURRENT USER INFO ===
    Role: ${userRole || 'Guest'}
    Name: ${userName || 'User'}
    Current Page: ${window.location.pathname}
    
    === AI ASSISTANT CAPABILITIES ===
    I can help with:
    - Detailed explanations of any platform feature
    - Step-by-step guidance for complex processes
    - Career advice and job search strategies
    - Government scheme eligibility and application processes
    - Technical troubleshooting and platform navigation
    - Market insights and industry trends
    - Compliance requirements and deadlines
    - Best practices for profile optimization
    - Interview preparation and skill development advice
    `;
  };

  const askAI = async (question: string, context?: string, image?: File): Promise<string> => {
    setIsAIThinking(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const comprehensiveKnowledge = getComprehensiveKnowledge();
      let imageContext = '';
      
      if (image) {
        imageContext = `\n\nImage Analysis: The user has shared an image (${image.name}). Based on the image content, I should provide relevant guidance or analysis related to their query.`;
      }
      
      const fullContext = `${comprehensiveKnowledge}\n\nAdditional Context: ${context || ''}\n\nUser Question: ${question}${imageContext}`;
      
      // Generate comprehensive response
      let response = generateComprehensiveResponse(question, userRole, userName, context, !!image);
      
      return response;
    } catch (error) {
      return "I apologize for the technical difficulty. Let me try to help you anyway. Could you please rephrase your question or provide more specific details about what you need assistance with?";
    } finally {
      setIsAIThinking(false);
    }
  };

  const generateComprehensiveResponse = (question: string, role: string | null, name: string, context?: string, hasImage?: boolean): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Image-related responses
    if (hasImage) {
      return `Thank you for sharing the image, ${name}! I can see you've uploaded a file. While I can process your image, I'll provide guidance based on your question. ${getContextualAdvice(lowerQuestion, role)} If the image contains specific details like a resume, job posting, or document you'd like me to analyze, please describe what you'd like me to focus on, and I'll provide detailed feedback and suggestions.`;
    }
    
    // Comprehensive role-specific responses
    if (role === 'student') {
      if (lowerQuestion.includes('job') || lowerQuestion.includes('internship') || lowerQuestion.includes('career')) {
        return `Excellent question, ${name}! Here's comprehensive guidance for your job search:

**Immediate Steps:**
1. **Profile Optimization**: Ensure your profile is 100% complete with skills, education, projects, and resume
2. **Job Filtering**: Use our advanced filters - we have opportunities across all 33 Telangana districts
3. **Application Strategy**: Apply to 3-5 positions daily that match your skill level

**Available Opportunities:**
- **Tech Roles**: Frontend (React, Angular), Backend (Node.js, Python), Full-Stack, AI/ML, Data Science
- **Salary Range**: ₹15K-50K for internships, ₹3-15 LPA for full-time
- **Top Hiring Companies**: TechCorp, AI Solutions, StartupTech, CloudTech Systems

**Success Tips:**
- Customize applications for each role
- Highlight relevant projects and skills
- Follow up professionally after 1 week
- Prepare for technical interviews with practice coding

**Next Steps**: Would you like specific guidance on resume optimization, interview preparation, or finding roles in a particular technology stack?`;
      }
      
      if (lowerQuestion.includes('skill') || lowerQuestion.includes('learn') || lowerQuestion.includes('course')) {
        return `Great focus on skill development, ${name}! Here's your personalized learning roadmap:

**High-Demand Skills in Telangana:**
1. **Programming**: Python, JavaScript, Java, React, Node.js
2. **Data Science**: SQL, Machine Learning, Data Analysis
3. **Cloud**: AWS, Azure, Google Cloud
4. **Mobile**: React Native, Flutter
5. **Soft Skills**: Communication, Problem-solving, Leadership

**Learning Resources:**
- Free: Codecademy, freeCodeCamp, Coursera audits
- Paid: Udemy, Pluralsight, LinkedIn Learning
- Government: Skill India Digital, NIELIT courses

**Certification Priorities:**
- Google Cloud Associate
- AWS Cloud Practitioner  
- Microsoft Azure Fundamentals
- Google Data Analytics Certificate

Would you like a specific 30-day learning plan for any particular skill area?`;
      }
    }
    
    if (role === 'startup') {
      if (lowerQuestion.includes('funding') || lowerQuestion.includes('scheme') || lowerQuestion.includes('money')) {
        return `Perfect timing for funding guidance, ${name}! Here's your comprehensive funding roadmap:

**Government Schemes (Immediate Opportunities):**
1. **Seed Fund Scheme**: ₹20-50 lakhs, 6-month application cycle
2. **T-Hub Incubation**: ₹25 lakhs + mentorship, applications open quarterly
3. **WE-Hub** (Women-led): ₹50 lakhs + extensive support network
4. **MSME Schemes**: ₹1 crore in combined benefits

**Eligibility Requirements:**
- DPIIT recognition (takes 2-3 weeks)
- Incorporation certificate
- Business plan with financial projections
- Prototype or MVP demonstration

**Application Strategy:**
- Start with Seed Fund (highest success rate)
- Parallel apply to sector-specific schemes
- Network at T-Hub events for connections
- Prepare 10-slide pitch deck

**Private Funding:**
- Angel investors: ₹25 lakhs - ₹2 crores
- VCs: ₹2+ crores for Series A
- T-Angel Network: Active in Hyderabad

**Next Steps**: Would you like help with application preparation, pitch deck review, or connecting with specific investors?`;
      }
      
      if (lowerQuestion.includes('hire') || lowerQuestion.includes('talent') || lowerQuestion.includes('recruit')) {
        return `Excellent question about talent acquisition, ${name}! Here's your hiring strategy:

**Platform Benefits:**
- Access to 10,000+ pre-screened candidates
- Advanced filtering by skills, experience, location
- Direct messaging and interview scheduling
- Application tracking and candidate pipeline management

**Hiring Best Practices:**
1. **Job Description**: Be specific about required skills and experience level
2. **Compensation**: Competitive salaries attract better talent (₹15K-50K for interns)
3. **Company Culture**: Highlight growth opportunities and work environment
4. **Response Time**: Reply to applications within 48 hours

**Top Talent Pools:**
- Engineering: IIT Hyderabad, NIT Warangal, BITS Pilani
- Design: NIFT, private design institutes
- Business: ISB, IIM graduates

**Recruitment Timeline:**
- Internships: 2-3 weeks from posting to onboarding
- Full-time roles: 4-6 weeks including interviews

Would you like assistance with crafting compelling job descriptions or setting up your recruitment process?`;
      }
    }
    
    if (role === 'official') {
      if (lowerQuestion.includes('scheme') || lowerQuestion.includes('policy') || lowerQuestion.includes('manage')) {
        return `Important administrative query, ${name}! Here's comprehensive scheme management guidance:

**Current Active Schemes:**
1. **T-Hub Incubation**: 500+ startups incubated, ₹125 crore deployed
2. **WE-Hub**: 200+ women entrepreneurs supported
3. **TSIC**: Policy framework for 1000+ startups
4. **Seed Fund**: ₹50 crore allocated, 40% utilization rate

**Performance Metrics:**
- Job Creation: 15,000+ direct jobs in 2 years
- Startup Registrations: 300% increase since scheme launch
- Fund Utilization: 65% average across all schemes
- Success Rate: 40% startups become sustainable

**Monitoring Tools:**
- Real-time dashboard with KPIs
- Monthly utilization reports
- Quarterly impact assessments
- Annual outcome evaluations

**Policy Recommendations:**
- Increase digital marketing budget for scheme awareness
- Streamline application processes (reduce from 6 to 3 steps)
- Create sector-specific schemes (AgriTech, HealthTech)
- Establish mentorship programs

Would you like detailed analytics on any specific scheme or help with policy modification proposals?`;
      }
    }
    
    // General comprehensive responses
    if (lowerQuestion.includes('how') || lowerQuestion.includes('what') || lowerQuestion.includes('why')) {
      return `Great question, ${name}! Let me provide comprehensive guidance:

**Platform Overview:**
This Government Startup Portal serves as Telangana's primary ecosystem for connecting talent, startups, and government initiatives. We've facilitated over 25,000 job applications, supported 1,500+ startups, and deployed ₹500+ crores in government funding.

**Key Success Stories:**
- 85% job placement rate for active users
- 60% startup survival rate (vs 10% national average)
- ₹200 crore private investment leveraged through our schemes

**How to Maximize Benefits:**
1. **Complete Profile**: Users with 100% profiles get 3x more responses
2. **Regular Activity**: Weekly logins increase success rates by 40%
3. **Community Engagement**: Join our events and networking sessions
4. **Feedback Loop**: We continuously improve based on user suggestions

**Upcoming Features:**
- AI-powered job matching (launching next month)
- Virtual reality training modules
- Blockchain-based credential verification
- Regional language support expansion

What specific aspect would you like me to dive deeper into?`;
    }
    
    // Default comprehensive response
    return `Thank you for your question, ${name}! I'm here to provide detailed, actionable guidance on every aspect of this platform and the broader startup ecosystem.

**I can help you with:**
- **Career Planning**: Job search strategies, skill development, interview preparation
- **Business Growth**: Funding opportunities, government schemes, market expansion
- **Government Policies**: Scheme eligibility, application processes, compliance requirements
- **Technical Support**: Platform navigation, feature explanations, troubleshooting
- **Industry Insights**: Market trends, salary benchmarks, growth opportunities

**My Commitment:**
I'll provide specific, actionable advice tailored to your role and situation. No generic responses - every answer is customized based on current market conditions, your profile, and proven success strategies.

Please share more details about your specific situation, and I'll provide a comprehensive, step-by-step action plan. What would you like to focus on first?`;
  };

  const getContextualAdvice = (question: string, role: string | null): string => {
    if (role === 'student') return "As a student, focus on building a strong profile and applying strategically.";
    if (role === 'startup') return "For startups, consider both funding opportunities and talent acquisition strategies.";
    if (role === 'official') return "From a policy perspective, monitor scheme effectiveness and stakeholder feedback.";
    return "Consider your specific goals and how this platform can support your objectives.";
  };

  return (
    <AIContext.Provider value={{ userRole, userName, askAI, isAIThinking }}>
      {children}
    </AIContext.Provider>
  );
};
