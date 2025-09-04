import Layout from '@/components/layout/LayoutWrapper';
import PageTransition from '@/components/ui/PageTransition';
import TechnologyTabs from '@/components/sections/TechnologyTabs';

export default function TechnologyPage() {
  return (
    <Layout>
      <PageTransition>
        <TechnologyTabs />
      </PageTransition>
    </Layout>
  );
}