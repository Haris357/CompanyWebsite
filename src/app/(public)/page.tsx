'use client';

import { useDocument, useCollection } from '@/hooks/useFirestore';
import {
  COLLECTIONS,
  type HeroSection as HeroType,
  type ServicesSection as ServicesType,
  type ProjectsSection,
  type Project,
  type TestimonialsSection as TestimonialsType,
  type AboutSection as AboutType,
  type TeamSection as TeamType,
  type FAQSection as FAQType,
  type ContactSection as ContactType,
  type SocialMediaSection as SocialMediaType,
  type SectionVisibility,
} from '@/types';

// Components
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import SocialMediaSection from './components/SocialMediaSection';
import { orderBy } from 'firebase/firestore';

export default function HomePage() {
  // Fetch section visibility settings
  const { data: sectionVisibility } = useDocument<SectionVisibility>(
    COLLECTIONS.SECTION_VISIBILITY,
    'main'
  );

  // Fetch all data
  const { data: hero } = useDocument<HeroType>(COLLECTIONS.HERO, 'main');
  const { data: services } = useDocument<ServicesType>(
    COLLECTIONS.SERVICES,
    'main'
  );
  const { data: projectSection } = useDocument<ProjectsSection>(
    COLLECTIONS.PROJECT_SECTION,
    'main'
  );
  const { data: projects } = useCollection<Project>(COLLECTIONS.PROJECTS, [
    orderBy('order', 'asc'),
  ]);
  const { data: testimonials } = useDocument<TestimonialsType>(
    COLLECTIONS.TESTIMONIALS,
    'main'
  );
  const { data: about } = useDocument<AboutType>(COLLECTIONS.ABOUT, 'main');
  const { data: team } = useDocument<TeamType>(COLLECTIONS.TEAM, 'main');
  const { data: faq } = useDocument<FAQType>(COLLECTIONS.FAQ, 'main');
  const { data: contact } = useDocument<ContactType>(
    COLLECTIONS.CONTACT,
    'main'
  );
  const { data: socialMedia } = useDocument<SocialMediaType>(
    COLLECTIONS.SOCIAL_MEDIA,
    'main'
  );

  // Helper function to check if a section should be visible
  const isSectionVisible = (sectionKey: string): boolean => {
    // If no visibility settings exist, show all sections by default
    if (!sectionVisibility) return true;
    // Check if the section is explicitly set to visible (default to true if not set)
    return sectionVisibility[sectionKey] !== false;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {isSectionVisible('hero') && hero && (
        <div id="home">
          <HeroSection data={hero} />
        </div>
      )}

      {/* About Section */}
      {isSectionVisible('about') && about && (
        <div id="about">
          <AboutSection data={about} />
        </div>
      )}

      {/* Services Section */}
      {isSectionVisible('services') &&
        services &&
        services.services &&
        services.services.length > 0 && (
          <div id="services">
            <ServicesSection data={services} />
          </div>
        )}

      {/* Projects Section */}
      {isSectionVisible('projects') &&
        projectSection &&
        projects &&
        projects.length > 0 && (
          <div id="projects">
            <ProjectsSection
              title={projectSection.title}
              subtitle={projectSection.subtitle}
              categories={projectSection.categories}
              projects={projects}
            />
          </div>
        )}

      {/* Team Section */}
      {isSectionVisible('team') &&
        team &&
        team.members &&
        team.members.length > 0 && (
          <div id="team">
            <TeamSection data={team} />
          </div>
        )}

      {/* Testimonials Section */}
      {isSectionVisible('testimonials') &&
        testimonials &&
        testimonials.testimonials &&
        testimonials.testimonials.length > 0 && (
          <div id="testimonials">
            <TestimonialsSection data={testimonials} />
          </div>
        )}

      {/* FAQ Section */}
      {isSectionVisible('faq') &&
        faq &&
        faq.faqs &&
        faq.faqs.length > 0 && (
          <div id="faq">
            <FAQSection data={faq} />
          </div>
        )}

      {/* Social Media Section */}
      {isSectionVisible('socialMedia') &&
        socialMedia &&
        socialMedia.posts &&
        socialMedia.posts.length > 0 && (
          <div id="social">
            <SocialMediaSection data={socialMedia} />
          </div>
        )}

      {/* Contact Section */}
      {isSectionVisible('contact') && contact && (
        <div id="contact">
          <ContactSection data={contact} />
        </div>
      )}
    </div>
  );
}
