
import React from 'react';
import FormField from '../FormField';
import Button from '../Button';
import { Download } from 'lucide-react';
import { CVFormData } from './types';

interface PersonalInfoTabProps {
  formData: CVFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleProfilePhotoChange: (file: File) => void;
  profilePhoto?: string;
  onGeneratePDF: () => void;
  isGeneratingPDF: boolean;
}

const PersonalInfoTab = ({
  formData,
  handleChange,
  handleProfilePhotoChange,
  profilePhoto,
  onGeneratePDF,
  isGeneratingPDF
}: PersonalInfoTabProps) => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        type="photo"
        label="Profile Photo"
        onImageChange={handleProfilePhotoChange}
        imageSrc={profilePhoto}
        className="md:col-span-2"
      />
      
      <FormField
        id="firstName"
        name="firstName"
        label="First Name"
        placeholder="John"
        value={formData.firstName}
        onChange={handleChange}
      />
      
      <FormField
        id="lastName"
        name="lastName"
        label="Last Name"
        placeholder="Doe"
        value={formData.lastName}
        onChange={handleChange}
      />
      
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="johndoe@example.com"
        value={formData.email}
        onChange={handleChange}
      />
      
      <FormField
        id="phone"
        name="phone"
        label="Phone"
        placeholder="+1 123 456 7890"
        value={formData.phone}
        onChange={handleChange}
      />
      
      <FormField
        id="location"
        name="location"
        label="Location"
        placeholder="New York, USA"
        value={formData.location}
        onChange={handleChange}
      />
      
      <FormField
        id="profession"
        name="profession"
        label="Profession"
        placeholder="Software Engineer"
        value={formData.profession}
        onChange={handleChange}
      />
      
      <div className="col-span-1 md:col-span-2 form-group">
        <label htmlFor="about" className="text-sm font-medium text-gray-700">
          Professional Summary
        </label>
        <textarea
          id="about"
          name="about"
          rows={4}
          className="form-input resize-none"
          placeholder="Brief description of your professional background and skills..."
          value={formData.about}
          onChange={handleChange}
        />
      </div>
      
      <div className="col-span-1 md:col-span-2 flex justify-end gap-4 pt-4">
        <Button 
          variant="gradient" 
          type="button" 
          className="gap-2"
          onClick={onGeneratePDF}
          isLoading={isGeneratingPDF}
        >
          <Download className="w-4 h-4" />
          Download CV
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoTab;
