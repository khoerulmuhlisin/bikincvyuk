
export type TemplateType = 'modern' | 'classic' | 'minimalist' | 'creative' | 'professional';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ColorOption {
  name: string;
  value: string;
}

export interface CVFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  about: string;
  profilePhoto: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  template: TemplateType;
  primaryColor: string;
}
