
import React from 'react';
import { cn } from "@/lib/utils";
import { ColorOption, TemplateType } from './types';

interface TemplatesTabProps {
  selectedTemplate: TemplateType;
  handleTemplateSelection: (template: TemplateType) => void;
  colorOptions: ColorOption[];
  selectedColor: string;
  handleColorSelection: (color: string) => void;
}

const TemplatesTab = ({
  selectedTemplate,
  handleTemplateSelection,
  colorOptions,
  selectedColor,
  handleColorSelection
}: TemplatesTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Choose a CV Template</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
          { id: 'professional', name: 'Professional', description: 'Traditional corporate style' },
          { id: 'creative', name: 'Creative', description: 'Unique layout for creatives' },
          { id: 'minimalist', name: 'Minimalist', description: 'Simple and elegant design' },
          { id: 'classic', name: 'Classic', description: 'Timeless traditional layout' }
        ].map((template) => (
          <div 
            key={template.id}
            className={cn(
              "cursor-pointer border rounded-xl p-4 transition-all",
              selectedTemplate === template.id 
                ? "border-purple-500 bg-purple-50" 
                : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
            )}
            onClick={() => handleTemplateSelection(template.id as TemplateType)}
          >
            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(/templates/${template.id}.jpg)`,
                  backgroundSize: 'cover' 
                }}
              ></div>
            </div>
            <h4 className="font-medium">{template.name}</h4>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Choose a Color Theme</h3>
        
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              className={cn(
                "w-8 h-8 rounded-full transition-all",
                selectedColor === color.value
                  ? "ring-2 ring-offset-2 ring-gray-400"
                  : "hover:scale-110"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
              onClick={() => handleColorSelection(color.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesTab;
