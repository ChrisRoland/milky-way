import Layout from '@/components/layout/LayoutWrapper';
import PageTransition from '@/components/ui/PageTransition';
import CrewCarousel from '@/components/sections/CrewCarousel';

export default function CrewPage() {
  return (
    <Layout>
      <PageTransition>
        <CrewCarousel />
      </PageTransition>
    </Layout>
  );
}