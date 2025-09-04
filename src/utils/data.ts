import destinationsData from '@/data/destinations.json';
import crewData from '@/data/crew.json';
import technologyData from '@/data/technology.json';
import type { Destination, DestinationData } from '@/types/destination';
import type { CrewMember, CrewData } from '@/types/crew';
import type { Technology, TechnologyData } from '@/types/technology';

// Destinations
export function getAllDestinations(): Destination[] {
  return (destinationsData as DestinationData).destinations;
}

export function getDestinationBySlug(slug: string): Destination | null {
  const destinations = getAllDestinations();
  return destinations.find(dest => dest.slug === slug) || null;
}

export function getDestinationById(id: string): Destination | null {
  const destinations = getAllDestinations();
  return destinations.find(dest => dest.id === id) || null;
}

// Crew
export function getAllCrewMembers(): CrewMember[] {
  return (crewData as CrewData).crew;
}

export function getCrewMemberBySlug(slug: string): CrewMember | null {
  const crew = getAllCrewMembers();
  return crew.find(member => member.slug === slug) || null;
}

export function getCrewMemberById(id: string): CrewMember | null {
  const crew = getAllCrewMembers();
  return crew.find(member => member.id === id) || null;
}

// Technology
export function getAllTechnology(): Technology[] {
  return (technologyData as TechnologyData).technology;
}

export function getTechnologyBySlug(slug: string): Technology | null {
  const technology = getAllTechnology();
  return technology.find(tech => tech.slug === slug) || null;
}

export function getTechnologyById(id: string): Technology | null {
  const technology = getAllTechnology();
  return technology.find(tech => tech.id === id) || null;
}

// Navigation helpers
export function getNextDestination(currentSlug: string): Destination | null {
  const destinations = getAllDestinations();
  const currentIndex = destinations.findIndex(dest => dest.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const nextIndex = (currentIndex + 1) % destinations.length;
  return destinations[nextIndex];
}

export function getPreviousDestination(currentSlug: string): Destination | null {
  const destinations = getAllDestinations();
  const currentIndex = destinations.findIndex(dest => dest.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const prevIndex = (currentIndex - 1 + destinations.length) % destinations.length;
  return destinations[prevIndex];
}

export function getNextCrewMember(currentSlug: string): CrewMember | null {
  const crew = getAllCrewMembers();
  const currentIndex = crew.findIndex(member => member.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const nextIndex = (currentIndex + 1) % crew.length;
  return crew[nextIndex];
}

export function getPreviousCrewMember(currentSlug: string): CrewMember | null {
  const crew = getAllCrewMembers();
  const currentIndex = crew.findIndex(member => member.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const prevIndex = (currentIndex - 1 + crew.length) % crew.length;
  return crew[prevIndex];
}

export function getNextTechnology(currentSlug: string): Technology | null {
  const technology = getAllTechnology();
  const currentIndex = technology.findIndex(tech => tech.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const nextIndex = (currentIndex + 1) % technology.length;
  return technology[nextIndex];
}

export function getPreviousTechnology(currentSlug: string): Technology | null {
  const technology = getAllTechnology();
  const currentIndex = technology.findIndex(tech => tech.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const prevIndex = (currentIndex - 1 + technology.length) % technology.length;
  return technology[prevIndex];
}