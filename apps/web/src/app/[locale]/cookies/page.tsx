import type { Metadata } from 'next';
import { COOKIES } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: COOKIES.title,
  description: COOKIES.description,
  alternates: { canonical: '/cookies' },
};

export default function Page() {
  return <LegalDocument doc={COOKIES} />;
}
