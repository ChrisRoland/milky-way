import { notFound } from 'next/navigation';
import Layout from '@/components/layout/LayoutWrapper';
import PageTransition from '@/components/ui/PageTransition';
import TechnologyDetail from '@/components/sections/TechnologyDetail';
import { getTechnologyBySlug, getAllTechnology } from '@/utils/data';

interface TechnologyPageProps {
  params: {
    tech: string;
  };
}

// Generate static paths for all technology items
export async function generateStaticParams() {
  const technologyItems = getAllTechnology();
  
  return technologyItems.map((tech) => ({
    tech: tech.slug,
  }));
}

export default function TechnologyPage({ params }: TechnologyPageProps) {
  const technology = getTechnologyBySlug(params.tech);

  if (!technology) {
    notFound();
  }

  return (
    <Layout>
      <PageTransition>
        <TechnologyDetail technology={technology} />
      </PageTransition>
    </Layout>
  );
}