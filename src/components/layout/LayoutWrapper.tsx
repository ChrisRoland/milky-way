'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from './Header';
import { getBackgroundClasses } from '@/utils/cn';

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

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: 'easeInOut' }
} as const;

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const section = getPageSection(pathname);
  
  return (
    <div className="space-theme min-h-screen">
      <div className={getBackgroundClasses(section)}>
        <Header />
        
        <motion.main
          key={pathname}
          {...pageTransition}
          className="relative z-10"
        >
          <div className="pt-20 md:pt-24 lg:pt-28">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}