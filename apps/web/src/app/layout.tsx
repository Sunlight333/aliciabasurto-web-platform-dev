import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { SITE } from '@nutricycle/shared';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StickyAppBar } from '@/components/marketing/sticky-app-bar';
import '@/styles/globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Aprende a comer según tu ciclo. Recetas, alimentos clave y educación hormonal para cada fase — sin dietas, sin restricciones.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      'Aprende a comer según tu ciclo. Recetas, alimentos clave y educación hormonal para cada fase.',
  },
  icons: {
    icon: '/images/brand/favicon-192.png',
    apple: '/images/brand/favicon-192.png',
  },
  // TODO: add `openGraph.images` once a 1200×630 share image exists.
  //       See doc/04-content/image-assets.md §5 gap #8.
};

export const viewport: Viewport = {
  themeColor: '#fdfcf4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the pre-paint script below adds `js` to
    // this element, so the server and client markup differ by design.
    <html
      lang="es"
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
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <StickyAppBar />
      </body>
    </html>
  );
}
