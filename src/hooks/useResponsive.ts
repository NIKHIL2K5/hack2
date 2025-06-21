import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  const isXs = useMediaQuery({ maxWidth: 639 }, { deviceWidth: window.innerWidth });
  const isSm = useMediaQuery({ minWidth: 640, maxWidth: 767 }, { deviceWidth: window.innerWidth });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 }, { deviceWidth: window.innerWidth });
  const isLg = useMediaQuery({ minWidth: 1024, maxWidth: 1279 }, { deviceWidth: window.innerWidth });
  const isXl = useMediaQuery({ minWidth: 1280 }, { deviceWidth: window.innerWidth });

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