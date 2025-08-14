import React from 'react';

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  header,
  footer,
  onClick,
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-gray-800 border border-gray-700',
    elevated: 'bg-gray-800 border border-gray-700 shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-600',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hover ? 'hover:transform hover:scale-105 hover:shadow-xl cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={classes} onClick={handleClick}>
      {header && (
        <div className="border-b border-gray-700 p-4">
          {header}
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-700 p-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 