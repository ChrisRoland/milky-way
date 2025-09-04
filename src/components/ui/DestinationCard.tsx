'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/types/destination';

interface DestinationCardProps {
  destination: Destination;
  isActive?: boolean;
  onClick?: () => void;
  index?: number;
}

export default function DestinationCard({ 
  destination, 
  isActive = false, 
  onClick, 
  index = 0 
}: DestinationCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1
      }
    }
  };

  const CardContent = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'bg-white/10 border-white/50 shadow-lg' 
          : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/8'
      }`}
    >
      {/* Planet Image */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image
          src={destination.images.webp}
          alt={destination.name}
          fill
          className="object-contain"
          sizes="128px"
        />
      </div>

      {/* Planet Info */}
      <div className="text-center space-y-2">
        <h3 className="heading-4 text-white">
          {destination.name}
        </h3>
        
        <div className="space-y-1">
          <p className="text-sm text-space-blue">
            Distance: <span className="text-white">{destination.distance}</span>
          </p>
          <p className="text-sm text-space-blue">
            Travel: <span className="text-white">{destination.travel}</span>
          </p>
        </div>
        
        <p className="text-sm text-space-blue/80 leading-relaxed">
          {destination.description.substring(0, 100)}...
        </p>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full"
        />
      )}
    </motion.div>
  );

  if (onClick) {
    return (
      <div onClick={onClick}>
        <CardContent />
      </div>
    );
  }

  return (
    <Link href={`/destination/${destination.slug}`}>
      <CardContent />
    </Link>
  );
}