'use client';

import { useDocument, useCollection } from '@/hooks/useFirestore';
import {
  COLLECTIONS,
  type ProjectsSection,
  type Project,
} from '@/types';
import ProjectsSection from '../components/ProjectsSection';
import { motion } from 'framer-motion';
import { orderBy } from 'firebase/firestore';

export default function PortfolioPage() {
  const { data: projectSection, loading: sectionLoading } =
    useDocument<ProjectsSection>(COLLECTIONS.PROJECT_SECTION, 'main');

  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    COLLECTIONS.PROJECTS,
    [orderBy('order', 'asc')]
  );

  const loading = sectionLoading || projectsLoading;

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--background-color)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 rounded-full"
          style={{
            borderColor: 'var(--primary-color)',
            borderTopColor: 'transparent',
          }}
        />
      </div>
    );
  }

  if (!projectSection || !projects || projects.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--background-color)' }}
      >
        <p style={{ color: 'var(--text-color)' }} className="text-xl">
          No projects available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <ProjectsSection
        title={projectSection.title}
        subtitle={projectSection.subtitle}
        categories={projectSection.categories}
        projects={projects}
      />
    </div>
  );
}
