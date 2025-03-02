
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import { generatePDF } from '@/utils/pdfGenerator';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

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

interface CVData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  about: string;
  profilePhoto?: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  template: 'modern' | 'classic' | 'minimalist' | 'creative' | 'professional';
  primaryColor: string;
}

const initialData: CVData = {
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
  primaryColor: '#6d28d9' // Default purple
};

const colorOptions = [
  { name: 'Purple', value: '#6d28d9' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Gray', value: '#4b5563' }
];

const Index = () => {
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDataChange = (data: CVData) => {
    setCVData(data);
  };

  const handleProfilePhotoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedData = { 
        ...cvData, 
        profilePhoto: reader.result as string 
      };
      setCVData(updatedData);
      toast.success("Profile photo updated successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePDF = async () => {
    try {
      setIsGeneratingPDF(true);
      toast.promise(
        generatePDF(cvData),
        {
          loading: 'Generating your CV...',
          success: () => {
            setIsGeneratingPDF(false);
            return 'CV downloaded successfully!';
          },
          error: (err) => {
            setIsGeneratingPDF(false);
            return `Error: ${err.message}`;
          }
        }
      );
    } catch (error) {
      setIsGeneratingPDF(false);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleTemplateChange = (template: CVData['template']) => {
    setCVData({...cvData, template});
    toast.success(`Template changed to ${template}`);
  };

  const handleColorChange = (color: string) => {
    setCVData({...cvData, primaryColor: color});
  };

  return (
    <main className="min-h-screen" id="home">
      <Toaster position="top-center" />
      <Header />
      <Hero />
      <CVForm 
        onDataChange={handleDataChange} 
        onGeneratePDF={handleGeneratePDF} 
        onProfilePhotoChange={handleProfilePhotoChange}
        profilePhoto={cvData.profilePhoto}
        selectedTemplate={cvData.template}
        onTemplateChange={handleTemplateChange}
        colorOptions={colorOptions}
        selectedColor={cvData.primaryColor}
        onColorChange={handleColorChange}
        isGeneratingPDF={isGeneratingPDF}
      />
      <CVPreview 
        data={cvData} 
        onGeneratePDF={handleGeneratePDF}
        isGeneratingPDF={isGeneratingPDF}
      />
      
      <footer className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">
            CV Generator by Khoirul Muhlisin © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
