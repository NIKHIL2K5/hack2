
import React from 'react';

interface AIResponseData {
  type: 'text';
  content: string;
}

interface EnhancedAIResponseProps {
  response: AIResponseData;
  userRole: string;
}

export const EnhancedAIResponse: React.FC<EnhancedAIResponseProps> = ({ response }) => {
  return (
    <div className="text-sm text-gray-700 whitespace-pre-wrap">
      {response.content}
    </div>
  );
};
