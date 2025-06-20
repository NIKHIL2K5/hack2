import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    
    // This is a mock implementation since we can't use real API keys in this environment
    // In a real implementation, you would use Deno.env.get('OPENAI_API_KEY') to get the key securely
    
    // Generate a response based on the message content
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

    return new Response(JSON.stringify({ 
      content: response,
      type: 'text'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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