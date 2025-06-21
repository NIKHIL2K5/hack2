import { OpenAI } from "openai";

// Initialize Hugging Face client
const huggingFaceClient = new OpenAI({
  baseURL: "https://router.huggingface.co/featherless-ai/v1",
  apiKey: import.meta.env.VITE_HF_TOKEN || "hf_dummy_api_key", // This will be replaced with a real key in production
  dangerouslyAllowBrowser: true
});

export interface AIServiceOptions {
  message: string;
  context?: string;
  userRole?: string;
  userName?: string;
  hasImage?: boolean;
}

export const generateAIResponse = async (options: AIServiceOptions): Promise<string> => {
  const { message, context, userRole, userName, hasImage } = options;
  
  try {
    // Prepare system prompt based on user role
    const systemPrompt = `You are Sethu, a comprehensive AI assistant for a government career and startup platform in Telangana, India. You help ${userRole || 'users'} with:

${userRole === 'student' ? 
  '- Job search and career guidance\n- Application tracking and interview preparation\n- Skill development and certification programs\n- Government schemes for students' :
  userRole === 'startup' ? 
  '- Funding opportunities and government schemes\n- Hiring strategies and talent acquisition\n- Compliance and regulatory guidance\n- Business growth and networking' :
  userRole === 'official' ? 
  '- Scheme management and policy implementation\n- Ecosystem monitoring and analytics\n- Stakeholder coordination and feedback\n- Administrative guidance and compliance tracking' :
  '- Platform navigation and feature utilization\n- Career and business development guidance\n- Government scheme information and application assistance'
}

You provide precise, actionable advice tailored to the user's specific situation. Be helpful, professional, and encouraging.

Context: ${context || 'General platform assistance'}
User Role: ${userRole || 'platform user'}
User Name: ${userName || 'User'}
${hasImage ? 'Note: The user has shared an image for analysis.' : ''}`;

    // Make API call to Hugging Face
    const chatCompletion = await huggingFaceClient.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1-0528",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });
    
    return chatCompletion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
};

// Fallback to local response generation if API calls fail
export const generateLocalResponse = (options: AIServiceOptions): string => {
  const { message, userRole, userName, hasImage } = options;
  
  let response = `Hi ${userName || 'there'}! I'm Sethu, your AI assistant. `;
  
  if (message.toLowerCase().includes("job")) {
    response += "I can help you find job opportunities that match your skills and interests. Would you like me to search for specific roles or industries?";
  } else if (message.toLowerCase().includes("scheme") || message.toLowerCase().includes("funding")) {
    response += "There are several government schemes available for startups and entrepreneurs in Telangana. The T-Hub incubation program and TSIC Innovation Challenge are particularly popular.";
  } else if (message.toLowerCase().includes("profile")) {
    response += "Your profile is an important part of your presence on this platform. Make sure to keep it updated with your latest skills and experiences to improve your visibility to potential employers.";
  } else if (message.toLowerCase().includes("application")) {
    response += "You can track all your job applications through the Application Tracker. It shows real-time status updates for each position you've applied to.";
  } else if (hasImage) {
    response += "I've analyzed the image you shared. If this is a resume, I recommend highlighting your key skills more prominently and ensuring your contact information is clearly visible at the top.";
  } else {
    response += `I'm here to help with ${userRole === 'student' ? 'job searches, career planning, skill development, and interview preparation' : userRole === 'startup' ? 'funding opportunities, government schemes, hiring strategies, and business growth' : userRole === 'official' ? 'scheme management, policy implementation, and ecosystem monitoring' : 'navigating the platform and maximizing your opportunities'}. How can I assist you today?`;
  }
  
  return response;
};