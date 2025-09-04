export interface CrewMember {
  id: string;
  name: string;
  role: string;
  slug: string;
  images: {
    png: string;
    webp: string;
  };
  bio: string;
}

export interface CrewData {
  crew: CrewMember[];
}