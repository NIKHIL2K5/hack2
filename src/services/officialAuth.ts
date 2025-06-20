
export interface OfficialOrganization {
  id: string;
  name: string;
  type: 'corporate' | 'government' | 'educational' | 'research';
  allowedEmails: string[];
  logo?: string;
}

export const OFFICIAL_ORGANIZATIONS: OfficialOrganization[] = [
  // Corporate Companies
  {
    id: 'techcorp',
    name: 'TechCorp Innovations',
    type: 'corporate',
    allowedEmails: [
      'hr.manager@techcorp.org.in',
      'recruitment@techcorp.org.in',
      'talent.acquisition@techcorp.org.in'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys Limited',
    type: 'corporate',
    allowedEmails: ['hiring@infosys.org.in']
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    type: 'corporate',
    allowedEmails: ['careers@tcs.org.in']
  },
  {
    id: 'wipro',
    name: 'Wipro Limited',
    type: 'corporate',
    allowedEmails: ['recruitment@wipro.org.in']
  },
  {
    id: 'cognizant',
    name: 'Cognizant Technology Solutions',
    type: 'corporate',
    allowedEmails: ['hr.head@cognizant.org.in']
  },
  {
    id: 'accenture',
    name: 'Accenture',
    type: 'corporate',
    allowedEmails: ['talent@accenture.org.in']
  },
  // Government Organizations
  {
    id: 'telangana',
    name: 'Government of Telangana',
    type: 'government',
    allowedEmails: ['officer@telangana.org.in']
  },
  {
    id: 'andhra',
    name: 'Government of Andhra Pradesh',
    type: 'government',
    allowedEmails: ['admin@andhra.org.in']
  },
  {
    id: 'kerala',
    name: 'Government of Kerala',
    type: 'government',
    allowedEmails: ['director@kerala.org.in']
  },
  {
    id: 'karnataka',
    name: 'Government of Karnataka',
    type: 'government',
    allowedEmails: ['manager@karnataka.org.in']
  },
  {
    id: 'india',
    name: 'Government of India',
    type: 'government',
    allowedEmails: ['coordinator@india.org.in']
  },
  // Educational Institutions
  {
    id: 'iit',
    name: 'Indian Institute of Technology',
    type: 'educational',
    allowedEmails: ['placement@iit.org.in']
  },
  {
    id: 'nit',
    name: 'National Institute of Technology',
    type: 'educational',
    allowedEmails: ['career.services@nit.org.in']
  },
  {
    id: 'iiit',
    name: 'International Institute of Information Technology',
    type: 'educational',
    allowedEmails: ['training@iiit.org.in']
  },
  // Research Organizations
  {
    id: 'isro',
    name: 'Indian Space Research Organisation',
    type: 'research',
    allowedEmails: ['hr@isro.org.in']
  },
  {
    id: 'drdo',
    name: 'Defence Research and Development Organisation',
    type: 'research',
    allowedEmails: ['recruitment@drdo.org.in']
  },
  {
    id: 'csir',
    name: 'Council of Scientific and Industrial Research',
    type: 'research',
    allowedEmails: ['careers@csir.org.in']
  }
];

export const isValidOfficialEmail = (email: string): boolean => {
  return OFFICIAL_ORGANIZATIONS.some(org => 
    org.allowedEmails.includes(email.toLowerCase())
  );
};

export const getOrganizationByEmail = (email: string): OfficialOrganization | null => {
  return OFFICIAL_ORGANIZATIONS.find(org => 
    org.allowedEmails.includes(email.toLowerCase())
  ) || null;
};

export const getAllowedEmails = (): string[] => {
  return OFFICIAL_ORGANIZATIONS.flatMap(org => org.allowedEmails);
};
