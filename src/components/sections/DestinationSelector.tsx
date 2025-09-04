'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useDestinations } from '@/hooks/useData';
import type { Destination } from '@/types/destination';

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

const planetVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    rotate: -10
  },
  visible: { 
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    rotate: 10,
    transition: {
      duration: 0.3
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0,
    x: 30
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3
    }
  }
};

export default function DestinationSelector() {
  const { destinations, currentDestination, selectDestination } = useDestinations();
  const [selectedPlanet, setSelectedPlanet] = useState<Destination>(currentDestination);

  // Update selected planet when currentDestination changes
  useEffect(() => {
    setSelectedPlanet(currentDestination);
  }, [currentDestination]);

  const handlePlanetSelect = (destination: Destination) => {
    setSelectedPlanet(destination);
    selectDestination(destination.slug);
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
            <span className="text-white/25 font-bold mr-6">01</span>
            Pick your destination
          </motion.h1>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side - Planet Image */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPlanet.id}
                    variants={planetVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedPlanet.images.webp}
                      alt={selectedPlanet.name}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              variants={itemVariants}
              className="text-center lg:text-left space-y-8"
            >
              
              {/* Planet Navigation Tabs */}
              <div className="flex justify-center lg:justify-start space-x-8">
                {destinations.map((destination, index) => (
                  <motion.button
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    onClick={() => handlePlanetSelect(destination)}
                    className={`planet-tab nav-text py-2 transition-colors duration-300 ${
                      selectedPlanet.id === destination.id 
                        ? 'text-white active' 
                        : 'text-space-blue hover:text-white'
                    }`}
                  >
                    {destination.name}
                  </motion.button>
                ))}
              </div>

              {/* Planet Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlanet.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 w-full"
                >
                  {/* Planet Name */}
                  <h2 className="heading-2 text-white">
                    {selectedPlanet.name}
                  </h2>

                  {/* Planet Description */}
                  <p className="body-text text-space-blue max-w-md mx-auto lg:mx-0 leading-relaxed">
                    {selectedPlanet.description}
                  </p>

                  {/* Divider Line */}
                  <div className="md:w-[80%] mx-auto h-px bg-white/25 my-8"></div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Average Distance */}
                    <div className="space-y-2">
                      <h3 className="subheading-2 text-space-blue">
                        Avg. Distance
                      </h3>
                      <p className="subheading-1 text-white uppercase">
                        {selectedPlanet.distance}
                      </p>
                    </div>

                    {/* Travel Time */}
                    <div className="space-y-2">
                      <h3 className="subheading-2 text-space-blue">
                        Est. Travel Time
                      </h3>
                      <p className="subheading-1 text-white uppercase">
                        {selectedPlanet.travel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}