
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { JobDetailsModal } from './JobDetailsModal';
import { JobSummaryCards } from './JobSummaryCards';
import { JobFilters } from './JobFilters';
import { JobPostingCard } from './JobPostingCard';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'internship' | 'full-time' | 'part-time' | 'contract';
  stipend: string;
  description: string;
  requirements: string[];
  postedDate: string;
  applicationDeadline: string;
  status: 'pending' | 'approved' | 'rejected';
  isFlagged: boolean;
  flagReason?: string;
  contactEmail: string;
  applicationsCount: number;
}

export const JobModerationPanel = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize with sample job postings
    const sampleJobs: JobPosting[] = [
      {
        id: '1',
        title: 'Frontend Developer Intern',
        company: 'TechCorp Innovations',
        location: 'Hyderabad',
        jobType: 'internship',
        stipend: '₹25,000/month',
        description: 'Work on React-based web applications and learn modern frontend development practices. You will be part of a dynamic team working on cutting-edge projects.',
        requirements: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
        postedDate: '2024-01-15',
        applicationDeadline: '2024-02-15',
        status: 'pending',
        isFlagged: false,
        contactEmail: 'hr@techcorp.com',
        applicationsCount: 45
      },
      {
        id: '2',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        location: 'Warangal',
        jobType: 'full-time',
        stipend: '₹4,50,000/year',
        description: 'Analyze business data and create insights for decision making. Work with large datasets and present findings to stakeholders.',
        requirements: ['Python', 'SQL', 'Excel', 'Statistics'],
        postedDate: '2024-01-10',
        applicationDeadline: '2024-02-10',
        status: 'approved',
        isFlagged: false,
        contactEmail: 'careers@analyticspro.com',
        applicationsCount: 67
      },
      {
        id: '3',
        title: 'Software Developer - Suspicious',
        company: 'Fake Company Ltd',
        location: 'Unknown',
        jobType: 'internship',
        stipend: '₹5,000/month',
        description: 'Vague job description with unrealistic requirements.',
        requirements: ['Everything', 'All technologies', '10+ years experience'],
        postedDate: '2024-01-20',
        applicationDeadline: '2024-01-25',
        status: 'pending',
        isFlagged: true,
        flagReason: 'AI Detection: Unusually low stipend and unrealistic requirements for internship',
        contactEmail: 'fake@example.com',
        applicationsCount: 2
      }
    ];
    
    setJobPostings(sampleJobs);
    setFilteredJobs(sampleJobs);
  }, []);

  useEffect(() => {
    // Filter job postings
    let filtered = jobPostings;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.jobType === typeFilter);
    }
    
    setFilteredJobs(filtered);
  }, [jobPostings, searchTerm, statusFilter, typeFilter]);

  const handleJobAction = (jobId: string, action: 'approve' | 'reject') => {
    const updatedJobs = jobPostings.map(job => 
      job.id === jobId 
        ? { ...job, status: action === 'approve' ? 'approved' : 'rejected' as 'pending' | 'approved' | 'rejected' }
        : job
    );
    
    setJobPostings(updatedJobs);
    toast.success(`Job posting ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
  };

  const handleApproveJob = (jobId: string) => {
    handleJobAction(jobId, 'approve');
  };

  const handleRejectJob = (jobId: string) => {
    handleJobAction(jobId, 'reject');
  };

  const handleFlagJob = (jobId: string) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (!job) return;

    const updatedJobs = jobPostings.map(j => 
      j.id === jobId 
        ? { 
            ...j, 
            isFlagged: !j.isFlagged,
            flagReason: !j.isFlagged ? 'Manually flagged for review' : undefined
          }
        : j
    );
    
    setJobPostings(updatedJobs);
    toast.success(`Job posting ${!job.isFlagged ? 'flagged' : 'unflagged'} successfully!`);
  };

  const handleViewDetails = (job: JobPosting) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSendEmail = (jobId: string, companyEmail: string) => {
    // Get profile data to check email configuration
    const profileData = localStorage.getItem('officialProfile');
    if (!profileData) {
      toast.error("Please configure your profile first");
      return;
    }

    const profile = JSON.parse(profileData);
    if (!profile.emailApiKey && !profile.smtpUsername) {
      toast.error("Please configure email settings in your profile");
      return;
    }

    // Simulate email sending
    toast.success(`Email sent to ${companyEmail} regarding job posting`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Job Post Moderation</h2>
          <p className="text-white/70">Review and moderate job postings and internship listings</p>
        </div>
      </div>

      {/* Summary Cards */}
      <JobSummaryCards jobPostings={jobPostings} />

      {/* Filters */}
      <JobFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Job Postings List */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <JobPostingCard
            key={job.id}
            job={job}
            index={index}
            onViewDetails={handleViewDetails}
            onFlag={handleFlagJob}
            onApprove={handleApproveJob}
            onReject={handleRejectJob}
            onSendEmail={handleSendEmail}
          />
        ))}
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onApprove={handleApproveJob}
        onReject={handleRejectJob}
        onFlag={handleFlagJob}
        onSendEmail={handleSendEmail}
      />
    </div>
  );
};
