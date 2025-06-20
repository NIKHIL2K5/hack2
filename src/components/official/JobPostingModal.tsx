
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { dataSyncService } from "@/services/dataSync";

interface JobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationName: string;
}

export const JobPostingModal = ({ isOpen, onClose, organizationName }: JobPostingModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    skills: [""],
    benefits: [""],
    deadline: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Clean up empty array items
    const cleanedData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(item => item.trim() !== ""),
      requirements: formData.requirements.filter(item => item.trim() !== ""),
      skills: formData.skills.filter(item => item.trim() !== ""),
      benefits: formData.benefits.filter(item => item.trim() !== "")
    };

    // Save to localStorage
    const existingJobs = JSON.parse(localStorage.getItem('job_postings') || '[]');
    const newJob = {
      id: Date.now(),
      ...cleanedData,
      organizationName,
      postedAt: new Date().toISOString(),
      status: 'active'
    };
    
    existingJobs.push(newJob);
    localStorage.setItem('job_postings', JSON.stringify(existingJobs));

    // Sync to global job postings for student dashboard
    dataSyncService.syncJobPosting(cleanedData, organizationName);

    // Track job posting action
    const officialUser = JSON.parse(localStorage.getItem('officialUser') || '{}');
    if (officialUser.email) {
      dataSyncService.trackAction(
        officialUser.email,
        'startup',
        'job_posted',
        {
          jobTitle: cleanedData.title,
          department: cleanedData.department,
          jobType: cleanedData.jobType,
          skills: cleanedData.skills
        },
        organizationName
      );
    }

    toast.success("Job posted successfully and synced to student dashboard!");
    
    // Reset form
    setFormData({
      title: "",
      department: "",
      location: "",
      jobType: "",
      experience: "",
      salary: "",
      description: "",
      responsibilities: [""],
      requirements: [""],
      skills: [""],
      benefits: [""],
      deadline: ""
    });
    
    onClose();
  };

  const renderArrayField = (label: string, field: string, placeholder: string) => (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      {formData[field as keyof typeof formData].map((item: string, index: number) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => handleArrayField(field, index, e.target.value)}
            placeholder={placeholder}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          {formData[field as keyof typeof formData].length > 1 && (
            <Button
              type="button"
              onClick={() => removeArrayItem(field, index)}
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
        onClick={() => addArrayItem(field)}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 rounded-xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-transparent border-none">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/20">
            <CardTitle className="text-2xl font-bold text-white">Post New Job</CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white">Job Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Frontend Developer"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-white">Department</Label>
                  <Input
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="e.g., Engineering"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Hyderabad, Telangana"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Job Type</Label>
                  <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
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
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="e.g., 2-3 years or Fresher"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Salary/Stipend</Label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="e.g., ₹25,000 per month"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Job Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, what the candidate will do, and what makes this opportunity exciting..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderArrayField("Responsibilities", "responsibilities", "Enter a responsibility")}
                {renderArrayField("Requirements", "requirements", "Enter a requirement")}
                {renderArrayField("Required Skills", "skills", "Enter a skill")}
                {renderArrayField("Benefits", "benefits", "Enter a benefit")}
              </div>

              <div>
                <Label className="text-white">Application Deadline</Label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                >
                  Post Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
