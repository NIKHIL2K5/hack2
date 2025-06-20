
import { useState, useEffect } from 'react';
import { getOrganizationByEmail, OfficialOrganization } from '@/services/officialAuth';

export interface OfficialUser {
  email: string;
  name: string;
  organization: OfficialOrganization;
  department: string;
  employeeId: string;
  registeredAt: string;
}

export interface JobApplication {
  id: number;
  studentName: string;
  studentEmail: string;
  jobTitle: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  resumeUrl?: string;
  coverLetter?: string;
  skills: string[];
}

export const useOfficialData = () => {
  const [officialUser, setOfficialUser] = useState<OfficialUser | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    // Load official user from localStorage
    const storedUser = localStorage.getItem('officialUser');
    if (storedUser) {
      setOfficialUser(JSON.parse(storedUser));
    }

    // Load applications for this organization
    const storedApplications = localStorage.getItem('organizationApplications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    } else {
      // Mock applications for demonstration
      const mockApplications: JobApplication[] = [
        {
          id: 1,
          studentName: "Rahul Sharma",
          studentEmail: "rahul.sharma@student.com",
          jobTitle: "Frontend Developer Intern",
          appliedAt: "2024-01-15",
          status: "pending",
          skills: ["React", "JavaScript", "CSS"],
          coverLetter: "I am excited to apply for this position..."
        },
        {
          id: 2,
          studentName: "Priya Patel",
          studentEmail: "priya.patel@student.com",
          jobTitle: "Data Science Intern",
          appliedAt: "2024-01-14",
          status: "reviewed",
          skills: ["Python", "Machine Learning", "SQL"],
          coverLetter: "With my background in data science..."
        },
        {
          id: 3,
          studentName: "Amit Kumar",
          studentEmail: "amit.kumar@student.com",
          jobTitle: "Full Stack Developer",
          appliedAt: "2024-01-13",
          status: "shortlisted",
          skills: ["React", "Node.js", "MongoDB"],
          coverLetter: "I have 2 years of experience in..."
        }
      ];
      setApplications(mockApplications);
      localStorage.setItem('organizationApplications', JSON.stringify(mockApplications));
    }
  }, []);

  const loginOfficial = (email: string, name: string, department: string, employeeId: string) => {
    const organization = getOrganizationByEmail(email);
    if (!organization) return false;

    const user: OfficialUser = {
      email,
      name,
      organization,
      department,
      employeeId,
      registeredAt: new Date().toISOString()
    };

    setOfficialUser(user);
    localStorage.setItem('officialUser', JSON.stringify(user));
    return true;
  };

  const updateApplicationStatus = (applicationId: number, status: JobApplication['status']) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('organizationApplications', JSON.stringify(updatedApplications));
  };

  const getApplicationStats = () => {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending').length;
    const reviewed = applications.filter(app => app.status === 'reviewed').length;
    const shortlisted = applications.filter(app => app.status === 'shortlisted').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    return { total, pending, reviewed, shortlisted, rejected };
  };

  return {
    officialUser,
    applications,
    loginOfficial,
    updateApplicationStatus,
    getApplicationStats
  };
};
