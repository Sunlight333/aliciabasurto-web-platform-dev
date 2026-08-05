import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { AVISO_MEDICO } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: AVISO_MEDICO.title,
  description: AVISO_MEDICO.description,
  alternates: { canonical: '/aviso-medico' },
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return <LegalDocument doc={AVISO_MEDICO} />;
}
