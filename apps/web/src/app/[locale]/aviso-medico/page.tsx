import type { Metadata } from 'next';
import { AVISO_MEDICO } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: AVISO_MEDICO.title,
  description: AVISO_MEDICO.description,
  alternates: { canonical: '/aviso-medico' },
};

export default function Page() {
  return <LegalDocument doc={AVISO_MEDICO} />;
}
