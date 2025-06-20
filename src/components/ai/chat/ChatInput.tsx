
import React, { useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAIThinking: boolean;
  hasSelectedImage: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  onInputChange,
  onSendMessage,
  onImageUpload,
  isAIThinking,
  hasSelectedImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageUpload}
          accept="image/*"
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
          className="hover-button"
          disabled={isAIThinking}
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        <Input
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about the platform or share an image..."
          className="flex-1"
          disabled={isAIThinking}
        />
        <Button
          onClick={onSendMessage}
          disabled={isAIThinking || (!inputMessage.trim() && !hasSelectedImage)}
          className="hover-button"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
