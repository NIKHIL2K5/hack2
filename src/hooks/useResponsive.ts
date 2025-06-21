import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  const isXs = useMediaQuery({ maxWidth: 639 });
  const isSm = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLg = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });
  const isXl = useMediaQuery({ minWidth: 1280 });

  const isMobile = isXs;
  const isTablet = isSm || isMd;
  const isDesktop = isLg || isXl;

  useEffect(() => {
    setIsClient(true);
  }, []);

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