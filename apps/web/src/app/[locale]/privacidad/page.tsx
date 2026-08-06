import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { PRIVACIDAD } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: PRIVACIDAD.title,
  description: PRIVACIDAD.description,
  alternates: { canonical: '/privacidad' },
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return <LegalDocument doc={PRIVACIDAD} locale={locale} />;
}
