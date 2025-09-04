'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'explore';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

const buttonVariants = {
  primary: 'bg-white text-space-dark hover:bg-white/90',
  secondary: 'bg-transparent text-white border border-white/25 hover:bg-white/10',
  explore: 'explore-btn bg-white text-space-dark relative z-10'
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'w-40 h-40 md:w-50 md:h-50 text-xl md:text-2xl'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  href
}: ButtonProps) {
  const baseClasses = 'font-bellefair uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50';
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    variant === 'explore' ? 'rounded-full flex items-center justify-center' : 'rounded-sm',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const MotionComponent = motion.button;

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: variant === 'explore' ? 0 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: false, stiffness: 100, damping: 17 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionComponent
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: variant === 'explore' ? 1.1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: false, stiffness: 100, damping: 17 }}
    >
      {children}
    </MotionComponent>
  );
}