'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const getPageSection = (pathname: string): 'home' | 'destination' | 'crew' | 'technology' => {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/destination')) return 'destination';
  if (pathname.startsWith('/crew')) return 'crew';
  if (pathname.startsWith('/technology')) return 'technology';
  return 'home';
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const section = getPageSection(pathname);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Function to get the right background based on screen size
    const updateBackground = () => {
      const width = window.innerWidth;
      let suffix = 'desktop';
      
      if (width < 768) {
        suffix = 'mobile';
      } else if (width < 1024) {
        suffix = 'tablet';
      }
      
      const bgPath = `/assets/${section}/background-${section}-${suffix}.jpg`;
      // console.log('Setting background to:', bgPath); // Debug log
      setBackgroundImage(bgPath);
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, [section]);

  const backgroundStyle = {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    backgroundColor: '#0B0D17', // fallback
  };

  return (
    <div className="space-theme">
      <div style={backgroundStyle}>
        <Header />
        
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="pt-20 lg:pl-[10rem] max-sm:md:px-10 md:pt-24 lg:pt-28">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}