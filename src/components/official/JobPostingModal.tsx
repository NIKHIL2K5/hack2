
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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

  const addField = (field: keyof typeof formData) => {
    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field] as string[], ""]
      }));
    }
  };

  const removeField = (field: keyof typeof formData, index: number) => {
    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).filter((_, i) => i !== index)
      }));
    }
  };

  const updateField = (field: keyof typeof formData, index: number, value: string) => {
    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.department || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Filter out empty array items
    const cleanedData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(item => item.trim()),
      requirements: formData.requirements.filter(item => item.trim()),
      skills: formData.skills.filter(item => item.trim()),
      benefits: formData.benefits.filter(item => item.trim())
    };

    // Save job posting (you can integrate with your data management here)
    const jobPosting = {
      id: Date.now(),
      ...cleanedData,
      organizationName,
      postedAt: new Date().toISOString(),
      status: "active"
    };

    // Store in localStorage for now
    const existingJobs = JSON.parse(localStorage.getItem('job_postings') || '[]');
    existingJobs.push(jobPosting);
    localStorage.setItem('job_postings', JSON.stringify(existingJobs));

    toast.success("Job posted successfully!");
    onClose();
    
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center">
                <Briefcase className="w-6 h-6 mr-2" />
                Post New Job - {organizationName}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Frontend Developer"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="e.g. Engineering"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Bangalore, India"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={formData.jobType} onValueChange={(value) => setFormData(prev => ({ ...prev, jobType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="e.g. ₹8-12 LPA"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
                  rows={4}
                  required
                />
              </div>

              {/* Dynamic Array Fields */}
              {[
                { key: 'responsibilities', label: 'Key Responsibilities', placeholder: 'Add a responsibility...' },
                { key: 'requirements', label: 'Requirements', placeholder: 'Add a requirement...' },
                { key: 'skills', label: 'Required Skills', placeholder: 'Add a skill...' },
                { key: 'benefits', label: 'Benefits & Perks', placeholder: 'Add a benefit...' }
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{label}</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => addField(key as keyof typeof formData)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add {label.split(' ')[1] || label}
                    </Button>
                  </div>
                  {(formData[key as keyof typeof formData] as string[]).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateField(key as keyof typeof formData, index, e.target.value)}
                        placeholder={placeholder}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeField(key as keyof typeof formData, index)}
                        disabled={(formData[key as keyof typeof formData] as string[]).length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ))}

              {/* Application Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
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
