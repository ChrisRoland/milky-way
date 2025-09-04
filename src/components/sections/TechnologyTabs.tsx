'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTechnology } from '@/hooks/useData';
import type { Technology } from '@/types/technology';

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

const contentVariants = {
  hidden: { 
    opacity: 0,
    x: -50
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
    x: 50,
    transition: {
      duration: 0.3
    }
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    x: 50
  },
  visible: { 
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    x: -50,
    transition: {
      duration: 0.3
    }
  }
};

export default function TechnologyTabs() {
  const { technologyItems, currentTechnology, currentIndex, selectByIndex } = useTechnology();
  const [selectedTech, setSelectedTech] = useState<Technology>(currentTechnology);

  useEffect(() => {
    setSelectedTech(currentTechnology);
  }, [currentTechnology]);

  const handleTabClick = (index: number) => {
    setSelectedTech(technologyItems[index]);
    selectByIndex(index);
  };

  return (
    <section className="min-h-screen flex items-center justify-center max-md:px-0 lg:pl-16 pt-15 pb-12">
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
            className="heading-5 text-center md:pl-15 lg:pl-0 md:text-left"
          >
            <span className="text-white/25 font-bold mr-6">03</span>
            Space launch 101
          </motion.h1>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-15 lg:gap-12 items-center">
            
            {/* Number Navigation - Desktop Only */}
            <div className="hidden lg:block lg:col-span-2 order-1">
              <motion.div 
                variants={itemVariants}
                className="flex flex-col space-y-8"
              >
                {technologyItems.map((_, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleTabClick(index)}
                    className={`tech-number ${
                      currentIndex === index ? 'active' : ''
                    }`}
                    aria-label={`Select technology ${index + 1}`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Content */}
            <div className="lg:col-span-4 space-y-8 order-2">
              {/* Mobile/Tablet Number Navigation */}
              <motion.div 
                variants={itemVariants}
                className="flex lg:hidden justify-center space-x-4"
              >
                {technologyItems.map((_, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleTabClick(index)}
                    className={`tech-number ${
                      currentIndex === index ? 'active' : ''
                    }`}
                    aria-label={`Select technology ${index + 1}`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </motion.div>

              {/* Technology Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-center px-5 lg:text-left"
                >
                  {/* The Terminology Label */}
                  <h3 className="font-[bellefair] lg:text-2xl text-space-blue opacity-50 uppercase">
                    The terminology...
                  </h3>

                  {/* Technology Name */}
                  <h2 className="font-[bellefair] leading-[1.1] text-[2.45rem] text-white uppercase">
                    {selectedTech.name}
                  </h2>

                  {/* Description */}
                  <p className="body-text text-space-blue leading-relaxed">
                    {selectedTech.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Technology Image */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-full lg:max-w-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTech.id}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="aspect-auto lg:aspect-[4/5] relative"
                  >
                    {/* Desktop Image - Portrait */}
                    <div className="hidden lg:block relative w-full h-full">
                      <Image
                        src={selectedTech.images.portrait}
                        alt={selectedTech.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 400px, 500px"
                      />
                    </div>

                    {/* Mobile/Tablet Image - Landscape */}
                    <div className="lg:hidden relative w-full aspect-video">
                      <Image
                        src={selectedTech.images.landscape}
                        alt={selectedTech.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 400px"
                      />
                    </div>
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