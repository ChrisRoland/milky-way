'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  })
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-6 lg:space-y-8"
          >
            {/* Subheading */}
            <motion.h2
              custom={0}
              variants={textVariants}
              className="heading-5 text-space-blue"
            >
              So, you want to travel to
            </motion.h2>

            {/* Main Heading */}
            <motion.h1
              custom={1}
              variants={textVariants}
              className="heading-1 text-white"
            >
              Space
            </motion.h1>

            {/* Body Text */}
            <motion.p
              custom={2}
              variants={textVariants}
              className="body-text text-space-blue max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Let&apos;s face it; if you want to go to space, you might as well genuinely go to 
              outer space and not hover kind of on the edge of it. Well sit back, and relax 
              because we&apos;ll give you a truly out of this world experience!
            </motion.p>
          </motion.div>

          {/* Right Content - Explore Button */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className="flex justify-center lg:justify-end lg:mr-[10rem]"
          >
            <Link href="/destination" className="block">
              <Button 
                variant="explore" 
                size="xl"
                className="explore-btn text-black font-[bellefair] tracking-wide hover:text-gray-600 cursor-pointer"
              >
                Explore
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}