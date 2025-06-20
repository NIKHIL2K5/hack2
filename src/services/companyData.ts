
export interface Company {
  id: string;
  name: string;
  district: string;
  sector: string;
  registrationType: 'DPIIT' | 'MSME' | 'GST' | 'Multiple';
  registrationDate: string;
  complianceStatus: 'compliant' | 'pending' | 'overdue';
  lastComplianceDate: string;
  employeeCount: number;
  fundingReceived: string;
  contactEmail: string;
  contactPhone: string;
  isFlagged: boolean;
  flagReason?: string;
  website?: string;
  description?: string;
}

export const telanganaDistricts = [
  'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
  'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar',
  'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial',
  'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda',
  'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla',
  'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad',
  'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'
];

export const sectors = [
  'Technology', 'Healthcare', 'Agriculture', 'Manufacturing', 'Education',
  'Fintech', 'E-commerce', 'Renewable Energy', 'Biotechnology', 'Food Processing',
  'Textiles', 'Automotive', 'Real Estate', 'Tourism', 'Media & Entertainment'
];

export const getAllCompanies = (): Company[] => {
  return [
    // Hyderabad - Tech Hub (Multiple companies)
    { id: '1', name: 'TechVenture Solutions', district: 'Hyderabad', sector: 'Technology', registrationType: 'DPIIT', registrationDate: '2023-03-15', complianceStatus: 'compliant', lastComplianceDate: '2024-01-15', employeeCount: 25, fundingReceived: '₹2.5 Crore', contactEmail: 'info@techventure.com', contactPhone: '+91 9876543210', isFlagged: false, website: 'www.techventure.com', description: 'AI-powered software solutions for enterprises' },
    { id: '2', name: 'HealthTech Innovations', district: 'Hyderabad', sector: 'Healthcare', registrationType: 'Multiple', registrationDate: '2023-05-20', complianceStatus: 'compliant', lastComplianceDate: '2024-01-10', employeeCount: 18, fundingReceived: '₹1.8 Crore', contactEmail: 'contact@healthtech.in', contactPhone: '+91 9876543211', isFlagged: false, website: 'www.healthtech.in', description: 'Digital health monitoring and telemedicine platform' },
    { id: '3', name: 'FinPay Solutions', district: 'Hyderabad', sector: 'Fintech', registrationType: 'DPIIT', registrationDate: '2023-08-12', complianceStatus: 'pending', lastComplianceDate: '2023-11-12', employeeCount: 30, fundingReceived: '₹3.2 Crore', contactEmail: 'hello@finpay.co', contactPhone: '+91 9876543212', isFlagged: false, website: 'www.finpay.co', description: 'Digital payment and financial services platform' },
    { id: '4', name: 'EduTech Global', district: 'Hyderabad', sector: 'Education', registrationType: 'DPIIT', registrationDate: '2023-09-05', complianceStatus: 'compliant', lastComplianceDate: '2024-01-12', employeeCount: 42, fundingReceived: '₹2.8 Crore', contactEmail: 'info@edutech.global', contactPhone: '+91 9876543280', isFlagged: false, website: 'www.edutech.global', description: 'Online learning platform with AI-powered personalization' },
    
    // Warangal Districts
    { id: '5', name: 'GreenTech Innovations', district: 'Warangal Urban', sector: 'Renewable Energy', registrationType: 'Multiple', registrationDate: '2023-07-22', complianceStatus: 'compliant', lastComplianceDate: '2023-12-22', employeeCount: 12, fundingReceived: '₹1.2 Crore', contactEmail: 'contact@greentech.in', contactPhone: '+91 9876543213', isFlagged: false, website: 'www.greentech.in', description: 'Solar and wind energy solutions for rural areas' },
    { id: '6', name: 'AgriBot Systems', district: 'Warangal Rural', sector: 'Agriculture', registrationType: 'MSME', registrationDate: '2023-09-05', complianceStatus: 'compliant', lastComplianceDate: '2024-01-05', employeeCount: 8, fundingReceived: '₹80 Lakh', contactEmail: 'info@agribot.co', contactPhone: '+91 9876543214', isFlagged: false, website: 'www.agribot.co', description: 'Automated farming equipment and IoT solutions' },
    { id: '7', name: 'Textile Tech Hub', district: 'Warangal Urban', sector: 'Manufacturing', registrationType: 'DPIIT', registrationDate: '2023-06-20', complianceStatus: 'compliant', lastComplianceDate: '2024-01-11', employeeCount: 28, fundingReceived: '₹2.2 Crore', contactEmail: 'info@textiletech.in', contactPhone: '+91 9876543224', isFlagged: false, website: 'www.textiletech.in', description: 'Smart textile manufacturing with sustainable processes' },
    
    // Rangareddy
    { id: '8', name: 'EduLearn Platform', district: 'Rangareddy', sector: 'Education', registrationType: 'DPIIT', registrationDate: '2023-04-18', complianceStatus: 'compliant', lastComplianceDate: '2024-01-18', employeeCount: 22, fundingReceived: '₹1.5 Crore', contactEmail: 'team@edulearn.in', contactPhone: '+91 9876543215', isFlagged: false, website: 'www.edulearn.in', description: 'Skill development and vocational training platform' },
    { id: '9', name: 'Suspicious Corp', district: 'Rangareddy', sector: 'Fintech', registrationType: 'GST', registrationDate: '2024-01-01', complianceStatus: 'overdue', lastComplianceDate: '2024-01-01', employeeCount: 5, fundingReceived: '₹50 Lakh', contactEmail: 'fake@suspicious.com', contactPhone: '+91 0000000000', isFlagged: true, flagReason: 'AI Detection: Unusual registration pattern and missing compliance documents', website: 'suspicious.com', description: 'Questionable financial services' },
    
    // One company for each remaining district
    { id: '10', name: 'Smart Manufacturing Co', district: 'Karimnagar', sector: 'Manufacturing', registrationType: 'MSME', registrationDate: '2023-06-10', complianceStatus: 'compliant', lastComplianceDate: '2024-01-08', employeeCount: 45, fundingReceived: '₹4.2 Crore', contactEmail: 'contact@smartmfg.in', contactPhone: '+91 9876543216', isFlagged: false, website: 'www.smartmfg.in', description: 'Industry 4.0 manufacturing solutions' },
    { id: '11', name: 'BioTech Solutions', district: 'Nizamabad', sector: 'Biotechnology', registrationType: 'DPIIT', registrationDate: '2023-02-28', complianceStatus: 'compliant', lastComplianceDate: '2024-01-12', employeeCount: 15, fundingReceived: '₹1.8 Crore', contactEmail: 'info@biotech.co.in', contactPhone: '+91 9876543217', isFlagged: false, website: 'www.biotech.co.in', description: 'Agricultural biotechnology and crop improvement' },
    { id: '12', name: 'Food Processing Hub', district: 'Khammam', sector: 'Food Processing', registrationType: 'Multiple', registrationDate: '2023-10-15', complianceStatus: 'pending', lastComplianceDate: '2023-12-15', employeeCount: 20, fundingReceived: '₹2.1 Crore', contactEmail: 'hello@foodhub.in', contactPhone: '+91 9876543218', isFlagged: false, website: 'www.foodhub.in', description: 'Organic food processing and distribution' },
    { id: '13', name: 'E-Commerce Express', district: 'Nalgonda', sector: 'E-commerce', registrationType: 'GST', registrationDate: '2023-11-08', complianceStatus: 'compliant', lastComplianceDate: '2024-01-20', employeeCount: 35, fundingReceived: '₹2.8 Crore', contactEmail: 'support@ecomexpress.in', contactPhone: '+91 9876543219', isFlagged: false, website: 'www.ecomexpress.in', description: 'Rural e-commerce and logistics platform' },
    { id: '14', name: 'Rural Tech Solutions', district: 'Medak', sector: 'Technology', registrationType: 'MSME', registrationDate: '2023-08-25', complianceStatus: 'compliant', lastComplianceDate: '2024-01-14', employeeCount: 12, fundingReceived: '₹95 Lakh', contactEmail: 'info@ruraltech.co', contactPhone: '+91 9876543220', isFlagged: false, website: 'www.ruraltech.co', description: 'Digital solutions for rural communities' },
    { id: '15', name: 'Tribal Crafts Digital', district: 'Adilabad', sector: 'E-commerce', registrationType: 'DPIIT', registrationDate: '2023-09-12', complianceStatus: 'pending', lastComplianceDate: '2023-12-12', employeeCount: 8, fundingReceived: '₹65 Lakh', contactEmail: 'contact@tribalcrafts.in', contactPhone: '+91 9876543221', isFlagged: false, website: 'www.tribalcrafts.in', description: 'Digital marketplace for tribal artisans' },
    { id: '16', name: 'Agri-Solar Systems', district: 'Siddipet', sector: 'Renewable Energy', registrationType: 'Multiple', registrationDate: '2023-07-03', complianceStatus: 'compliant', lastComplianceDate: '2024-01-03', employeeCount: 18, fundingReceived: '₹1.6 Crore', contactEmail: 'info@agrisolar.in', contactPhone: '+91 9876543222', isFlagged: false, website: 'www.agrisolar.in', description: 'Solar power solutions for agriculture' },
    { id: '17', name: 'Health Connect Rural', district: 'Mahabubnagar', sector: 'Healthcare', registrationType: 'MSME', registrationDate: '2023-05-14', complianceStatus: 'compliant', lastComplianceDate: '2024-01-16', employeeCount: 25, fundingReceived: '₹1.4 Crore', contactEmail: 'team@healthconnect.in', contactPhone: '+91 9876543223', isFlagged: false, website: 'www.healthconnect.in', description: 'Telemedicine services for rural healthcare' },
    { id: '18', name: 'Digital Learning Labs', district: 'Sangareddy', sector: 'Education', registrationType: 'Multiple', registrationDate: '2023-08-30', complianceStatus: 'pending', lastComplianceDate: '2023-11-30', employeeCount: 16, fundingReceived: '₹1.1 Crore', contactEmail: 'hello@digitallearn.co', contactPhone: '+91 9876543225', isFlagged: false, website: 'www.digitallearn.co', description: 'Digital literacy and skill development programs' },
    { id: '19', name: 'Pharma Innovation Ltd', district: 'Medchal-Malkajgiri', sector: 'Biotechnology', registrationType: 'DPIIT', registrationDate: '2023-04-25', complianceStatus: 'compliant', lastComplianceDate: '2024-01-18', employeeCount: 32, fundingReceived: '₹3.5 Crore', contactEmail: 'contact@pharmainnovation.in', contactPhone: '+91 9876543226', isFlagged: false, website: 'www.pharmainnovation.in', description: 'Pharmaceutical research and drug development' },
    { id: '20', name: 'Forest Products Tech', district: 'Bhadradri Kothagudem', sector: 'Manufacturing', registrationType: 'MSME', registrationDate: '2023-09-18', complianceStatus: 'compliant', lastComplianceDate: '2024-01-09', employeeCount: 14, fundingReceived: '₹1.3 Crore', contactEmail: 'info@foresttech.co.in', contactPhone: '+91 9876543227', isFlagged: false, website: 'www.foresttech.co.in', description: 'Sustainable forest product manufacturing' },
    { id: '21', name: 'Smart Agriculture Co', district: 'Suryapet', sector: 'Agriculture', registrationType: 'Multiple', registrationDate: '2023-10-05', complianceStatus: 'pending', lastComplianceDate: '2023-12-05', employeeCount: 11, fundingReceived: '₹88 Lakh', contactEmail: 'team@smartagri.in', contactPhone: '+91 9876543228', isFlagged: false, website: 'www.smartagri.in', description: 'Precision agriculture and farm automation' },
    
    // Adding companies for remaining districts
    { id: '22', name: 'Water Tech Solutions', district: 'Jagtial', sector: 'Technology', registrationType: 'DPIIT', registrationDate: '2023-06-15', complianceStatus: 'compliant', lastComplianceDate: '2024-01-15', employeeCount: 20, fundingReceived: '₹1.7 Crore', contactEmail: 'info@watertech.in', contactPhone: '+91 9876543229', isFlagged: false, website: 'www.watertech.in', description: 'Water purification and management systems' },
    { id: '23', name: 'Tribal Wellness Center', district: 'Jangaon', sector: 'Healthcare', registrationType: 'MSME', registrationDate: '2023-07-10', complianceStatus: 'compliant', lastComplianceDate: '2024-01-10', employeeCount: 15, fundingReceived: '₹1.2 Crore', contactEmail: 'contact@tribalwellness.in', contactPhone: '+91 9876543230', isFlagged: false, website: 'www.tribalwellness.in', description: 'Traditional and modern healthcare integration' },
    { id: '24', name: 'Eco Mining Solutions', district: 'Jayashankar Bhupalpally', sector: 'Manufacturing', registrationType: 'Multiple', registrationDate: '2023-05-08', complianceStatus: 'compliant', lastComplianceDate: '2024-01-08', employeeCount: 35, fundingReceived: '₹2.5 Crore', contactEmail: 'info@ecomining.co.in', contactPhone: '+91 9876543231', isFlagged: false, website: 'www.ecomining.co.in', description: 'Sustainable mining and mineral processing' },
    { id: '25', name: 'Cotton Tech Industries', district: 'Jogulamba Gadwal', sector: 'Textiles', registrationType: 'GST', registrationDate: '2023-08-20', complianceStatus: 'pending', lastComplianceDate: '2023-11-20', employeeCount: 40, fundingReceived: '₹3.0 Crore', contactEmail: 'info@cottontech.in', contactPhone: '+91 9876543232', isFlagged: false, website: 'www.cottontech.in', description: 'Advanced cotton processing and textile manufacturing' },
    { id: '26', name: 'Auto Parts Innovation', district: 'Kamareddy', sector: 'Automotive', registrationType: 'DPIIT', registrationDate: '2023-04-12', complianceStatus: 'compliant', lastComplianceDate: '2024-01-12', employeeCount: 28, fundingReceived: '₹2.2 Crore', contactEmail: 'contact@autoparts.in', contactPhone: '+91 9876543233', isFlagged: false, website: 'www.autoparts.in', description: 'Electric vehicle components and accessories' },
    { id: '27', name: 'Coal Valley Tech', district: 'Kumuram Bheem', sector: 'Technology', registrationType: 'MSME', registrationDate: '2023-09-25', complianceStatus: 'compliant', lastComplianceDate: '2024-01-20', employeeCount: 18, fundingReceived: '₹1.5 Crore', contactEmail: 'info@coalvalley.tech', contactPhone: '+91 9876543234', isFlagged: false, website: 'www.coalvalley.tech', description: 'Mining technology and safety solutions' },
    { id: '28', name: 'Handloom Digital', district: 'Mahabubabad', sector: 'E-commerce', registrationType: 'Multiple', registrationDate: 
    '2023-06-30', complianceStatus: 'compliant', lastComplianceDate: '2024-01-05', employeeCount: 12, fundingReceived: '₹75 Lakh', contactEmail: 'hello@handloomdigital.in', contactPhone: '+91 9876543235', isFlagged: false, website: 'www.handloomdigital.in', description: 'Digital marketplace for traditional handloom products' },
    { id: '29', name: 'Steel City Innovations', district: 'Mancherial', sector: 'Manufacturing', registrationType: 'DPIIT', registrationDate: '2023-03-22', complianceStatus: 'compliant', lastComplianceDate: '2024-01-22', employeeCount: 50, fundingReceived: '₹4.5 Crore', contactEmail: 'info@steelcity.in', contactPhone: '+91 9876543236', isFlagged: false, website: 'www.steelcity.in', description: 'Advanced steel processing and fabrication' },
    { id: '30', name: 'Forest Drone Services', district: 'Mulugu', sector: 'Technology', registrationType: 'GST', registrationDate: '2023-08-15', complianceStatus: 'pending', lastComplianceDate: '2023-11-15', employeeCount: 10, fundingReceived: '₹65 Lakh', contactEmail: 'contact@forestdrone.in', contactPhone: '+91 9876543237', isFlagged: false, website: 'www.forestdrone.in', description: 'Drone-based forest monitoring and conservation' }
  ];
};

export const getCompaniesByDistrict = (district: string): Company[] => {
  return getAllCompanies().filter(company => company.district === district);
};

export const getCompaniesBySector = (sector: string): Company[] => {
  return getAllCompanies().filter(company => company.sector === sector);
};

export const getDistrictsWithCompanies = (): string[] => {
  const companies = getAllCompanies();
  const districts = [...new Set(companies.map(company => company.district))];
  return districts.sort();
};

export const getSectorsWithCompanies = (): string[] => {
  const companies = getAllCompanies();
  const sectors = [...new Set(companies.map(company => company.sector))];
  return sectors.sort();
};
