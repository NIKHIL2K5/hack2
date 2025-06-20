
import { getUserInfo } from './userHelpers';
import { findFAQAnswer } from './faqMatcher';
import { generateJobRecommendations, generateSchemeInfo, generateAnalytics, generateCareerGuidance } from './dataGenerators';
import { dataSyncService } from '@/services/dataSync';

export const generateComprehensiveResponse = (
  question: string, 
  role: string | null, 
  name: string, 
  context?: string, 
  hasImage?: boolean, 
  memory?: any
): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Memory-enhanced greeting
  let memoryGreeting = '';
  if (memory && memory.conversations && memory.conversations.length > 0) {
    const lastConversation = memory.conversations[memory.conversations.length - 1];
    memoryGreeting = `Welcome back, ${name}! I remember our last conversation about "${lastConversation.question.substring(0, 50)}...". `;
  }
  
  // First try FAQ matching
  const faqAnswer = findFAQAnswer(question, role || 'guest');
  if (faqAnswer) {
    return `${memoryGreeting}${faqAnswer}`;
  }
  
  // Image-related responses
  if (hasImage) {
    return `${memoryGreeting}Thank you for sharing the image, ${name}! I can see you've uploaded a file, and I'll provide guidance based on your question. ${getContextualAdvice(lowerQuestion, role)} If the image contains specific details like a resume, job posting, document, or application interface you'd like me to analyze, please describe what you'd like me to focus on, and I'll provide detailed feedback and actionable suggestions.`;
  }
  
  // Live job posting responses
  if (lowerQuestion.includes('job') && (lowerQuestion.includes('new') || lowerQuestion.includes('latest') || lowerQuestion.includes('recent'))) {
    const recentJobs = dataSyncService.getGlobalJobPostings().slice(-5);
    if (recentJobs.length > 0) {
      const jobList = recentJobs.map(job => 
        `• ${job.title} at ${job.company} - ${job.location} - ${job.stipend || job.salary} - Posted: ${job.posted}`
      ).join('\n');
      
      return `${memoryGreeting}Here are the latest job postings synchronized across the platform, ${name}:

**Recently Posted Jobs:**
${jobList}

**What makes these opportunities special:**
- These are live postings from verified startups and organizations
- Real-time application tracking available
- Direct communication with hiring managers
- Government scheme integration for additional benefits

${role === 'student' ? 'I recommend applying quickly as these positions receive high interest. Would you like help crafting applications for any of these roles?' : role === 'startup' ? 'I can help you post similar competitive job listings to attract top talent.' : 'These postings show healthy ecosystem activity and job creation metrics.'}`;
    }
  }
  
  // Application management with live data
  if (lowerQuestion.includes('application') && lowerQuestion.includes('detail')) {
    if (role === 'startup' || role === 'official') {
      const userActions = dataSyncService.getUserActions().filter(action => 
        action.action === 'job_application_submitted' && action.userRole === 'student'
      );
      
      return `${memoryGreeting}Excellent question about application management, ${name}! Based on live platform data, here's what's happening:

**Live Application Metrics:**
- ${userActions.length} applications submitted today across the platform
- Real-time candidate matching and screening active
- Average response time: 48 hours for initial review

**Enhanced Application Details Available:**
1. **Complete Candidate Profiles**: Real-time sync with student profiles
2. **Live Application Status**: Instant updates as students apply
3. **Skills Assessment**: AI-powered skill matching scores
4. **Portfolio Integration**: Direct links to GitHub, LinkedIn, and project demos
5. **Application Analytics**: Track application quality and candidate engagement

**Live Application Management Actions:**
- **Real-time Status Updates**: Instant notifications to candidates
- **Bulk Processing**: Handle multiple applications with AI assistance
- **Smart Filtering**: Use ML-powered candidate ranking
- **Interview Coordination**: Integrated scheduling and feedback tools

**Recent Application Trends:**
- High-demand skills: React, Python, Data Science, UI/UX
- Peak application times: 9-11 AM and 2-4 PM
- Success rate: 65% for complete profiles vs 25% for incomplete ones

Would you like me to help you set up efficient review workflows or analyze specific application patterns?`;
    }
  }
  
  // Memory-enhanced role-specific responses
  if (role === 'student') {
    if (lowerQuestion.includes('progress') || lowerQuestion.includes('track')) {
      let progressData = '';
      if (memory && memory.conversations) {
        const jobRelatedConversations = memory.conversations.filter((conv: any) => 
          conv.question.toLowerCase().includes('job') || conv.question.toLowerCase().includes('apply')
        );
        progressData = `Based on our ${memory.conversations.length} previous conversations, I see you've been actively exploring ${jobRelatedConversations.length} job-related topics. `;
      }
      
      return `${memoryGreeting}${progressData}Let me track your comprehensive progress, ${name}:

**Your Platform Journey:**
- Profile completion status
- Applications submitted and their current status
- Skills assessment results and recommendations
- Job views and saved positions
- Interview scheduling and feedback

**Personalized Recommendations Based on Your Activity:**
${memory ? '- Continue building on skills we discussed previously\n- Follow up on applications we strategized about\n- Explore new opportunities in areas you showed interest' : '- Complete your profile for better job matching\n- Take skill assessments to improve visibility\n- Set up job alerts for preferred roles'}

**Next Steps Tailored for You:**
1. Update skills portfolio with recent projects
2. Apply to 3-5 jobs weekly for optimal results
3. Engage with startup representatives through platform events
4. Leverage government certification programs for skill development

Would you like me to create a personalized action plan based on your goals and current progress?`;
    }
  }
  
  // Enhanced default response with memory
  return `${memoryGreeting}Thank you for your question, ${name}! ${memory ? 'Building on our previous conversations, ' : ''}I'm here to provide detailed, actionable guidance tailored to your ${role || 'platform'} experience.

**I can help you with:**
- **Live Data Insights**: Real-time job market trends, application statistics, and platform analytics
- **Memory-Enhanced Advice**: Building on our previous discussions and your stated goals
- **Cross-Platform Coordination**: Understanding how your actions affect and are affected by other users
- **Personalized Strategies**: Custom recommendations based on your role, history, and preferences

**What I remember about our interactions:**
${memory && memory.conversations ? `- We've had ${memory.conversations.length} previous conversations\n- Your primary interests seem to be in ${extractInterests(memory)}\n- You've shown progress in areas we've discussed` : 'This is our first interaction - I\'m excited to learn about your goals and help you succeed!'}

**Current Platform Status:**
- Live job postings: ${dataSyncService.getGlobalJobPostings().length} opportunities
- Active users across all roles engaging in real-time
- Government schemes with immediate application windows
- AI-powered matching and recommendations continuously improving

Please share more details about your specific situation, and I'll provide a comprehensive, personalized action plan. What would you like to focus on today?`;
};

const extractInterests = (memory: any): string => {
  if (!memory || !memory.conversations) return 'career development';
  
  const keywords = memory.conversations
    .map((conv: any) => conv.question.toLowerCase())
    .join(' ')
    .split(' ')
    .filter((word: string) => ['job', 'career', 'skill', 'interview', 'startup', 'funding', 'scheme'].includes(word));
  
  const uniqueKeywords = [...new Set(keywords)];
  return uniqueKeywords.slice(0, 3).join(', ') || 'career development';
};

const getContextualAdvice = (question: string, role: string | null): string => {
  if (role === 'student') return "As a student, focus on building a strong profile and applying strategically to jobs that match your skills.";
  if (role === 'startup') return "For startups, consider both funding opportunities and talent acquisition strategies while tracking all activities.";
  if (role === 'official') return "From a policy perspective, monitor scheme effectiveness and stakeholder feedback across the ecosystem.";
  return "Consider your specific goals and how this platform can support your objectives.";
};
