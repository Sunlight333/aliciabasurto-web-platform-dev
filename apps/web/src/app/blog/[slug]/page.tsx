import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getArticles } from '@/lib/content';

/**
 * No articles exist yet, so this prerenders nothing and any slug 404s —
 * which is correct. The route is here so the shape is settled and adding
 * the first article is a data change, not a routing change.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return null;
}
