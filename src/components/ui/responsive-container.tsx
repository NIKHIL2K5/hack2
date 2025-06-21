import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean | number;
}

export const ResponsiveContainer = React.forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  ({ className, maxWidth = 'xl', padding = true, children, ...props }, ref) => {
    const maxWidthClasses = {
      'xs': 'max-w-xs',
      'sm': 'max-w-sm',
      'md': 'max-w-md',
      'lg': 'max-w-lg',
      'xl': 'max-w-xl',
      '2xl': 'max-w-2xl',
      'full': 'max-w-full',
    };

    const paddingClasses = typeof padding === 'boolean'
      ? padding ? 'px-4 sm:px-6 md:px-8' : ''
      : `px-${padding}`;

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          maxWidthClasses[maxWidth],
          paddingClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveContainer.displayName = 'ResponsiveContainer';