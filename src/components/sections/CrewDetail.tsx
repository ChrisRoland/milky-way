'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCrewMembers } from '@/utils/data';
import type { CrewMember } from '@/types/crew';

interface CrewDetailProps {
  crewMember: CrewMember;
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

export default function CrewDetail({ crewMember }: CrewDetailProps) {
  const allCrewMembers = getAllCrewMembers();
  const currentIndex = allCrewMembers.findIndex(member => member.id === crewMember.id);
  
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
              className="text-center lg:text-left space-y-8 order-2 lg:order-1"
            >
              
              {/* Crew Member Content */}
              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Role */}
                <h3 className="heading-4 text-white/50 uppercase">
                  {crewMember.role}
                </h3>

                {/* Name */}
                <h2 className="heading-3 text-white">
                  {crewMember.name}
                </h2>

                {/* Bio */}
                <p className="body-text text-space-blue max-w-md mx-auto lg:mx-0 leading-relaxed">
                  {crewMember.bio}
                </p>
              </motion.div>

              {/* Dots Navigation */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center lg:justify-start space-x-6 pt-8"
              >
                {allCrewMembers.map((member, index) => (
                  <Link key={member.id} href={`/crew/${member.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`crew-dot ${
                        currentIndex === index ? 'active' : ''
                      }`}
                      aria-label={`View ${member.name}`}
                    />
                  </Link>
                ))}
              </motion.div>

              {/* Navigation Links */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center lg:justify-start space-x-4 pt-8"
              >
                <Link
                  href="/crew"
                  className="px-6 py-2 border border-white/25 text-white hover:bg-white/10 transition-colors duration-300 rounded-sm"
                >
                  Back to Crew
                </Link>
                <Link
                  href="/technology"
                  className="px-6 py-2 bg-white text-space-dark hover:bg-white/90 transition-colors duration-300 rounded-sm"
                >
                  View Technology
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Crew Member Image */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]">
                <Image
                  src={crewMember.images.webp || crewMember.images.png}
                  alt={crewMember.name}
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}