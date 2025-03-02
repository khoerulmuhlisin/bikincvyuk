
import React from 'react';
import FormField from '../FormField';
import Button from '../Button';
import { toast } from "sonner";

interface SkillsTabProps {
  skills: string[];
  skill: string;
  setSkill: (skill: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

const SkillsTab = ({
  skills,
  skill,
  setSkill,
  addSkill,
  removeSkill
}: SkillsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <FormField
          id="skill-input"
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          className="flex-1"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
        />
        <Button 
          onClick={addSkill} 
          type="button"
        >
          Add Skill
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm"
          >
            {skill}
            <button 
              type="button" 
              onClick={() => removeSkill(skill)} 
              className="text-gray-500 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-400 text-sm">No skills added yet. Add some skills to showcase your expertise.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsTab;
