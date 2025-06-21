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
    
    // Try using Hugging Face model first
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
      const chatCompletion = await huggingFaceClient.chat.completions.create({
        model: "deepseek-ai/DeepSeek-R1-0528",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
      });
      
      const aiResponse = chatCompletion.choices[0].message.content;

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
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
        });
        
        const aiResponse = chatCompletion.choices[0].message.content;

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