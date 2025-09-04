import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get responsive background classes
export function getBackgroundClasses(
  section: "home" | "destination" | "crew" | "technology"
) {
  const baseClasses = "bg-cover bg-center bg-no-repeat min-h-screen";

  switch (section) {
    case "home":
      return `bg-home-mobile md:bg-home-tablet lg:bg-home-desktop ${baseClasses}`;
    case "destination":
      return `bg-destination-mobile md:bg-destination-tablet lg:bg-destination-desktop ${baseClasses}`;
    case "crew":
      return `bg-crew-mobile md:bg-crew-tablet lg:bg-crew-desktop ${baseClasses}`;
    case "technology":
      return `bg-technology-mobile md:bg-technology-tablet lg:bg-technology-desktop ${baseClasses}`;
    default:
      return `bg-home-mobile md:bg-home-tablet lg:bg-home-desktop ${baseClasses}`;
  }
}
