import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { SITE, siteTagline } from '@nutricycle/shared';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StickyAppBar } from '@/components/marketing/sticky-app-bar';
import { LOCALES, isLocale, HTML_LANG, OG_LOCALE, getDictionary, alternatesFor } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import '@/styles/globals.css';

/**
 * The root layout lives under `[locale]` rather than at `app/` because
 * `<html lang>` has to be the reader's language, and only a segment with
 * params can know it. Reading it from a header in a static root layout would
 * work but makes every page dynamic — 40 prerendered pages become
 * server-rendered to set one attribute.
 *
 * Spanish keeps the bare URLs (`/recetas`, not `/es/recetas`) via a rewrite
 * in next.config.mjs. See revised-direction.md §3.
 */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const DESCRIPTION: Record<Locale, string> = {
  es: 'Aprende a comer según tu ciclo. Recetas, alimentos clave y educación hormonal para cada fase — sin dietas, sin restricciones.',
  en: 'Learn to eat with your cycle. Recipes, key foods and hormonal education for every phase — no diets, no restrictions.',
};

/** Both locales are prerendered; there is no third. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'es';
  const title = `${SITE.name} — ${siteTagline(locale)}`;

  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s | ${SITE.name}` },
    description: DESCRIPTION[locale],
    alternates: { languages: alternatesFor(locale === 'en' ? '/en' : '/') },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      siteName: SITE.name,
      title,
      description: DESCRIPTION[locale],
    },
    icons: {
      icon: '/images/brand/favicon-192.png',
      apple: '/images/brand/favicon-192.png',
    },
    // TODO: add `openGraph.images` once a 1200×630 share image exists.
    //       See doc/04-content/image-assets.md §5 gap #8.
  };
}

export const viewport: Viewport = {
  themeColor: '#fdfcf4',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);

  return (
    // suppressHydrationWarning: the pre-paint script below adds `js` to
    // this element, so the server and client markup differ by design.
    <html
      lang={HTML_LANG[locale]}
      className={`${cormorant.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint. Scroll-reveal only engages once this
            marks the document as scripted — otherwise content stays
            visible rather than being hidden with no way back. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="field-warm min-h-screen antialiased">
        <a
          href="#contenido"
          className="sr-only rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          {t.a11y.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="contenido">{children}</main>
        <SiteFooter locale={locale} />
        <StickyAppBar locale={locale} />
      </body>
    </html>
  );
}
