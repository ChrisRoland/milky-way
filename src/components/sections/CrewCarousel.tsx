'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCrew } from '@/hooks/useData';
import type { CrewMember } from '@/types/crew';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

const memberVariants = {
  hidden: { 
    opacity: 0,
    x: 100
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3
    }
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.3
    }
  }
};

export default function CrewCarousel() {
  const { crewMembers, currentMember, currentIndex, selectByIndex } = useCrew();
  const [selectedMember, setSelectedMember] = useState<CrewMember>(currentMember);

  useEffect(() => {
    setSelectedMember(currentMember);
  }, [currentMember]);

  const handleDotClick = (index: number) => {
    setSelectedMember(crewMembers[index]);
    selectByIndex(index);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 lg:space-y-16"
        >
          
          {/* Page Title */}
          <motion.h1 
            variants={itemVariants}
            className="heading-5 text-center lg:text-left"
          >
            <span className="text-white/25 font-bold mr-6">02</span>
            Meet your crew
          </motion.h1>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            
            {/* Left Side - Content */}
            <motion.div 
              variants={itemVariants}
              className="text-center lg:text-left space-y-8 order-1"
            >
              
              {/* Crew Member Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMember.id}
                  variants={memberVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Role */}
                  <h3 className="heading-4 text-white/50 uppercase">
                    {selectedMember.role}
                  </h3>

                  {/* Name */}
                  <h2 className="heading-3 text-white">
                    {selectedMember.name}
                  </h2>

                  {/* Bio */}
                  <p className="body-text text-space-blue max-w-md mx-auto lg:mx-0 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dots Navigation */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center lg:justify-start space-x-6 pt-8"
              >
                {crewMembers.map((_, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleDotClick(index)}
                    className={`crew-dot ${
                      currentIndex === index ? 'active' : ''
                    }`}
                    aria-label={`Select crew member ${index + 1}`}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Crew Member Image */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMember.id}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedMember.images.webp || selectedMember.images.png}
                      alt={selectedMember.name}
                      fill
                      className="object-contain object-bottom"
                      priority
                      sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}