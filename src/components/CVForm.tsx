
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CVFormData, TemplateType, EducationItem, ExperienceItem, ColorOption } from './cv-form/types';

// Import our new component tabs
import PersonalInfoTab from './cv-form/PersonalInfoTab';
import EducationTab from './cv-form/EducationTab';
import ExperienceTab from './cv-form/ExperienceTab';
import SkillsTab from './cv-form/SkillsTab';
import TemplatesTab from './cv-form/TemplatesTab';

interface CVFormProps {
  onDataChange: (data: CVFormData) => void;
  onGeneratePDF: () => void;
  onProfilePhotoChange?: (file: File) => void;
  profilePhoto?: string;
  selectedTemplate?: TemplateType;
  onTemplateChange?: (template: TemplateType) => void;
  colorOptions?: ColorOption[];
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  isGeneratingPDF?: boolean;
}

const initialFormData: CVFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  profession: '',
  about: '',
  profilePhoto: '',
  education: [],
  experience: [],
  skills: [],
  template: 'modern',
  primaryColor: '#6d28d9'
};

const CVForm = ({ 
  onDataChange, 
  onGeneratePDF, 
  onProfilePhotoChange,
  profilePhoto,
  selectedTemplate = 'modern',
  onTemplateChange,
  colorOptions = [],
  selectedColor = '#6d28d9',
  onColorChange,
  isGeneratingPDF = false
}: CVFormProps) => {
  const [formData, setFormData] = useState<CVFormData>({
    ...initialFormData,
    profilePhoto: profilePhoto || '',
    template: selectedTemplate,
    primaryColor: selectedColor
  });
  const [skill, setSkill] = useState('');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: profilePhoto || prev.profilePhoto,
      template: selectedTemplate || prev.template,
      primaryColor: selectedColor || prev.primaryColor
    }));
  }, [profilePhoto, selectedTemplate, selectedColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleProfilePhotoChange = (file: File) => {
    if (onProfilePhotoChange) {
      onProfilePhotoChange(file);
    }
  };

  const handleTemplateSelection = (template: TemplateType) => {
    const updatedData = { ...formData, template };
    setFormData(updatedData);
    onDataChange(updatedData);
    
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  };

  const handleColorSelection = (color: string) => {
    const updatedData = { ...formData, primaryColor: color };
    setFormData(updatedData);
    onDataChange(updatedData);
    
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: ''
    };
    const updatedData = {
      ...formData,
      education: [...formData.education, newEducation]
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    const updatedEducation = formData.education.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    const updatedData = { ...formData, education: updatedEducation };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const removeEducation = (id: string) => {
    const updatedEducation = formData.education.filter(item => item.id !== id);
    const updatedData = { ...formData, education: updatedEducation };
    setFormData(updatedData);
    onDataChange(updatedData);
    toast.success("Education entry removed");
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    const updatedData = {
      ...formData,
      experience: [...formData.experience, newExperience]
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    const updatedExperience = formData.experience.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    const updatedData = { ...formData, experience: updatedExperience };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const removeExperience = (id: string) => {
    const updatedExperience = formData.experience.filter(item => item.id !== id);
    const updatedData = { ...formData, experience: updatedExperience };
    setFormData(updatedData);
    onDataChange(updatedData);
    toast.success("Experience entry removed");
  };

  const addSkill = () => {
    if (skill.trim() === '') return;
    if (formData.skills.includes(skill.trim())) {
      toast.error("This skill is already added");
      return;
    }
    const updatedData = {
      ...formData,
      skills: [...formData.skills, skill.trim()]
    };
    setFormData(updatedData);
    onDataChange(updatedData);
    setSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = formData.skills.filter(s => s !== skillToRemove);
    const updatedData = { ...formData, skills: updatedSkills };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <section id="cv-form" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 animate-fade-in">
              Create Your Professional CV
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl animate-fade-in animate-delay-100">
              Fill in your details below and watch your CV come to life in real-time
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Tabs defaultValue="personal" className="w-full">
              <div className="px-6 pt-6 border-b">
                <TabsList className="w-full justify-start gap-2 p-0 overflow-x-auto flex-nowrap">
                  <TabsTrigger
                    value="personal"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 py-2.5 px-4"
                  >
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 py-2.5 px-4"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 py-2.5 px-4"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 py-2.5 px-4"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="templates"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 py-2.5 px-4"
                  >
                    Templates
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="personal" className="p-6">
                <PersonalInfoTab 
                  formData={formData}
                  handleChange={handleChange}
                  handleProfilePhotoChange={handleProfilePhotoChange}
                  profilePhoto={profilePhoto}
                  onGeneratePDF={onGeneratePDF}
                  isGeneratingPDF={isGeneratingPDF}
                />
              </TabsContent>

              <TabsContent value="education" className="p-6">
                <EducationTab 
                  education={formData.education}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                  addEducation={addEducation}
                />
              </TabsContent>

              <TabsContent value="experience" className="p-6">
                <ExperienceTab 
                  experience={formData.experience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                  addExperience={addExperience}
                />
              </TabsContent>

              <TabsContent value="skills" className="p-6">
                <SkillsTab 
                  skills={formData.skills}
                  skill={skill}
                  setSkill={setSkill}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                />
              </TabsContent>

              <TabsContent value="templates" className="p-6">
                <TemplatesTab 
                  selectedTemplate={formData.template}
                  handleTemplateSelection={handleTemplateSelection}
                  colorOptions={colorOptions}
                  selectedColor={selectedColor}
                  handleColorSelection={handleColorSelection}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVForm;
