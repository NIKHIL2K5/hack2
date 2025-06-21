import React from 'react';

interface AIResponseData {
  type: 'text';
  content: string;
  model?: string;
}

interface EnhancedAIResponseProps {
  response: AIResponseData;
  userRole: string;
}

export const EnhancedAIResponse: React.FC<EnhancedAIResponseProps> = ({ response }) => {
  // Format the response text to handle markdown-like formatting
  const formatText = (text: string) => {
    // Handle bold text with ** or __
    let formattedText = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    
    // Handle bullet points
    formattedText = formattedText.replace(/^- (.*?)$/gm, '• $1');
    
    // Handle numbered lists
    formattedText = formattedText.replace(/^\d+\. (.*?)$/gm, (match, p1, offset) => {
      return `<span class="mr-2">•</span>${p1}`;
    });
    
    // Convert URLs to links
    formattedText = formattedText.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" class="text-blue-600 underline">$1</a>'
    );
    
    // Handle line breaks
    formattedText = formattedText.replace(/\n/g, '<br />');
    
    return formattedText;
  };

  return (
    <div className="text-sm text-gray-700 whitespace-pre-wrap">
      <div dangerouslySetInnerHTML={{ __html: formatText(response.content) }} />
      {response.model && (
        <div className="text-xs text-gray-500 mt-2">Powered by {response.model}</div>
      )}
    </div>
  );
};