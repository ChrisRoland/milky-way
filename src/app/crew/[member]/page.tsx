import { notFound } from 'next/navigation';
import Layout from '@/components/layout/LayoutWrapper';
import PageTransition from '@/components/ui/PageTransition';
import CrewDetail from '@/components/sections/CrewDetail';
import { getCrewMemberBySlug, getAllCrewMembers } from '@/utils/data';

interface CrewPageProps {
  params: {
    member: string;
  };
}

// Generate static paths for all crew members
export async function generateStaticParams() {
  const crewMembers = getAllCrewMembers();
  
  return crewMembers.map((member) => ({
    member: member.slug,
  }));
}

export default function CrewMemberPage({ params }: CrewPageProps) {
  const crewMember = getCrewMemberBySlug(params.member);

  if (!crewMember) {
    notFound();
  }

  return (
    <Layout>
      <PageTransition>
        <CrewDetail crewMember={crewMember} />
      </PageTransition>
    </Layout>
  );
}