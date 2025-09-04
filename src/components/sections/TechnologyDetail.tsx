'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAllTechnology } from '@/utils/data';
import type { Technology } from '@/types/technology';

interface TechnologyDetailProps {
  technology: Technology;
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

export default function TechnologyDetail({ technology }: TechnologyDetailProps) {
  const allTechnology = getAllTechnology();
  const currentIndex = allTechnology.findIndex(tech => tech.id === technology.id);
  
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
            <span className="text-white/25 font-bold mr-6">03</span>
            Space launch 101
          </motion.h1>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Navigation and Content */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              
              <div className="flex lg:flex-col items-start space-x-8 lg:space-x-0 lg:space-y-8">
                
                {/* Number Navigation */}
                <motion.div 
                  variants={itemVariants}
                  className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4"
                >
                  {allTechnology.map((tech, index) => (
                    <Link key={tech.id} href={`/technology/${tech.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`tech-number ${
                          currentIndex === index ? 'active' : ''
                        }`}
                        aria-label={`View ${tech.name}`}
                      >
                        {index + 1}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>

                {/* Technology Content */}
                <div className="flex-1">
                  <motion.div
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    {/* The Terminology Label */}
                    <h3 className="subheading-2 text-wite/50 uppercase">
                      The terminology...
                    </h3>

                    {/* Technology Name */}
                    <h2 className="heading-3 text-white">
                      {technology.name}
                    </h2>

                    {/* Description */}
                    <p className="body-text text-space-blue leading-relaxed">
                      {technology.description}
                    </p>
                  </motion.div>
                </div>

              </div>

              {/* Navigation Links */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center lg:justify-start space-x-4 pt-8"
              >
                <Link
                  href="/technology"
                  className="px-6 py-2 border border-white/25 text-white hover:bg-white/10 transition-colors duration-300 rounded-sm"
                >
                  Back to Technology
                </Link>
                <Link
                  href="/"
                  className="px-6 py-2 bg-white text-space-dark hover:bg-white/90 transition-colors duration-300 rounded-sm"
                >
                  Back to Home
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Technology Image */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-full max-w-[400px] lg:max-w-[500px]">
                <div className="aspect-auto lg:aspect-[4/5] relative">
                  {/* Desktop Image - Portrait */}
                  <div className="hidden lg:block relative w-full h-full">
                    <Image
                      src={technology.images.portrait}
                      alt={technology.name}
                      fill
                      className="object-cover rounded-lg"
                      priority
                      sizes="(max-width: 1024px) 400px, 500px"
                    />
                  </div>

                  {/* Mobile/Tablet Image - Landscape */}
                  <div className="lg:hidden relative w-full aspect-video">
                    <Image
                      src={technology.images.landscape}
                      alt={technology.name}
                      fill
                      className="object-cover rounded-lg"
                      priority
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}