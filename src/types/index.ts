export type NavigationSection = 'public' | 'admin';

export type PublicView = 
  | 'home' 
  | 'services' 
  | 'projects' 
  | 'calculator' 
  | 'insights' 
  | 'article-detail' 
  | 'contact';

export type AdminView = 
  | 'overview' 
  | 'content' 
  | 'editor' 
  | 'media' 
  | 'leads' 
  | 'users'
  | 'analytics' 
  | 'settings';

export type ContentStatus = 'draft' | 'in_review' | 'scheduled' | 'published';

export type ContentCategory = 
  | 'Solar Energy' 
  | 'Wind Infrastructure' 
  | 'ESG & Sustainability' 
  | 'Grid Modernization' 
  | 'Energy Trading' 
  | 'Executive Advisory';

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  summary: string;
  category: ContentCategory;
  tags: string[];
  status: ContentStatus;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  views: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords: string[];
  };
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  region: string;
  category: ContentCategory;
  capacityMW: number;
  co2OffsetTonsYear: number;
  investmentAmount: string;
  completionYear: number;
  description: string;
  keyOutcomes: string[];
  imageUrl: string;
  featured: boolean;
  status: ContentStatus;
}

export interface ServiceSolution {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  metricsHighlighted: string;
  category: ContentCategory;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  sizeBytes: number;
  dimensions?: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
}

export type LeadStatus = 'new' | 'in_contact' | 'proposal_sent' | 'contracted' | 'archived';

export interface EnterpriseLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  projectType: string;
  estimatedBudget: string;
  timeline: string;
  message: string;
  status: LeadStatus;
  submittedAt: string;
  score: 'High' | 'Medium' | 'Standard';
  notes?: string;
}

export type UserRole = 'Super Admin' | 'Admin' | 'Editor';

export type UserStatus = 'Active' | 'Inactive';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  photoURL: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  // Aliases for compatibility
  id?: string;
  name?: string;
  avatar?: string;
  department?: string;
}

export interface ActivityLogItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'publish' | 'delete' | 'lead';
}

export interface EnergyCalculatorInputs {
  facilityAreaSqFt: number;
  monthlyElectricityBillUSD: number;
  regionSolarIrradiance: 'High (Desert/Southwest)' | 'Moderate (Midwest/East)' | 'Standard (Coastal)';
  targetRenewablePercent: number;
  includeBatteryStorage: boolean;
}

export interface EnergyCalculatorResults {
  recommendedSolarKW: number;
  annualGenerationKWh: number;
  estimatedAnnualSavingsUSD: number;
  co2OffsetTonsAnnual: number;
  treesPlantedEquivalent: number;
  paybackPeriodYears: number;
  projected20YearROI: number;
}
