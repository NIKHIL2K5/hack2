import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use window.innerWidth as a fallback when running on the client
  const getDeviceWidth = () => {
    return isClient ? window.innerWidth : 1024; // Default to desktop during SSR
  };

  const isXs = useMediaQuery({ maxWidth: 639 }, { deviceWidth: getDeviceWidth() });
  const isSm = useMediaQuery({ minWidth: 640, maxWidth: 767 }, { deviceWidth: getDeviceWidth() });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 }, { deviceWidth: getDeviceWidth() });
  const isLg = useMediaQuery({ minWidth: 1024, maxWidth: 1279 }, { deviceWidth: getDeviceWidth() });
  const isXl = useMediaQuery({ minWidth: 1280 }, { deviceWidth: getDeviceWidth() });

  const isMobile = isXs;
  const isTablet = isSm || isMd;
  const isDesktop = isLg || isXl;

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    isClient
  };
};