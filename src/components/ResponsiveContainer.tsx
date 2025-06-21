import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  mobileContent?: React.ReactNode;
  tabletContent?: React.ReactNode;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  mobileContent,
  tabletContent
}) => {
  const { isMobile, isTablet, isClient } = useResponsive();

  if (!isClient) {
    // Return a placeholder or loading state during SSR
    return <div className="min-h-screen"></div>;
  }

  if (isMobile && mobileContent) {
    return <>{mobileContent}</>;
  }

  if (isTablet && tabletContent) {
    return <>{tabletContent}</>;
  }

  return <>{children}</>;
};