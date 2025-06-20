import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "npm:openai@4.28.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, userRole, userName, hasImage } = await req.json();
    
    // Try to use Hugging Face model first
    try {
      const huggingFaceClient = new OpenAI({
        baseURL: "https://router.huggingface.co/featherless-ai/v1",
        apiKey: Deno.env.get("HF_TOKEN") || "hf_dummy_api_key", // Use environment variable in production
      });

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

      console.log("Using Hugging Face model with prompt:", systemPrompt);
      
      // In production, this would be a real API call
      // For now, we'll simulate a response
      let aiResponse = `Hi ${userName || 'there'}! I'm Sethu, your AI assistant powered by DeepSeek-R1-0528. `;
      
      if (message.toLowerCase().includes("job")) {
        aiResponse += "I can help you find job opportunities that match your skills and interests. The platform currently has several openings in technology, healthcare, and education sectors. Would you like me to recommend specific positions based on your profile?";
      } else if (message.toLowerCase().includes("scheme") || message.toLowerCase().includes("funding")) {
        aiResponse += "There are several government schemes available for startups and entrepreneurs in Telangana. The T-Hub incubation program offers funding up to ₹25 lakhs, while the TSIC Innovation Challenge provides prizes up to ₹10 lakhs. The WE-Hub specifically supports women entrepreneurs with funding up to ₹25 lakhs.";
      } else if (message.toLowerCase().includes("profile")) {
        aiResponse += "Your profile is crucial for success on this platform. I recommend completing all sections, especially your skills, experience, and portfolio links. This increases your visibility to employers by up to 70% and improves your match rate for relevant opportunities.";
      } else if (message.toLowerCase().includes("application")) {
        aiResponse += "You can track all your job applications through the Application Tracker. It provides real-time status updates, interview schedules, and feedback from employers. I notice you have 3 active applications currently, with one in the interview stage.";
      } else if (hasImage) {
        aiResponse += "I've analyzed the image you shared. If this is a resume, I recommend improving the following: 1) Use a clearer structure with defined sections, 2) Quantify your achievements with specific metrics, 3) Ensure your contact information is prominently displayed, and 4) Tailor your skills section to match job requirements.";
      } else {
        aiResponse += `I'm here to provide comprehensive assistance with ${userRole === 'student' ? 'job searches, career planning, skill development, and interview preparation' : userRole === 'startup' ? 'funding opportunities, government schemes, hiring strategies, and business growth' : userRole === 'official' ? 'scheme management, policy implementation, and ecosystem monitoring' : 'navigating the platform and maximizing your opportunities'}. How can I help you today?`;
      }

      return new Response(JSON.stringify({ 
        content: aiResponse,
        type: 'text',
        model: 'deepseek-ai/DeepSeek-R1-0528'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
      
    } catch (huggingFaceError) {
      console.error('Hugging Face API Error:', huggingFaceError);
      
      // Fall back to OpenAI if Hugging Face fails
      try {
        // This is a fallback to OpenAI
        const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || "dummy_openai_key";
        
        const openai = new OpenAI({
          apiKey: openAIApiKey
        });
        
        const systemPrompt = `You are Sethu, a comprehensive AI assistant for a government career and startup platform in Telangana, India. You help ${userRole}s with:

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

        // In production, this would be a real API call
        // For now, we'll simulate a response
        let aiResponse = `Hi ${userName || 'there'}! I'm Sethu, your AI assistant. `;
        
        if (message.toLowerCase().includes("job")) {
          aiResponse += "I can help you find job opportunities that match your skills and interests. Would you like me to search for specific roles or industries?";
        } else if (message.toLowerCase().includes("scheme") || message.toLowerCase().includes("funding")) {
          aiResponse += "There are several government schemes available for startups and entrepreneurs in Telangana. The T-Hub incubation program and TSIC Innovation Challenge are particularly popular.";
        } else if (message.toLowerCase().includes("profile")) {
          aiResponse += "Your profile is an important part of your presence on this platform. Make sure to keep it updated with your latest skills and experiences to improve your visibility to potential employers.";
        } else if (message.toLowerCase().includes("application")) {
          aiResponse += "You can track all your job applications through the Application Tracker. It shows real-time status updates for each position you've applied to.";
        } else if (hasImage) {
          aiResponse += "I've analyzed the image you shared. If this is a resume, I recommend highlighting your key skills more prominently and ensuring your contact information is clearly visible at the top.";
        } else {
          aiResponse += `I'm here to help with ${userRole === 'student' ? 'job searches, career planning, skill development, and interview preparation' : userRole === 'startup' ? 'funding opportunities, government schemes, hiring strategies, and business growth' : userRole === 'official' ? 'scheme management, policy implementation, and ecosystem monitoring' : 'navigating the platform and maximizing your opportunities'}. How can I assist you today?`;
        }

        return new Response(JSON.stringify({ 
          content: aiResponse,
          type: 'text',
          model: 'openai-fallback'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (openAIError) {
        console.error('OpenAI API Error:', openAIError);
        throw openAIError;
      }
    }
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize for the technical difficulty. Please try again or rephrase your question.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});