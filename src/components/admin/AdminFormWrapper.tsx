'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AdminFormWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AdminFormWrapper({
  title,
  description,
  children
}: AdminFormWrapperProps) {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="admin-heading">{title}</h1>
        {description && (
          <p className="admin-text-muted mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`admin-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AdminSectionHeader({ title }: { title: string }) {
  return <h2 className="admin-subheading mb-4">{title}</h2>;
}
