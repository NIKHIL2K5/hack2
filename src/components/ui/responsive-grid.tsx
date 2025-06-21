import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  children: React.ReactNode;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  cols = {},
  gap = 4,
  children,
  className,
  ...props
}) => {
  // Default column configuration
  const { xs = 1, sm = 2, md = 3, lg = 4, xl = 4 } = cols;

  // Generate grid template columns based on breakpoints
  const gridColsClasses = [
    `grid-cols-${xs}`,
    `sm:grid-cols-${sm}`,
    `md:grid-cols-${md}`,
    `lg:grid-cols-${lg}`,
    `xl:grid-cols-${xl}`
  ].join(' ');

  return (
    <div 
      className={cn(
        "grid",
        gridColsClasses,
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};