import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVideos } from '@/lib/content';

/** See blog/[slug] — same reasoning: shape settled, content pending. */
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
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideos().find((v) => v.slug === slug);
  if (!video) notFound();
  return null;
}
