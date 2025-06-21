import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  } | number;
}

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ className, cols = {}, gap = {}, children, ...props }, ref) => {
    const { isClient } = useResponsive();

    // Default values
    const defaultCols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 };
    const defaultGap = { xs: 4, sm: 6, md: 6, lg: 8, xl: 8 };

    // Merge defaults with provided values
    const mergedCols = { ...defaultCols, ...cols };
    const mergedGap = typeof gap === 'number' 
      ? { xs: gap, sm: gap, md: gap, lg: gap, xl: gap } 
      : { ...defaultGap, ...gap };

    // Generate responsive classes
    const gridClasses = cn(
      'grid',
      `grid-cols-${mergedCols.xs}`,
      `sm:grid-cols-${mergedCols.sm}`,
      `md:grid-cols-${mergedCols.md}`,
      `lg:grid-cols-${mergedCols.lg}`,
      `xl:grid-cols-${mergedCols.xl}`,
      `gap-${mergedGap.xs}`,
      `sm:gap-${mergedGap.sm}`,
      `md:gap-${mergedGap.md}`,
      `lg:gap-${mergedGap.lg}`,
      `xl:gap-${mergedGap.xl}`,
      className
    );

    return (
      <div ref={ref} className={gridClasses} {...props}>
        {children}
      </div>
    );
  }
);

ResponsiveGrid.displayName = 'ResponsiveGrid';