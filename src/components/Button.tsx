import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={cn(
        'apple-button',
        {
          'bg-gray-100 text-gray-800 hover:bg-gray-200': variant === 'secondary',
          'text-sm px-4 py-2': size === 'sm',
          'text-base px-6 py-2.5': size === 'md',
          'text-lg px-8 py-3': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};