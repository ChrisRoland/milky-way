export interface Technology {
  id: string;
  name: string;
  slug: string;
  images: {
    portrait: string;
    landscape: string;
  };
  description: string;
}

export interface TechnologyData {
  technology: Technology[];
}