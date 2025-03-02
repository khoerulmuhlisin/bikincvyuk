
import React from 'react';
import { cn } from '@/lib/utils';
import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'premium' | 'destructive' | 'purple' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  isLoading = false,
  ...props
}: ButtonProps) => {
  // Custom variant mapping with enhanced colors
  const variantMapping = {
    premium: 'bg-gradient-to-br from-gray-900 to-black text-white hover:from-black hover:to-gray-800 shadow-md',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
    purple: 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm',
    gradient: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md'
  };
  
  // Choose the correct variant class
  const variantClasses = 
    variant === 'premium' ? variantMapping.premium : 
    variant === 'destructive' ? variantMapping.destructive : 
    variant === 'purple' ? variantMapping.purple :
    variant === 'gradient' ? variantMapping.gradient : '';

  // Map custom variants to shadcn variants
  const shadcnVariant = 
    ['premium', 'destructive', 'purple', 'gradient'].includes(variant)
      ? 'default' 
      : variant;

  return (
    <ShadcnButton
      className={cn(
        'rounded-xl font-medium transition-all duration-300 relative overflow-hidden group',
        variantClasses,
        className
      )}
      variant={shadcnVariant as any}
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
      {['premium', 'gradient'].includes(variant) && (
        <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
      )}
    </ShadcnButton>
  );
};

export default Button;
