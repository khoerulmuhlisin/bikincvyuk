
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Upload, X, Check } from 'lucide-react';
import Button from './Button';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: string;
  onImageChange?: (file: File) => void;
  imageSrc?: string;
}

const FormField = ({
  label,
  className,
  error,
  onKeyPress,
  type,
  onImageChange,
  imageSrc,
  ...props
}: FormFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onImageChange) {
      onImageChange(e.target.files[0]);
    }
  };

  if (type === 'photo') {
    return (
      <div className="form-group animate-fade-in">
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            {label}
          </label>
        )}
        <div className="flex items-center gap-4">
          <div 
            className={cn(
              "relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center bg-gray-50",
              imageSrc ? "border-purple-400" : "border-gray-300",
              className
            )}
          >
            {imageSrc ? (
              <>
                <img 
                  src={imageSrc} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center text-gray-400 hover:text-purple-500 transition-colors"
              >
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs">Add Photo</span>
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              className="text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1" />
              Upload Photo
            </Button>
            {imageSrc && (
              <div className="flex items-center text-xs text-green-600 gap-1">
                <Check className="w-3 h-3" />
                Photo uploaded successfully
              </div>
            )}
            <p className="text-xs text-gray-500">
              Recommended: 400×400px JPG, PNG
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="form-group animate-fade-in" style={{ '--index': props.id || '0' } as React.CSSProperties}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "form-input",
          error && "border-red-500",
          className
        )}
        onKeyPress={onKeyPress}
        type={type}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
