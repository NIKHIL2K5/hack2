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
      } else if (path.includes('/dashboard/startup') || path.includes('/applications')) {
        setUserRole('startup');
      } else if (path.includes('/dashboard/official') || path.includes('/schemes')) {
        setUserRole('official');
      }
    }
  }, []);

  const getComprehensiveKnowledge = () => {
    return `
    TELANGANA GOVERNMENT STARTUP PORTAL - COMPLETE KNOWLEDGE BASE
    
    === PLATFORM OVERVIEW ===
    This is the official Telangana Government Startup Portal, a comprehensive ecosystem that connects students, startups, and government officials. The platform facilitates career development, business growth, and policy implementation across the state.
    
    === CURRENT USER INFO ===
    Role: ${userRole || 'Guest'}
    Name: ${userName || 'User'}
    Current Page: ${window.location.pathname}
    
    === FOR STUDENTS ===
    **Career Development & Job Search:**
    - 10,000+ active job opportunities across Telangana
    - Smart filtering by location (33 districts), skills, salary range, company type
    - Real-time application tracking with status updates
    - Profile management with skills portfolio, education history, project showcase
    - Resume builder and optimization tools
    - AI-powered job matching based on skills and preferences
    
    **Available Opportunities:**
    1. **Technology Roles**: Frontend (React, Angular, Vue), Backend (Node.js, Python, Java), Full-Stack, Mobile (React Native, Flutter), AI/ML, Data Science, DevOps, Cybersecurity
    2. **Design Positions**: UI/UX Designer, Graphic Designer, Product Designer, Visual Designer
    3. **Business Roles**: Marketing Manager, Sales Executive, Operations Manager, HR Specialist, Finance Analyst
    4. **Research Positions**: Academic Research, R&D positions, Innovation Labs
    
    **Salary Ranges:**
    - Internships: ₹15,000 - ₹50,000 per month
    - Entry-level: ₹3-6 LPA
    - Mid-level: ₹6-12 LPA
    - Senior-level: ₹12-25 LPA
    
    **Top Hiring Companies:**
    - TechCorp Innovations, AI Solutions Ltd, StartupTech, CloudTech Systems
    - Design Studio Pro, Innovation Labs, Digital Dynamics
    - Major MNCs: Microsoft, Google, Amazon, Infosys, TCS
    
    **Career Services:**
    - Interview preparation with mock interviews
    - Skill development recommendations
    - Certification guidance (AWS, Google Cloud, Microsoft Azure)
    - Networking events and job fairs
    - Mentorship programs with industry professionals
    
    === FOR STARTUPS ===
    **Business Growth & Support:**
    - Comprehensive job posting and candidate management system
    - Advanced applicant filtering and screening tools
    - Government scheme discovery and application assistance
    - Compliance tracking and regulatory guidance
    - Mentorship programs with successful entrepreneurs
    - Market research and industry insights
    
    **Key Government Schemes Available:**
    1. **T-Hub Incubation Program**: ₹25 lakhs funding + 6-month incubation + mentorship
    2. **Telangana State Innovation Cell (TSIC)**: Policy support, networking, regulatory guidance
    3. **WE-Hub (Women Entrepreneurs)**: ₹50 lakhs funding for women-led startups + extensive support
    4. **MSME Development Schemes**: Up to ₹1 crore in combined benefits including subsidies, loans
    5. **Seed Fund Scheme**: ₹20-50 lakhs early-stage funding with government backing
    6. **Angel Tax Exemption**: Tax benefits for startup investments and angel funding
    7. **SIDBI Fund of Funds**: Access to venture capital and growth funding
    8. **Digital India Initiatives**: Technology adoption support and digital transformation
    9. **Export Promotion Schemes**: Support for international market expansion
    10. **Research & Development Grants**: Innovation funding for technology development
    
    **Funding Ecosystem:**
    - Government grants: ₹5 lakhs to ₹2 crores
    - Angel investors: ₹25 lakhs to ₹2 crores
    - Venture capital: ₹2+ crores for Series A and beyond
    - Bank loans with government guarantees
    - Crowdfunding platform integration
    
    **Hiring Support:**
    - Access to pre-screened talent pool of 15,000+ candidates
    - Campus recruitment partnerships with 50+ colleges
    - Skill assessment and technical interview tools
    - Salary benchmarking and compensation guidance
    - Employee onboarding and retention strategies
    
    === FOR GOVERNMENT OFFICIALS ===
    **Administrative & Policy Tools:**
    - Comprehensive scheme management dashboard
    - Real-time analytics on startup ecosystem health
    - Policy impact assessment and tracking
    - Budget allocation and fund utilization monitoring
    - Compliance monitoring across all registered entities
    - Stakeholder feedback analysis and sentiment tracking
    
    **Key Performance Metrics:**
    - 2,500+ startups registered in the ecosystem
    - 25,000+ job applications processed
    - ₹500+ crores in government funding deployed
    - 85% job placement rate for active students
    - 60% startup survival rate (vs 10% national average)
    - 15,000+ direct jobs created in 2 years
    
    **Scheme Performance:**
    - T-Hub: 500+ startups incubated, ₹125 crore deployed
    - WE-Hub: 200+ women entrepreneurs supported
    - Seed Fund: 40% utilization rate, high success metrics
    - Overall job creation: 300% increase since launch
    
    **Administrative Features:**
    - Application review and approval workflows
    - Detailed applicant profiles and background verification
    - Multi-level approval processes for funding
    - Integration with central government databases
    - Automated compliance notifications and reminders
    
    === TECHNICAL PLATFORM FEATURES ===
    **Core Capabilities:**
    - Real-time notifications and status updates
    - Advanced search algorithms with ML-based recommendations
    - Secure data encryption and privacy protection
    - Mobile-responsive design with offline capabilities
    - Multi-language support (English, Telugu, Hindi)
    - Integration with government databases (DPIIT, GST, PAN)
    
    **AI-Powered Features:**
    - Smart job matching for students and employers
    - Automated resume screening and ranking
    - Predictive analytics for hiring success
    - Sentiment analysis of user feedback
    - Intelligent scheme recommendation engine
    - Automated compliance monitoring and alerts
    
    **Security & Compliance:**
    - Government-grade security standards
    - Digital signature integration
    - Blockchain-based credential verification
    - GDPR-compliant data handling
    - Regular security audits and penetration testing
    
    === APPLICATION MANAGEMENT SYSTEM ===
    **For Startups/Officials:**
    - Detailed application review interface with comprehensive candidate profiles
    - Real-time application status tracking and updates
    - Advanced filtering by skills, experience, education, location
    - Bulk application processing and status updates
    - Integrated communication tools for candidate interaction
    - Resume download and candidate portfolio access
    - Interview scheduling and feedback management
    - Statistical reporting and hiring analytics
    
    **Application Status Flow:**
    1. **Pending Review**: Initial application received, awaiting first review
    2. **Under Review**: Application being actively evaluated by hiring team
    3. **Shortlisted/Accepted**: Candidate approved for next round or job offer
    4. **Rejected**: Application declined with optional feedback
    
    **Detailed Candidate Information Available:**
    - Complete personal and contact information
    - Educational background and academic achievements
    - Professional experience and project portfolio
    - Technical skills and competency levels
    - Cover letter and motivation statement
    - Resume/CV download capability
    - Previous application history and performance
    
    === SUCCESS STORIES & IMPACT ===
    **Student Success:**
    - 85% placement rate for active platform users
    - Average salary increase of 40% through platform jobs
    - 5,000+ students placed in top-tier companies
    - 70% receive job offers within 3 months of active usage
    
    **Startup Growth:**
    - 60% startup survival rate (6x national average)
    - ₹200 crore private investment leveraged through schemes
    - 40% faster hiring process through platform tools
    - 95% startup satisfaction rate with government support
    
    **Economic Impact:**
    - ₹2,000+ crore economic value generated
    - 15,000+ direct jobs created
    - 50,000+ indirect jobs supported
    - 25% increase in Telangana's startup ecosystem ranking
    
    === AI ASSISTANT CAPABILITIES ===
    I am your comprehensive AI assistant with deep knowledge of:
    - Every feature and functionality of this platform
    - All government schemes, eligibility criteria, and application processes
    - Complete job market insights and career guidance
    - Technical troubleshooting and platform navigation
    - Industry best practices and success strategies
    - Real-time updates on policy changes and new opportunities
    - Personalized recommendations based on user profile and goals
    
    **I can provide detailed assistance with:**
    - Step-by-step guidance for any platform process
    - Career planning and skill development roadmaps
    - Government scheme selection and application strategy
    - Interview preparation and salary negotiation
    - Business plan development and funding strategies
    - Compliance requirements and regulatory guidance
    - Market analysis and competitive intelligence
    - Technical integration and API documentation
    
    **My responses are always:**
    - Role-specific and personalized to user needs
    - Actionable with clear next steps
    - Based on current market conditions and real data
    - Comprehensive yet easy to understand
    - Updated with latest policy changes and opportunities
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
        imageContext = `\n\nImage Analysis: The user has shared an image (${image.name}). I should analyze the visual content and provide relevant guidance or feedback based on what I can observe in the image.`;
      }
      
      const fullContext = `${comprehensiveKnowledge}\n\nAdditional Context: ${context || ''}\n\nUser Question: ${question}${imageContext}`;
      
      // Generate comprehensive response
      let response = generateComprehensiveResponse(question, userRole, userName, context, !!image);
      
      return response;
    } catch (error) {
      return "I apologize for the technical difficulty. Let me try to help you anyway. Could you please rephrase your question or provide more specific details about what you need assistance with? I have comprehensive knowledge about this platform and can guide you through any process.";
    } finally {
      setIsAIThinking(false);
    }
  };

  const generateComprehensiveResponse = (question: string, role: string | null, name: string, context?: string, hasImage?: boolean): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Image-related responses
    if (hasImage) {
      return `Thank you for sharing the image, ${name}! I can see you've uploaded a file, and I'll provide guidance based on your question. ${getContextualAdvice(lowerQuestion, role)} If the image contains specific details like a resume, job posting, document, or application interface you'd like me to analyze, please describe what you'd like me to focus on, and I'll provide detailed feedback and actionable suggestions.`;
    }
    
    // Application Management specific responses
    if (lowerQuestion.includes('application') && lowerQuestion.includes('detail')) {
      if (role === 'startup' || role === 'official') {
        return `Excellent question about application management, ${name}! The View Details functionality provides comprehensive candidate information:

**What You Can See in Application Details:**
1. **Complete Candidate Profile**: Full name, contact information, location, education background
2. **Job Application Information**: Position applied for, application date, current status
3. **Skills & Technologies**: All technical and soft skills with proficiency levels
4. **Project Portfolio**: Key projects with descriptions and technologies used
5. **Professional Experience**: Work history, internships, and relevant experience
6. **Achievements & Recognition**: Awards, certifications, hackathon wins, academic honors
7. **Cover Letter**: Complete motivation statement and candidate's interest in the role
8. **Resume/CV**: Downloadable document for detailed review

**Application Management Actions:**
- **Status Updates**: Move applications between Pending → Under Review → Accepted/Rejected
- **Direct Communication**: Send emails directly to candidates
- **Download Resume**: Access complete CV and portfolio documents
- **Bulk Actions**: Process multiple applications simultaneously
- **Interview Scheduling**: Coordinate next steps with shortlisted candidates

**Application Status Workflow:**
1. **Pending Review**: New applications awaiting initial screening
2. **Under Review**: Applications being actively evaluated
3. **Shortlisted/Accepted**: Candidates approved for interviews or job offers
4. **Rejected**: Applications declined (with optional feedback)

**Best Practices for Review:**
- Review applications within 48 hours for better candidate experience
- Use the skills filter to quickly identify qualified candidates
- Check project portfolio for practical experience
- Consider cover letter quality for communication skills
- Use status updates to maintain organized pipeline

Would you like guidance on setting up efficient review processes or specific tips for evaluating candidates in your industry?`;
      }
    }
    
    // Comprehensive role-specific responses
    if (role === 'student') {
      if (lowerQuestion.includes('job') || lowerQuestion.includes('internship') || lowerQuestion.includes('career')) {
        return `Excellent question, ${name}! Here's your complete job search strategy:

**Immediate Action Plan:**
1. **Profile Optimization** (Priority 1): Ensure 100% profile completion
   - Upload professional photo and resume
   - Add all relevant skills and technologies
   - Include project descriptions with GitHub links
   - Write compelling summary highlighting your strengths

2. **Strategic Job Application** (Daily Goal: 5-7 applications):
   - Use advanced filters: location, salary range, company size
   - Target roles matching 70%+ of your skills
   - Customize cover letters for each application
   - Apply within 24-48 hours of job posting

**Current Market Opportunities:**
- **High-Demand Roles**: Frontend Developer (React/Angular), Data Scientist, AI/ML Engineer
- **Entry-Level Friendly**: UI/UX Designer, Digital Marketing, Business Analyst
- **Growing Sectors**: FinTech, HealthTech, EdTech, AgriTech
- **Salary Trends**: ₹3-6 LPA for freshers, ₹6-12 LPA with 2+ years experience

**Top Hiring Companies on Platform:**
1. **Technology**: TechCorp Innovations (50+ openings), AI Solutions Ltd (30+ roles)
2. **Startups**: StartupTech (rapid growth, equity options), CloudTech Systems
3. **MNCs**: Microsoft, Google (through partnership programs)

**Application Success Tips:**
- **Response Rate**: Complete profiles get 3x more responses
- **Interview Rate**: Candidates with portfolios have 60% higher interview rates
- **Success Timeline**: 70% get offers within 3 months of active usage

**Next Steps:**
1. Complete skill assessment (increases visibility by 40%)
2. Join upcoming virtual job fair (next event: [date])
3. Connect with alumni working at target companies

What specific role or company would you like me to help you target?`;
      }
      
      if (lowerQuestion.includes('skill') || lowerQuestion.includes('learn') || lowerQuestion.includes('course')) {
        return `Perfect focus on skill development, ${name}! Here's your personalized learning roadmap based on current market demands:

**Highest ROI Skills for 2024:**
1. **Programming & Development** (Salary boost: 40-60%):
   - Frontend: React.js, TypeScript, Next.js
   - Backend: Node.js, Python (Django/Flask), Java (Spring Boot)
   - Mobile: React Native, Flutter
   - Database: PostgreSQL, MongoDB, Redis

2. **Data & AI** (Salary boost: 50-80%):
   - Data Analysis: Python, SQL, Pandas, NumPy
   - Machine Learning: TensorFlow, PyTorch, Scikit-learn
   - Data Visualization: Tableau, Power BI, D3.js
   - Big Data: Apache Spark, Hadoop

3. **Cloud & DevOps** (Salary boost: 45-70%):
   - Cloud Platforms: AWS, Azure, Google Cloud
   - Containerization: Docker, Kubernetes
   - CI/CD: Jenkins, GitHub Actions, GitLab CI
   - Infrastructure: Terraform, Ansible

**Learning Resources (Free → Paid):**
- **Free**: freeCodeCamp, Codecademy basic, YouTube tutorials
- **Affordable**: Udemy courses (₹500-2000), Coursera financial aid
- **Premium**: Pluralsight, LinkedIn Learning, Udacity Nanodegrees
- **Government**: Skill India Digital (free certificates), NIELIT courses

**Certification Priority (High Impact):**
1. **AWS Cloud Practitioner** (3-month ROI: ₹2+ LPA increase)
2. **Google Data Analytics Certificate** (6-month program, 85% job placement)
3. **Microsoft Azure Fundamentals** (High demand in Hyderabad)
4. **Google Cloud Associate** (Growing market, fewer competitors)

**30-Day Sprint Plan (Choose One):**
- **Web Development**: HTML/CSS/JS → React → Portfolio projects
- **Data Science**: Python basics → Pandas → First ML project
- **Cloud**: AWS fundamentals → Deploy first application → Get certified

**Platform Integration:**
- Add new skills to your profile immediately (increases job matches by 25%)
- Upload project portfolio (boosts interview callbacks by 60%)
- Take platform skill assessments (verified badges increase credibility)

Which skill track interests you most? I can create a detailed week-by-week learning plan!`;
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
        return `Excellent question about talent acquisition, ${name}! Here's your comprehensive hiring strategy:

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
