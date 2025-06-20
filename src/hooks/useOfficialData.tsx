
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
  organizationId?: string; // Track which organization this application belongs to
}

export const useOfficialData = () => {
  const [officialUser, setOfficialUser] = useState<OfficialUser | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    // Load official user from localStorage
    const storedUser = localStorage.getItem('officialUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setOfficialUser(user);
      
      // Load applications for this specific organization
      loadApplicationsForOrganization(user.organization.id);
    }
  }, []);

  const loadApplicationsForOrganization = (organizationId: string) => {
    const storageKey = `applications_${organizationId}`;
    const storedApplications = localStorage.getItem(storageKey);
    
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    } else {
      // Create mock applications specific to the organization
      const mockApplications: JobApplication[] = generateMockApplicationsForOrg(organizationId);
      setApplications(mockApplications);
      localStorage.setItem(storageKey, JSON.stringify(mockApplications));
    }
  };

  const generateMockApplicationsForOrg = (organizationId: string): JobApplication[] => {
    const baseApplications = [
      {
        id: 1,
        studentName: "Rahul Sharma",
        studentEmail: "rahul.sharma@student.com",
        jobTitle: "Frontend Developer Intern",
        appliedAt: "2024-01-15",
        status: "pending" as const,
        skills: ["React", "JavaScript", "CSS"],
        coverLetter: "I am excited to apply for this position and contribute to your innovative projects.",
        organizationId
      },
      {
        id: 2,
        studentName: "Priya Patel",
        studentEmail: "priya.patel@student.com",
        jobTitle: "Data Science Intern",
        appliedAt: "2024-01-14",
        status: "reviewed" as const,
        skills: ["Python", "Machine Learning", "SQL"],
        coverLetter: "With my background in data science and passion for analytics, I believe I can add value to your team.",
        organizationId
      },
      {
        id: 3,
        studentName: "Amit Kumar",
        studentEmail: "amit.kumar@student.com",
        jobTitle: "Full Stack Developer",
        appliedAt: "2024-01-13",
        status: "shortlisted" as const,
        skills: ["React", "Node.js", "MongoDB"],
        coverLetter: "I have 2 years of experience in full-stack development and am eager to contribute to your projects.",
        organizationId
      },
      {
        id: 4,
        studentName: "Sneha Reddy",
        studentEmail: "sneha.reddy@student.com",
        jobTitle: "UI/UX Designer",
        appliedAt: "2024-01-12",
        status: "pending" as const,
        skills: ["Figma", "Adobe XD", "Prototyping"],
        coverLetter: "I'm passionate about creating user-centered designs that solve real problems.",
        organizationId
      },
      {
        id: 5,
        studentName: "Arjun Singh",
        studentEmail: "arjun.singh@student.com", 
        jobTitle: "Backend Developer",
        appliedAt: "2024-01-11",
        status: "rejected" as const,
        skills: ["Java", "Spring Boot", "MySQL"],
        coverLetter: "I have strong experience in backend development and database management.",
        organizationId
      }
    ];

    // Customize applications based on organization type
    return baseApplications.map(app => ({
      ...app,
      id: app.id + (organizationId.length * 10), // Ensure unique IDs per org
    }));
  };

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
    
    // Load applications for this organization
    loadApplicationsForOrganization(organization.id);
    return true;
  };

  const updateApplicationStatus = (applicationId: number, status: JobApplication['status']) => {
    if (!officialUser) return;

    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    );
    
    setApplications(updatedApplications);
    
    // Save to organization-specific storage
    const storageKey = `applications_${officialUser.organization.id}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedApplications));
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
