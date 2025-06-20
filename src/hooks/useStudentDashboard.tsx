
import { useState, useEffect } from 'react';
import { getAllCompanies, getDistrictsWithCompanies, getSectorsWithCompanies } from '@/services/companyData';

export const useStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState(getAllCompanies());
  const [availableDistricts] = useState(getDistrictsWithCompanies());
  const [availableSectors] = useState(getSectorsWithCompanies());

  const stats = {
    totalApplications: 45,
    pendingReviews: 12,
    interviews: 3,
    rejections: 8,
    acceptances: 2
  };

  const recentApplications = [
    { company: 'TechVenture Solutions', position: 'Software Developer Intern', status: 'Under Review', appliedDate: '2024-01-15' },
    { company: 'HealthTech Innovations', position: 'Data Analyst Intern', status: 'Interview Scheduled', appliedDate: '2024-01-12' },
    { company: 'FinPay Solutions', position: 'Frontend Developer', status: 'Accepted', appliedDate: '2024-01-10' },
    { company: 'GreenTech Innovations', position: 'Product Manager Intern', status: 'Rejected', appliedDate: '2024-01-08' }
  ];

  const savedJobs = [
    { id: 1, company: 'EduTech Global', position: 'UI/UX Designer Intern', location: 'Hyderabad', savedDate: '2024-01-18' },
    { id: 2, company: 'Smart Manufacturing Co', position: 'IoT Developer', location: 'Karimnagar', savedDate: '2024-01-17' },
    { id: 3, company: 'BioTech Solutions', position: 'Research Intern', location: 'Nizamabad', savedDate: '2024-01-16' }
  ];

  return {
    activeTab,
    setActiveTab,
    stats,
    recentApplications,
    savedJobs,
    companies,
    availableDistricts,
    availableSectors
  };
};
