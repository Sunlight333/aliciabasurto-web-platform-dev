import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, Info } from 'lucide-react';
import { SITE } from '@nutricycle/shared';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { SectionTexture } from '@/components/layout/section-texture';
import { Container } from '@/components/layout/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/motion/reveal';
import { CtaBand } from '@/components/marketing/cta-band';
import { VideoPlayer } from '@/components/content/video-player';
import { getVideos } from '@/lib/content';
import { formatDuration, isoDuration, videoPoster, videoSources } from '@/lib/media';

/** Every video is known at build time; an unknown slug is a 404, not a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideos().find((v) => v.slug === slug);
  if (!video) return {};
  return {
    title: video.title,
    description: video.excerpt,
    alternates: { canonical: `/videos/${video.slug}` },
    // The site's first real share images. Resolved against `metadataBase`
    // in app/layout.tsx. 1280×720 rather than the usual 1200×630 because
    // that is the native shape of the client's footage, and cropping the
    // dish to fit a ratio would be the wrong trade.
    openGraph: {
      type: 'video.other',
      images: [{ url: videoPoster(video.slug), width: 1280, height: 720, alt: video.title }],
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const videos = getVideos();
  const video = videos.find((v) => v.slug === slug);
  if (!video) notFound();

  // Ordering is the client's own #21…#31 sequence, so prev/next walks the
  // series rather than jumping around it.
  const index = videos.findIndex((v) => v.slug === video.slug);
  const previous = videos[index - 1];
  const next = videos[index + 1];
  const others = videos.filter((v) => v.slug !== video.slug);

  const mp4 = videoSources(video.slug).find((s) => s.type === 'video/mp4')!.src;
  const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.excerpt,
    thumbnailUrl: absolute(videoPoster(video.slug)),
    contentUrl: absolute(mp4),
    duration: isoDuration(video.duration),
    // `uploadDate` is deliberately absent. Google asks for it, but the client
    // supplied these files without a publication date and inventing one would
    // put a false date into structured data. Add it the moment it is known.
    publisher: { '@type': 'Organization', name: SITE.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Video"
        title={video.title}
        lead={video.excerpt}
        image="/images/heroes/videos.avif"
        focal="center 50%"
        veil={0.62}
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white/70 px-5 py-2.5 font-sans text-caption font-semibold text-ink shadow-sm backdrop-blur-sm">
          <Clock strokeWidth={2} className="h-4.5 w-4.5 text-accent" />
          {formatDuration(video.duration)}
        </span>
      </PageHero>

      <Section surface="raised">
        <SectionTexture src="/images/textures/luz.avif" />
        {/* Content width, not prose width: the player is the page, and 62ch
            would render a 1280×720 master at barely half its native size.
            max-w-4xl lands just under 1280 so it never upscales. */}
        <Container className="relative">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <VideoPlayer slug={video.slug} title={video.title} />
            </Reveal>

            <Reveal className="mt-10" delay={80}>
              <p className="flex items-start gap-3.5 rounded-card border border-hairline bg-white p-6 text-caption text-muted">
                <Info aria-hidden strokeWidth={2} className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  Sin locución: mirá las manos y seguí los pasos. Información general de
                  nutrición, no consejo médico.{' '}
                  <Link
                    href="/aviso-medico"
                    className="font-semibold text-accent underline underline-offset-4"
                  >
                    Leé el aviso médico
                  </Link>
                  .
                </span>
              </p>
            </Reveal>

            {/* Never a dead end — the live /post pages have no way onward
                (site-audit.md §12.1 item 2). */}
            <Reveal className="mt-14 border-t border-hairline pt-9" delay={120}>
              <div className="flex flex-wrap items-center justify-between gap-5">
                {previous ? (
                  <Link
                    href={`/videos/${previous.slug}`}
                    className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
                  >
                    <ArrowLeft
                      strokeWidth={2.2}
                      className="h-5.5 w-5.5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1.5"
                    />
                    {previous.title}
                  </Link>
                ) : (
                  <Link
                    href="/videos"
                    className="group inline-flex items-center gap-2.5 font-sans text-nav font-semibold text-action transition-colors hover:text-action-hover"
                  >
                    <ArrowLeft
                      strokeWidth={2.2}
                      className="h-5.5 w-5.5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1.5"
                    />
                    Todos los videos
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/videos/${next.slug}`}
                    className="group inline-flex items-center gap-2.5 text-right font-sans text-nav font-semibold text-muted transition-colors hover:text-ink"
                  >
                    {next.title}
                    <ArrowRight
                      strokeWidth={2.2}
                      className="h-5.5 w-5.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </Link>
                )}
              </div>

              {others.length > 0 && (
                <>
                  <Eyebrow className="mt-12">Seguí con estos</Eyebrow>
                  <ul className="mt-5 flex flex-col gap-3">
                    {others.slice(0, 3).map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/videos/${o.slug}`}
                          className="card card-hover flex items-center justify-between gap-5 p-6"
                        >
                          <span className="font-display text-h4 text-ink">{o.title}</span>
                          <span className="shrink-0 font-sans text-caption text-muted tabular-nums">
                            {formatDuration(o.duration)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand source={`video-${video.slug}`} />
    </>
  );
}
