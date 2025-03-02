
import React from 'react';
import FormField from '../FormField';
import Button from '../Button';
import { Plus, Trash2 } from 'lucide-react';
import { ExperienceItem } from './types';
import { toast } from "sonner";

interface ExperienceTabProps {
  experience: ExperienceItem[];
  updateExperience: (id: string, field: keyof ExperienceItem, value: string) => void;
  removeExperience: (id: string) => void;
  addExperience: () => void;
}

const ExperienceTab = ({
  experience,
  updateExperience,
  removeExperience,
  addExperience
}: ExperienceTabProps) => {
  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
          <Button 
            onClick={() => removeExperience(exp.id)} 
            variant="ghost" 
            size="sm"
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <h3 className="font-medium mb-4">Experience #{index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id={`company-${exp.id}`}
              label="Company"
              placeholder="Company Name"
              value={exp.company}
              onChange={e => updateExperience(exp.id, 'company', e.target.value)}
            />
            <FormField
              id={`position-${exp.id}`}
              label="Position"
              placeholder="Job Title"
              value={exp.position}
              onChange={e => updateExperience(exp.id, 'position', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                id={`expStartDate-${exp.id}`}
                label="Start Date"
                placeholder="MM/YYYY"
                value={exp.startDate}
                onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
              />
              <FormField
                id={`expEndDate-${exp.id}`}
                label="End Date"
                placeholder="MM/YYYY or Present"
                value={exp.endDate}
                onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor={`description-${exp.id}`} className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id={`description-${exp.id}`}
                rows={3}
                className="form-input resize-none"
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={e => updateExperience(exp.id, 'description', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button 
        onClick={addExperience} 
        variant="outline" 
        className="w-full py-2 border-dashed gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
};

export default ExperienceTab;
