import type { Metadata } from 'next';
import { TERMINOS } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: TERMINOS.title,
  description: TERMINOS.description,
  alternates: { canonical: '/terminos' },
};

export default function Page() {
  return <LegalDocument doc={TERMINOS} />;
}
