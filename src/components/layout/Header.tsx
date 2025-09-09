'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const navigationItems = [
  { number: '00', label: 'HOME', href: '/' },
  { number: '01', label: 'DESTINATION', href: '/destination' },
  { number: '02', label: 'CREW', href: '/crew' },
  { number: '03', label: 'TECHNOLOGY', href: '/technology' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled && ' bg-black/25'
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-0 lg:px-0 py-6 md:pt-8 md:pb-0  relative">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50 md:pl-15">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/assets/shared/logo.svg"
                alt="Space Tourism Logo"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Line */}
          <div className="hidden mx-20 lg:block absolute left-18 right-[37rem] top-[65%] transform -translate-y-1/2 h-px bg-white/25 z-50"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex backdrop-blur-md bg-white/5 px-12 py-8 relative"
              style={{ 
                backdropFilter: 'blur(40px)',
                background: 'rgba(255, 255, 255, 0.04)'
              }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'nav-underline nav-text flex items-center space-x-3 mx-6 py-2 transition-colors duration-300',
                      isActiveRoute(item.href) 
                        ? 'text-white active' 
                        : 'text-white/75 hover:text-white'
                    )}
                  >
                    <span className="font-bold hidden lg:inline">{item.number}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 bg-white block transform transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 bg-white block transform transition-all duration-300 my-1"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 bg-white block transform transition-all duration-300"
              />
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-64 bg-black/95 backdrop-blur-md pt-24 px-8"
              style={{ 
                backdropFilter: 'blur(40px)',
                background: 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <div className="space-y-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'nav-text flex items-center space-x-4 py-2 transition-colors duration-300',
                        isActiveRoute(item.href) 
                          ? 'text-white' 
                          : 'text-white/75 hover:text-white'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-bold">{item.number}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}