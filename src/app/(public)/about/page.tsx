'use client';

import { useDocument } from '@/hooks/useFirestore';
import { COLLECTIONS, type AboutSection as AboutType, type TeamSection as TeamType } from '@/types';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';

export default function AboutPage() {
  const { data: about, loading: aboutLoading } = useDocument<AboutType>(COLLECTIONS.ABOUT, 'main');
  const { data: team, loading: teamLoading } = useDocument<TeamType>(COLLECTIONS.TEAM, 'main');


  return (
    <div className="min-h-screen pt-20">
      {/* About Section */}
      {about && <AboutSection data={about} />}

      {/* Team Section */}
      {team && team.members && team.members.length > 0 && (
        <TeamSection data={team} />
      )}
    </div>
  );
}
