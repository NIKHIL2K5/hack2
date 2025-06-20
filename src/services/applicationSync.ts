
export interface JobApplicationData {
  id: number;
  studentName: string;
  studentEmail: string;
  jobId: number;
  jobTitle: string;
  companyName: string;
  organizationId: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  resumeUrl?: string;
  coverLetter?: string;
  skills: string[];
  fullName: string;
  phone?: string;
  portfolio?: string;
}

class ApplicationSyncService {
  private storageKey = 'global_job_applications';

  // Submit application and sync to company
  submitApplication(applicationData: Partial<JobApplicationData>, job: any, studentProfile: any): JobApplicationData {
    const newApplication: JobApplicationData = {
      id: Date.now(),
      studentName: applicationData.fullName || studentProfile.name,
      studentEmail: applicationData.email || studentProfile.email,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company || job.organizationName,
      organizationId: job.organizationId || job.company,
      appliedAt: new Date().toISOString(),
      status: 'pending',
      resumeUrl: applicationData.resumeUrl,
      coverLetter: applicationData.coverLetter || '',
      skills: applicationData.skills || [],
      fullName: applicationData.fullName || studentProfile.name,
      phone: applicationData.phone,
      portfolio: applicationData.portfolio
    };

    // Save to global applications storage
    const existingApplications = this.getAllApplications();
    existingApplications.push(newApplication);
    localStorage.setItem(this.storageKey, JSON.stringify(existingApplications));

    // Also save to company-specific storage
    this.saveToCompanyStorage(newApplication);

    console.log('Application synced globally:', newApplication);
    return newApplication;
  }

  // Save application to specific company storage
  private saveToCompanyStorage(application: JobApplicationData) {
    const companyStorageKey = `applications_${application.organizationId}`;
    const companyApplications = JSON.parse(localStorage.getItem(companyStorageKey) || '[]');
    
    // Check if application already exists to avoid duplicates
    const existingApp = companyApplications.find((app: JobApplicationData) => 
      app.studentEmail === application.studentEmail && app.jobId === application.jobId
    );
    
    if (!existingApp) {
      companyApplications.push(application);
      localStorage.setItem(companyStorageKey, JSON.stringify(companyApplications));
    }
  }

  // Get all applications across all companies
  getAllApplications(): JobApplicationData[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Get applications for specific company
  getApplicationsForCompany(organizationId: string): JobApplicationData[] {
    const companyStorageKey = `applications_${organizationId}`;
    const stored = localStorage.getItem(companyStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Get applications for specific student
  getApplicationsForStudent(studentEmail: string): JobApplicationData[] {
    return this.getAllApplications().filter(app => app.studentEmail === studentEmail);
  }

  // Update application status
  updateApplicationStatus(applicationId: number, status: JobApplicationData['status'], organizationId: string) {
    // Update in global storage
    const allApplications = this.getAllApplications();
    const updatedApplications = allApplications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updatedApplications));

    // Update in company-specific storage
    const companyStorageKey = `applications_${organizationId}`;
    const companyApplications = this.getApplicationsForCompany(organizationId);
    const updatedCompanyApps = companyApplications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    );
    localStorage.setItem(companyStorageKey, JSON.stringify(updatedCompanyApps));
  }

  // Download resume functionality
  downloadResume(application: JobApplicationData) {
    if (application.resumeUrl) {
      const link = document.createElement('a');
      link.href = application.resumeUrl;
      link.download = `${application.studentName}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Generate a mock resume download
      const resumeContent = this.generateMockResume(application);
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${application.studentName}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  // Send email functionality
  sendEmail(application: JobApplicationData, subject: string = 'Regarding Your Job Application') {
    const emailBody = `Dear ${application.studentName},\n\nThank you for your application for the ${application.jobTitle} position at ${application.companyName}.\n\nWe will review your application and get back to you soon.\n\nBest regards,\n${application.companyName} Team`;
    
    const mailtoLink = `mailto:${application.studentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
  }

  // Generate mock resume content
  private generateMockResume(application: JobApplicationData): string {
    return `
RESUME - ${application.studentName}
===============================

Contact Information:
- Email: ${application.studentEmail}
- Phone: ${application.phone || '+91 9876543210'}

Skills:
${application.skills.map(skill => `- ${skill}`).join('\n')}

Applied Position: ${application.jobTitle}
Company: ${application.companyName}
Application Date: ${new Date(application.appliedAt).toLocaleDateString()}

Cover Letter:
${application.coverLetter || 'No cover letter provided'}

Status: ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
    `;
  }
}

export const applicationSyncService = new ApplicationSyncService();
