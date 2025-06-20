
import { useState } from "react";
import { toast } from "sonner";
import { dataSyncService } from "@/services/dataSync";

export interface JobFormData {
  title: string;
  department: string;
  location: string;
  jobType: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  deadline: string;
}

const initialFormData: JobFormData = {
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
};

export const useJobPostingForm = (organizationName: string, onClose: () => void) => {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayField = (
    field: keyof Pick<JobFormData, 'responsibilities' | 'requirements' | 'skills' | 'benefits'>, 
    index: number, 
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: keyof Pick<JobFormData, 'responsibilities' | 'requirements' | 'skills' | 'benefits'>) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayItem = (
    field: keyof Pick<JobFormData, 'responsibilities' | 'requirements' | 'skills' | 'benefits'>, 
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
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
    setFormData(initialFormData);
    onClose();
  };

  return {
    formData,
    handleInputChange,
    handleArrayField,
    addArrayItem,
    removeArrayItem,
    handleSubmit
  };
};
