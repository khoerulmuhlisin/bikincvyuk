
import React from 'react';
import FormField from '../FormField';
import Button from '../Button';
import { Plus, Trash2 } from 'lucide-react';
import { EducationItem } from './types';
import { toast } from "sonner";

interface EducationTabProps {
  education: EducationItem[];
  updateEducation: (id: string, field: keyof EducationItem, value: string) => void;
  removeEducation: (id: string) => void;
  addEducation: () => void;
}

const EducationTab = ({
  education,
  updateEducation,
  removeEducation,
  addEducation
}: EducationTabProps) => {
  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
          <Button 
            onClick={() => removeEducation(edu.id)} 
            variant="ghost" 
            size="sm"
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <h3 className="font-medium mb-4">Education #{index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id={`institution-${edu.id}`}
              label="Institution"
              placeholder="University Name"
              value={edu.institution}
              onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
            />
            <FormField
              id={`degree-${edu.id}`}
              label="Degree"
              placeholder="Bachelor's, Master's, etc."
              value={edu.degree}
              onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
            />
            <FormField
              id={`field-${edu.id}`}
              label="Field of Study"
              placeholder="Computer Science, Business, etc."
              value={edu.fieldOfStudy}
              onChange={e => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                id={`startDate-${edu.id}`}
                label="Start Date"
                placeholder="MM/YYYY"
                value={edu.startDate}
                onChange={e => updateEducation(edu.id, 'startDate', e.target.value)}
              />
              <FormField
                id={`endDate-${edu.id}`}
                label="End Date"
                placeholder="MM/YYYY or Present"
                value={edu.endDate}
                onChange={e => updateEducation(edu.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button 
        onClick={addEducation} 
        variant="outline" 
        className="w-full py-2 border-dashed gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationTab;
