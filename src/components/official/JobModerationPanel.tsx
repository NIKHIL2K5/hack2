
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, XCircle, AlertTriangle, Eye, Flag, MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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
        description: 'Work on React-based web applications and learn modern frontend development practices.',
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
        description: 'Analyze business data and create insights for decision making.',
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-700';
      case 'full-time': return 'bg-green-100 text-green-700';
      case 'part-time': return 'bg-purple-100 text-purple-700';
      case 'contract': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Jobs', value: jobPostings.length.toString(), color: 'bg-blue-500' },
          { title: 'Pending Review', value: jobPostings.filter(j => j.status === 'pending').length.toString(), color: 'bg-yellow-500' },
          { title: 'Approved', value: jobPostings.filter(j => j.status === 'approved').length.toString(), color: 'bg-green-500' },
          { title: 'Flagged', value: jobPostings.filter(j => j.isFlagged).length.toString(), color: 'bg-red-500' }
        ].map((stat, index) => (
          <Card key={stat.title} className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Search Jobs</Label>
              <Input
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-white">Job Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Postings List */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-white/10 backdrop-blur-lg border-white/20 ${job.isFlagged ? 'ring-2 ring-red-500/50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                      {job.isFlagged && (
                        <Badge className="bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          FLAGGED
                        </Badge>
                      )}
                      <Badge className={getStatusColor(job.status)}>
                        {job.status.toUpperCase()}
                      </Badge>
                      <Badge className={getJobTypeColor(job.jobType)}>
                        {job.jobType.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-white/80 mb-3">{job.company}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.applicationsCount} applications</span>
                      </div>
                    </div>

                    {job.isFlagged && job.flagReason && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-3">
                        <p className="text-red-200 text-sm">
                          <AlertTriangle className="w-4 h-4 inline mr-2" />
                          {job.flagReason}
                        </p>
                      </div>
                    )}

                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <p className="text-white/70 text-sm line-clamp-2">{job.description}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-white/80 text-sm mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="outline" className="border-blue-300 text-blue-200 bg-blue-500/20">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    
                    <Button
                      onClick={() => handleFlagJob(job.id)}
                      variant="outline"
                      size="sm"
                      className={job.isFlagged 
                        ? "bg-green-500/20 border-green-500/50 text-green-200"
                        : "bg-red-500/20 border-red-500/50 text-red-200"
                      }
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      {job.isFlagged ? 'Unflag' : 'Flag'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Stipend/Salary</p>
                    <p className="text-lg font-bold text-green-400">{job.stipend}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Application Deadline</p>
                    <p className="text-lg font-bold text-blue-400">
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white/70 text-sm">Contact</p>
                    <p className="text-sm text-white/80">{job.contactEmail}</p>
                  </div>
                </div>

                {job.status === 'pending' && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleJobAction(job.id, 'approve')}
                      className="bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Job Posting
                    </Button>
                    <Button
                      onClick={() => handleJobAction(job.id, 'reject')}
                      className="bg-red-600 text-white"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Job Posting
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
