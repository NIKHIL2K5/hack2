
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ArrayFieldInputProps {
  label: string;
  values: string[];
  placeholder: string;
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const ArrayFieldInput = ({ 
  label, 
  values, 
  placeholder, 
  onChange, 
  onAdd, 
  onRemove 
}: ArrayFieldInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      {values.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={placeholder}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          {values.length > 1 && (
            <Button
              type="button"
              onClick={() => onRemove(index)}
              variant="outline"
              size="sm"
              className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30"
            >
              <Minus className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        onClick={onAdd}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );
};
