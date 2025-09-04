import Layout from '@/components/layout/LayoutWrapper';
import PageTransition from '@/components/ui/PageTransition';
import DestinationSelector from '@/components/sections/DestinationSelector';

export default function DestinationPage() {
  return (
    <Layout>
      <PageTransition>
        <DestinationSelector />
      </PageTransition>
    </Layout>
  );
}