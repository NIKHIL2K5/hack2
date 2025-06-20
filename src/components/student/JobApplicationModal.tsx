
import { User, Briefcase, FileText, Upload, Globe, Github, Linkedin, Building2 } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string[];
  description: string;
  posted: string;
  type: string;
}

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  experience: string;
  skills: string;
  coverLetter: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  expectedSalary: string;
  availableFrom: string;
  workMode: string;
  additionalInfo: string;
  resumeFile: File | null;
}

interface JobApplicationModalProps {
  selectedJob: Job | null;
  applicationData: ApplicationData;
  onInputChange: (field: string, value: string) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const JobApplicationModal = ({
  selectedJob,
  applicationData,
  onInputChange,
  onFileUpload,
  onSubmit
}: JobApplicationModalProps) => {
  if (!selectedJob) return null;

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-2xl font-bold text-center text-primary-700">
          Apply for {selectedJob.title}
        </DialogTitle>
        <div className="text-center text-neutral-600 mt-2">
          <p className="flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4" />
            {selectedJob.company} • {selectedJob.location}
          </p>
        </div>
      </DialogHeader>
      
      <form onSubmit={onSubmit} className="space-y-6 py-4">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <Input
                value={applicationData.fullName}
                onChange={(e) => onInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
                className="border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <Input
                type="email"
                value={applicationData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
                className="border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <Input
                type="tel"
                value={applicationData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                placeholder="+91 9876543210"
                required
                className="border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Location</label>
              <Input
                value={applicationData.location}
                onChange={(e) => onInputChange('location', e.target.value)}
                placeholder="City, State"
                className="border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            Professional Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Education Background</label>
              <Textarea
                value={applicationData.education}
                onChange={(e) => onInputChange('education', e.target.value)}
                placeholder="e.g., B.Tech Computer Science, JNTUH (2020-2024)"
                className="border-gray-300 h-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Experience</label>
              <Textarea
                value={applicationData.experience}
                onChange={(e) => onInputChange('experience', e.target.value)}
                placeholder="Describe your relevant work experience, internships, projects..."
                className="border-gray-300 h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
              <Input
                value={applicationData.skills}
                onChange={(e) => onInputChange('skills', e.target.value)}
                placeholder="React, JavaScript, Python, Node.js, etc."
                className="border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Application Details Section */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            Application Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cover Letter *</label>
              <Textarea
                value={applicationData.coverLetter}
                onChange={(e) => onInputChange('coverLetter', e.target.value)}
                placeholder="Write a compelling cover letter explaining why you're perfect for this role..."
                className="border-gray-300 h-32"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expected Salary/Stipend</label>
                <Input
                  value={applicationData.expectedSalary}
                  onChange={(e) => onInputChange('expectedSalary', e.target.value)}
                  placeholder="₹25,000 per month"
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Available From</label>
                <Input
                  type="date"
                  value={applicationData.availableFrom}
                  onChange={(e) => onInputChange('availableFrom', e.target.value)}
                  className="border-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Work Mode Preference</label>
              <select
                value={applicationData.workMode}
                onChange={(e) => onInputChange('workMode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Portfolio & Resume Section */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-purple-600" />
            Portfolio & Resume
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Resume/CV *</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={onFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </label>
                {applicationData.resumeFile && (
                  <span className="text-sm text-green-600 font-medium">
                    ✓ {applicationData.resumeFile.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Portfolio URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={applicationData.portfolioUrl}
                    onChange={(e) => onInputChange('portfolioUrl', e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="border-gray-300 pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub Profile</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={applicationData.githubUrl}
                    onChange={(e) => onInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username"
                    className="border-gray-300 pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={applicationData.linkedinUrl}
                    onChange={(e) => onInputChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="border-gray-300 pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <Textarea
            value={applicationData.additionalInfo}
            onChange={(e) => onInputChange('additionalInfo', e.target.value)}
            placeholder="Any additional information you'd like to share (achievements, certifications, etc.)..."
            className="border-gray-300 h-24"
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
