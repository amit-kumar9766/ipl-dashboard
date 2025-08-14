import React from 'react';

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  rounded = false,
  icon,
}) => {
  const baseClasses = 'inline-flex items-center font-medium';
  
  const variantClasses = {
    default: 'bg-gray-700 text-gray-300',
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-purple-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    danger: 'bg-red-600 text-white',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';
  const iconClasses = icon ? 'gap-1' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${iconClasses} ${className}`;

  return (
    <span className={classes}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge; 