'use client';

import { useDocument, useCollection } from '@/hooks/useFirestore';
import { COLLECTIONS, type ProjectsSection, type Project } from '@/types';
import { orderBy } from 'firebase/firestore';
import ProjectsSection from '../components/ProjectsSection';

export default function ProjectsPage() {
  const { data: projectSection, loading: sectionLoading } = useDocument<ProjectsSection>(
    COLLECTIONS.PROJECT_SECTION,
    'main'
  );
  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    COLLECTIONS.PROJECTS,
    [orderBy('order', 'asc')]
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Projects Section */}
      {projectSection && projects && projects.length > 0 && (
        <ProjectsSection
          title={projectSection.title}
          subtitle={projectSection.subtitle}
          categories={projectSection.categories}
          projects={projects}
        />
      )}
    </div>
  );
}
