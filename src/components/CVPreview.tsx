
import React from 'react';
import { Download, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import Button from './Button';
import { TemplateType } from './cv-form/types';
import { cn } from '@/lib/utils';

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CVPreviewProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    profession: string;
    about: string;
    education: EducationItem[];
    experience: ExperienceItem[];
    skills: string[];
    profilePhoto?: string;
    template: TemplateType;
    primaryColor: string;
  };
  onGeneratePDF: () => void;
  isGeneratingPDF?: boolean;
}

const CVPreview = ({ data, onGeneratePDF, isGeneratingPDF = false }: CVPreviewProps) => {
  const { firstName, lastName, email, phone, location, profession, about, education, experience, skills, profilePhoto, template, primaryColor } = data;
  const fullName = `${firstName} ${lastName}`.trim();
  
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold">CV Preview</h2>
            <Button 
              variant="premium" 
              onClick={onGeneratePDF}
              className="gap-2"
              disabled={!firstName && !lastName || isGeneratingPDF}
              isLoading={isGeneratingPDF}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
          
          <div className={cn(
            "bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden animate-scale-in",
            `cv-template-${template}`
          )}>
            <div className="p-8 md:p-10" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
              {/* CV Header */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                {profilePhoto && (
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: primaryColor }}>
                      <img src={profilePhoto} alt={fullName} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                  {fullName || 'Your Name'}
                </h1>
                
                <h2 className="text-xl text-gray-600 mb-4">
                  {profession || 'Your Profession'}
                </h2>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  {email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4" style={{ color: primaryColor }} />
                      <span>{email}</span>
                    </div>
                  )}
                  
                  {phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" style={{ color: primaryColor }} />
                      <span>{phone}</span>
                    </div>
                  )}
                  
                  {location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Professional Summary */}
              {about && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Professional Summary</h3>
                  <p className="text-gray-700">{about}</p>
                </div>
              )}
              
              {/* Education Section */}
              {education && education.length > 0 ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Education</h3>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{edu.institution}</h4>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" style={{ color: primaryColor }} />
                            <span>{edu.startDate} - {edu.endDate}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 opacity-50">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Education</h3>
                  <div className="h-20 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Education details will appear here</p>
                  </div>
                </div>
              )}
              
              {/* Work Experience */}
              {experience && experience.length > 0 ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Work Experience</h3>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{exp.position}</h4>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" style={{ color: primaryColor }} />
                            <span>{exp.startDate} - {exp.endDate}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{exp.company}</p>
                        <p className="text-gray-700 text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 opacity-50">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Work Experience</h3>
                  <div className="h-20 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Experience details will appear here</p>
                  </div>
                </div>
              )}
              
              {/* Skills */}
              {skills && skills.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ 
                          backgroundColor: `${primaryColor}20`, 
                          color: primaryColor 
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="opacity-50">
                  <h3 className="text-lg font-semibold mb-3 border-b pb-2" style={{ color: primaryColor }}>Skills</h3>
                  <div className="h-20 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Skills will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVPreview;
