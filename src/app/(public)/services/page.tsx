'use client';

import { useDocument } from '@/hooks/useFirestore';
import { COLLECTIONS, type ServicesSection as ServicesType } from '@/types';
import ServicesSection from '../components/ServicesSection';

export default function ServicesPage() {
  const { data: services, loading } = useDocument<ServicesType>(
    COLLECTIONS.SERVICES,
    'main'
  );
  return (
    <div className="min-h-screen pt-20">
      {/* Services Section */}
      {services && services.services && services.services.length > 0 && (
        <ServicesSection data={services} />
      )}
    </div>
  );
}
