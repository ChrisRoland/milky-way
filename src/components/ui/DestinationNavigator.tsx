// 'use client';

// import { motion } from 'framer-motion';
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// import { getNextDestination, getPreviousDestination } from '@/utils/data';
// import type { Destination } from '@/types/destination';

// interface DestinationNavigatorProps {
//   currentDestination: Destination;
//   onNavigate: (destination: Destination) => void;
// }

// export default function DestinationNavigator({ 
//   currentDestination, 
//   onNavigate 
// }: DestinationNavigatorProps) {
//   const nextDestination = getNextDestination(currentDestination.slug);
//   const previousDestination = getPreviousDestination(currentDestination.slug);

//   const handleNext = () => {
//     if (nextDestination) {
//       onNavigate(nextDestination);
//     }
//   };

//   const handlePrevious = () => {
//     if (previousDestination) {
//       onNavigate(previousDestination);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center w-full max-w-sm mx-auto">
      
//       {/* Previous Button */}
//       <motion.button
//         onClick={handlePrevious}
//         disabled={!previousDestination}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="flex items-center space-x-2 px-4 py-2 text-space-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
//       >
//         <ChevronLeftIcon className="w-5 h-5" />
//         <span className="text-sm">
//           {previousDestination ? previousDestination.name : 'Previous'}
//         </span>
//       </motion.button>

//       {/* Current Destination Indicator */}
//       <div className="flex space-x-2">
//         {['moon', 'mars', 'europa', 'titan'].map((planet) => (
//           <div
//             key={planet}
//             className={`w-2 h-2 rounded-full transition-colors duration-300 ${
//               currentDestination.id === planet 
//                 ? 'bg-white' 
//                 : 'bg-white/25'
//             }`}
//           />
//         ))}
//       </div>

//       {/* Next Button */}
//       <motion.button
//         onClick={handleNext}
//         disabled={!nextDestination}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="flex items-center space-x-2 px-4 py-2 text-space-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
//       >
//         <span className="text-sm">
//           {nextDestination ? nextDestination.name : 'Next'}
//         </span>
//         <ChevronRightIcon className="w-5 h-5" />
//       </motion.button>
//     </div>
//   );
// }