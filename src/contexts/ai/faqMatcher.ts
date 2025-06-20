
import { STUDENT_FAQ, STARTUP_FAQ, OFFICIAL_FAQ, GENERAL_FAQ } from './faqData';

// Enhanced FAQ matching function with fuzzy search
export const findFAQAnswer = (message: string, userRole: string): string | null => {
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
