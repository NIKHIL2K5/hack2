import React from 'react';
import { X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePreviewProps {
  selectedImage: File | null;
  onRemove: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ selectedImage, onRemove }) => {
  if (!selectedImage) return null;

  return (
    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ImageIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 truncate max-w-48">{selectedImage.name}</span>
        </div>
        <Button
          onClick={onRemove}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};