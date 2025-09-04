import { notFound } from 'next/navigation';
import Layout from '@/components/layout/LayoutWrapper';
import PageTransition from '@/components/ui/PageTransition';
import DestinationDetail from '@/components/sections/DestinationDetail';
import { getDestinationBySlug, getAllDestinations } from '@/utils/data';

interface DestinationPageProps {
  params: {
    planet: string;
  };
}

// Generate static paths for all destinations
export async function generateStaticParams() {
  const destinations = getAllDestinations();
  
  return destinations.map((destination) => ({
    planet: destination.slug,
  }));
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestinationBySlug(params.planet);

  if (!destination) {
    notFound();
  }

  return (
    <Layout>
      <PageTransition>
        <DestinationDetail destination={destination} />
      </PageTransition>
    </Layout>
  );
}