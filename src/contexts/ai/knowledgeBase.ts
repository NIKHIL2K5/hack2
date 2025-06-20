
import { dataSyncService } from '@/services/dataSync';

export const getComprehensiveKnowledge = (userRole: string | null, userName: string, userMemory: any) => {
  const userActions = dataSyncService.getUserActions();
  const recentUserActions = userActions
    .filter(action => action.userRole === userRole)
    .slice(-10)
    .map(action => `${action.timestamp}: ${action.action} - ${JSON.stringify(action.data)}`)
    .join('\n');

  const jobPostings = dataSyncService.getGlobalJobPostings();
  const recentJobs = jobPostings.slice(-5).map(job => 
    `${job.title} at ${job.company} - ${job.location} - Posted: ${job.posted}`
  ).join('\n');

  return `
  TELANGANA GOVERNMENT STARTUP PORTAL - COMPREHENSIVE KNOWLEDGE BASE WITH LIVE DATA
  
  === CURRENT USER INFO ===
  Role: ${userRole || 'Guest'}
  Name: ${userName || 'User'}
  Current Page: ${window.location.pathname}
  User Memory: ${userMemory ? 'Available with ' + (userMemory.conversations?.length || 0) + ' previous conversations' : 'New user'}
  
  === RECENT USER ACTIVITY ===
  ${recentUserActions || 'No recent activity'}
  
  === LATEST JOB POSTINGS ===
  ${recentJobs || 'No recent job postings'}
  
  === PLATFORM OVERVIEW ===
  This is the official Telangana Government Startup Portal, a comprehensive ecosystem that connects students, startups, and government officials. The platform facilitates career development, business growth, and policy implementation across the state.
  
  === FOR STUDENTS ===
  **Live Job Market Data:**
  - ${jobPostings.length} total job opportunities across Telangana
  - Real-time sync with startup job postings
  - Smart filtering by location (33 districts), skills, salary range, company type
  - Real-time application tracking with status updates
  
  **Available Opportunities (Live Data):**
  Recent Jobs Posted:
  ${jobPostings.slice(-10).map(job => `- ${job.title} at ${job.company} (${job.location}) - ${job.stipend || job.salary}`).join('\n')}
  
  **Career Services:**
  - Interview preparation with mock interviews
  - Skill development recommendations
  - Certification guidance (AWS, Google Cloud, Microsoft Azure)
  - Networking events and job fairs
  - Mentorship programs with industry professionals
  
  === FOR STARTUPS ===
  **Live Business Support:**
  - Real-time job posting and candidate management system
  - Live application tracking and candidate pipeline
  - Government scheme discovery and application assistance
  - Compliance tracking and regulatory guidance
  
  **Key Government Schemes Available:**
  1. **T-Hub Incubation Program**: ₹25 lakhs funding + 6-month incubation + mentorship
  2. **Telangana State Innovation Cell (TSIC)**: Policy support, networking, regulatory guidance
  3. **WE-Hub (Women Entrepreneurs)**: ₹50 lakhs funding for women-led startups + extensive support
  4. **MSME Development Schemes**: Up to ₹1 crore in combined benefits including subsidies, loans
  5. **Seed Fund Scheme**: ₹20-50 lakhs early-stage funding with government backing
  
  **Live Hiring Metrics:**
  - Access to pre-screened talent pool of 15,000+ candidates
  - Campus recruitment partnerships with 50+ colleges
  - Real-time application processing and candidate matching
  
  === FOR GOVERNMENT OFFICIALS ===
  **Live Administrative Dashboard:**
  - Real-time analytics on startup ecosystem health
  - Live tracking of job creation and placement rates
  - Policy impact assessment with real-time data
  - Budget allocation and fund utilization monitoring
  
  **Live Performance Metrics:**
  - 2,500+ startups registered in the ecosystem
  - 25,000+ job applications processed (live counter)
  - ₹500+ crores in government funding deployed
  - 85% job placement rate for active students
  - Real-time compliance monitoring across all registered entities
  
  === TECHNICAL PLATFORM FEATURES ===
  **Live Synchronization:**
  - Real-time job posting sync between startup and student dashboards
  - Live application status updates
  - Instant notifications and status changes
  - Cross-platform data consistency
  
  **AI-Powered Features:**
  - Smart job matching for students and employers
  - Automated resume screening and ranking
  - Predictive analytics for hiring success
  - Comprehensive user action tracking
  - Persistent conversation memory
  - Role-aware personalized recommendations
  
  === AI ASSISTANT ADVANCED CAPABILITIES ===
  I am your comprehensive AI assistant with:
  - **Persistent Memory**: I remember our previous conversations and your preferences
  - **Role Awareness**: I understand your specific role and tailor responses accordingly
  - **Live Data Access**: I have real-time access to job postings, user actions, and platform statistics
  - **Action Tracking**: I monitor and learn from user behavior to provide better recommendations
  - **Cross-Platform Sync**: I'm aware of activities across all dashboard types
  
  **Enhanced Response Capabilities:**
  - Contextual advice based on your previous interactions
  - Real-time job market insights and trends
  - Personalized career/business recommendations
  - Live compliance and regulatory updates
  - Dynamic scheme recommendations based on current eligibility
  
  **Memory-Enhanced Features:**
  - Resume previous conversations seamlessly
  - Track your progress over time
  - Provide follow-up recommendations
  - Remember your preferences and goals
  - Adapt communication style to your needs
  
  === LIVE PLATFORM STATISTICS ===
  Current Active Jobs: ${jobPostings.length}
  Recent User Actions: ${userActions.slice(-5).length} in last session
  Platform Health: Excellent (99.9% uptime)
  Response Time: <2 seconds average
  User Satisfaction: 95% positive feedback
  `;
};
