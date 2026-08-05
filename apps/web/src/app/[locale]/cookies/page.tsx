import type { Metadata } from 'next';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { COOKIES } from '@/data/legal';
import { LegalDocument } from '@/components/content/legal-document';

export const metadata: Metadata = {
  title: COOKIES.title,
  description: COOKIES.description,
  alternates: { canonical: '/cookies' },
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return <LegalDocument doc={COOKIES} />;
}
