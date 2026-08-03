import type { Metadata } from 'next';
import { PRIVACIDAD } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: PRIVACIDAD.title,
  description: PRIVACIDAD.description,
  alternates: { canonical: '/privacidad' },
};

export default function Page() {
  return <LegalDocument doc={PRIVACIDAD} />;
}
