export interface Destination {
  id: string;
  name: string;
  slug: string;
  images: {
    png: string;
    webp: string;
  };
  description: string;
  distance: string;
  travel: string;
}

export interface DestinationData {
  destinations: Destination[];
}