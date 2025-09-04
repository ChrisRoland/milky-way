import { useState, useEffect } from 'react';
import type { Destination } from '@/types/destination';
import type { CrewMember } from '@/types/crew';
import type { Technology } from '@/types/technology';
import {
  getAllDestinations,
  getDestinationBySlug,
  getAllCrewMembers,
  getCrewMemberBySlug,
  getAllTechnology,
  getTechnologyBySlug
} from '@/utils/data';

// Hook for managing destination selection
export function useDestinations() {
  const [destinations] = useState(() => getAllDestinations());
  const [currentDestination, setCurrentDestination] = useState<Destination>(destinations[0]);

  const selectDestination = (slug: string) => {
    const destination = getDestinationBySlug(slug);
    if (destination) {
      setCurrentDestination(destination);
    }
  };

  return {
    destinations,
    currentDestination,
    selectDestination
  };
}

// Hook for managing crew selection
export function useCrew() {
  const [crewMembers] = useState(() => getAllCrewMembers());
  const [currentMember, setCurrentMember] = useState<CrewMember>(crewMembers[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectCrewMember = (slug: string) => {
    const member = getCrewMemberBySlug(slug);
    if (member) {
      setCurrentMember(member);
      const index = crewMembers.findIndex(m => m.slug === slug);
      setCurrentIndex(index);
    }
  };

  const selectByIndex = (index: number) => {
    if (index >= 0 && index < crewMembers.length) {
      setCurrentMember(crewMembers[index]);
      setCurrentIndex(index);
    }
  };

  const nextMember = () => {
    const nextIndex = (currentIndex + 1) % crewMembers.length;
    selectByIndex(nextIndex);
  };

  const previousMember = () => {
    const prevIndex = (currentIndex - 1 + crewMembers.length) % crewMembers.length;
    selectByIndex(prevIndex);
  };

  return {
    crewMembers,
    currentMember,
    currentIndex,
    selectCrewMember,
    selectByIndex,
    nextMember,
    previousMember
  };
}

// Hook for managing technology selection
export function useTechnology() {
  const [technologyItems] = useState(() => getAllTechnology());
  const [currentTechnology, setCurrentTechnology] = useState<Technology>(technologyItems[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectTechnology = (slug: string) => {
    const technology = getTechnologyBySlug(slug);
    if (technology) {
      setCurrentTechnology(technology);
      const index = technologyItems.findIndex(t => t.slug === slug);
      setCurrentIndex(index);
    }
  };

  const selectByIndex = (index: number) => {
    if (index >= 0 && index < technologyItems.length) {
      setCurrentTechnology(technologyItems[index]);
      setCurrentIndex(index);
    }
  };

  return {
    technologyItems,
    currentTechnology,
    currentIndex,
    selectTechnology,
    selectByIndex
  };
}

// Hook for preloading images
export function useImagePreloader(imageSources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageSources.map(src => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(src);
          img.src = src;
        });
      });

      try {
        const loaded = await Promise.allSettled(imagePromises);
        const successful = loaded
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<string>).value);
        
        setLoadedImages(new Set(successful));
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imageSources.length > 0) {
      preloadImages();
    } else {
      setIsLoading(false);
    }
  }, [imageSources]);

  return { loadedImages, isLoading };
}