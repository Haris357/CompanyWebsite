'use client';

import { useDocument } from '@/hooks/useFirestore';
import { COLLECTIONS, type ContactSection as ContactType } from '@/types';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  const { data: contact, loading } = useDocument<ContactType>(
    COLLECTIONS.CONTACT,
    'main'
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Contact Section */}
      {contact && <ContactSection data={contact} />}
    </div>
  );
}
