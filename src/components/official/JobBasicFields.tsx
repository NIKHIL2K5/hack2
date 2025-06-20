
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobFormData } from "@/hooks/useJobPostingForm";

interface JobBasicFieldsProps {
  formData: JobFormData;
  onInputChange: (field: keyof JobFormData, value: string) => void;
}

export const JobBasicFields = ({ formData, onInputChange }: JobBasicFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-white">Job Title *</Label>
          <Input
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="e.g., Frontend Developer"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            required
          />
        </div>
        
        <div>
          <Label className="text-white">Department</Label>
          <Input
            value={formData.department}
            onChange={(e) => onInputChange('department', e.target.value)}
            placeholder="e.g., Engineering"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        
        <div>
          <Label className="text-white">Location</Label>
          <Input
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="e.g., Hyderabad, Telangana"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        
        <div>
          <Label className="text-white">Job Type</Label>
          <Select value={formData.jobType} onValueChange={(value) => onInputChange('jobType', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-white">Experience Required</Label>
          <Input
            value={formData.experience}
            onChange={(e) => onInputChange('experience', e.target.value)}
            placeholder="e.g., 2-3 years or Fresher"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        
        <div>
          <Label className="text-white">Salary/Stipend</Label>
          <Input
            value={formData.salary}
            onChange={(e) => onInputChange('salary', e.target.value)}
            placeholder="e.g., ₹25,000 per month"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      <div>
        <Label className="text-white">Job Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Describe the role, what the candidate will do, and what makes this opportunity exciting..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
          required
        />
      </div>

      <div>
        <Label className="text-white">Application Deadline</Label>
        <Input
          type="date"
          value={formData.deadline}
          onChange={(e) => onInputChange('deadline', e.target.value)}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>
    </>
  );
};
