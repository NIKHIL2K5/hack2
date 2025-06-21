import React from 'react';
import { cn } from '@/lib/utils';
import { MobileNavbar } from './MobileNavbar';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showMobileNav?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  showMobileNav = true,
  fullWidth = false,
  noPadding = false,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "min-h-screen",
        className
      )}
      {...props}
    >
      <main className={cn(
        fullWidth ? 'w-full' : 'container mx-auto',
        !noPadding && 'px-4 py-6 sm:px-6 sm:py-8'
      )}>
        {children}
      </main>
      
      {showMobileNav && <MobileNavbar />}
    </div>
  );
};