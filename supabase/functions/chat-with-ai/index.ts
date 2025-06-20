
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('OpenAI API Key configured:', !!openAIApiKey);
    console.log('API Key prefix:', openAIApiKey ? openAIApiKey.substring(0, 20) + '...' : 'not found');
    
    const { message, context, userRole, userName, hasImage } = await req.json();
    console.log('Received request:', { message, userRole, userName, hasImage });

    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment');
      throw new Error('OpenAI API key not configured');
    }

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

    console.log('Making request to OpenAI with model gpt-4.1-2025-04-14...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log('OpenAI response status:', response.status);
    console.log('OpenAI response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error details:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      if (response.status === 429) {
        throw new Error('OpenAI API quota exceeded. Please check your billing and usage limits.');
      } else if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else {
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    console.log('Response data structure:', {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length,
      hasMessage: !!data.choices?.[0]?.message,
      hasContent: !!data.choices?.[0]?.message?.content
    });
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI');
    }
    
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      content: aiResponse,
      type: 'text'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'I apologize for the technical difficulty. Please try again or rephrase your question.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
