'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAllDestinations } from '@/utils/data';
import type { Destination } from '@/types/destination';

interface DestinationDetailProps {
  destination: Destination;
}

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

export default function DestinationDetail({ destination }: DestinationDetailProps) {
  const allDestinations = getAllDestinations();
  
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
                <Image
                  src={destination.images.webp}
                  alt={destination.name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                />
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              variants={itemVariants}
              className="text-center lg:text-left space-y-8"
            >
              
              {/* Planet Navigation Tabs */}
              <div className="flex justify-center lg:justify-start space-x-8">
                {allDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Link
                      href={`/destination/${dest.slug}`}
                      className={`planet-tab nav-text py-2 transition-colors duration-300 ${
                        destination.id === dest.id 
                          ? 'text-white active' 
                          : 'text-space-blue hover:text-white'
                      }`}
                    >
                      {dest.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Planet Content */}
              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Planet Name */}
                <h2 className="heading-2 text-white">
                  {destination.name}
                </h2>

                {/* Planet Description */}
                <p className="body-text text-space-blue max-w-md mx-auto lg:mx-0 leading-relaxed">
                  {destination.description}
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/25 my-8"></div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Average Distance */}
                  <div className="space-y-2">
                    <h3 className="subheading-2 text-space-blue">
                      Avg. Distance
                    </h3>
                    <p className="subheading-1 text-white">
                      {destination.distance}
                    </p>
                  </div>

                  {/* Travel Time */}
                  <div className="space-y-2">
                    <h3 className="subheading-2 text-space-blue">
                      Est. Travel Time
                    </h3>
                    <p className="subheading-1 text-white">
                      {destination.travel}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center lg:justify-start space-x-4 pt-8"
              >
                <Link
                  href="/destination"
                  className="px-6 py-2 border border-white/25 text-white hover:bg-white/10 transition-colors duration-300 rounded-sm"
                >
                  Back to Selection
                </Link>
                <Link
                  href="/crew"
                  className="px-6 py-2 bg-white text-space-dark hover:bg-white/90 transition-colors duration-300 rounded-sm"
                >
                  Meet the Crew
                </Link>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}