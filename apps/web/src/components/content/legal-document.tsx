import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { LEGAL_DOCS, type LegalDoc } from '@/data/legal';
import { getDictionary, localizePath, type Locale } from '@/lib/i18n';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { PageHero } from '@/components/layout/page-hero';

/**
 * Shared renderer for all four legal routes.
 *
 * ⚠️ The documents themselves are **not translated**, on purpose. They are
 * the client's own text, migrated verbatim from the live site, and the
 * header of data/legal.ts is explicit that changes belong with their
 * counsel. A machine translation of binding terms would be a legal
 * document nobody approved, so /en renders the Spanish text behind a
 * notice — in English — saying the Spanish version is the authoritative
 * one and a translation is pending. Tracked as a client blocker.
 *
 * Long-form legal text needs a narrow measure and generous leading — it
 * is read carefully or not at all — so this deliberately ignores the
 * marketing grid and runs a single prose column.
 *
 * Sections are numbered from their position, so reordering the data
 * renumbers the document and the in-page index together.
 */
export function LegalDocument({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={t.legal.eyebrow}
        title={doc.title}
        lead={`${t.legal.updated}: ${doc.updated}`}
      />

      <Section surface="raised" size="tight">
        <Container size="prose">
          {locale !== 'es' && (
            <p className="mb-10 flex items-start gap-3.5 rounded-card border border-ovulation bg-ovulation-soft p-6 text-small text-ink">
              <AlertTriangle
                aria-hidden
                strokeWidth={2}
                className="mt-0.5 h-5 w-5 shrink-0 text-ovulation-ink"
              />
              <span>{t.legal.spanishOnly}</span>
            </p>
          )}

          <p className="text-lead text-muted">{doc.intro}</p>

          {/* Index — these documents run to eleven sections */}
          <nav aria-label={t.legal.index} className="mt-10 rounded-card border border-hairline bg-white p-7 shadow-sm">
            <p className="font-sans text-eyebrow font-bold tracking-[0.16em] text-accent-display uppercase">
              {t.legal.contents}
            </p>
            <ol className="mt-5 flex flex-col gap-2.5">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a
                    href={`#s-${i + 1}`}
                    className="text-small text-muted transition-colors hover:text-ink"
                  >
                    <span className="text-accent-display">{i + 1}.</span> {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 flex flex-col gap-12">
            {doc.sections.map((section, i) => (
              <section key={section.heading} id={`s-${i + 1}`} data-anchor>
                <h2 className="text-h3 text-ink">
                  <span className="text-accent-display">{i + 1}.</span>{' '}
                  {section.heading}
                </h2>

                <div className="mt-5 flex flex-col gap-5">
                  {section.blocks.map((block, j) => {
                    if (block.type === 'p') {
                      return (
                        <p key={j} className="text-body text-muted">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === 'ul') {
                      return (
                        <ul key={j} className="flex flex-col gap-2.5">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3.5 text-body text-muted"
                            >
                              <span
                                aria-hidden
                                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-display"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={j}
                        className="flex items-start gap-3.5 rounded-card border border-menstrual bg-menstrual-soft p-6 font-sans text-body font-semibold text-ink"
                      >
                        <AlertTriangle
                          strokeWidth={2}
                          aria-hidden
                          className="mt-0.5 h-6 w-6 shrink-0 text-menstrual-ink"
                        />
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <nav
            aria-label="Otros documentos legales"
            className="mt-16 border-t border-hairline pt-9"
          >
            <p className="font-sans text-eyebrow font-bold tracking-[0.16em] text-accent-display uppercase">
              Otros documentos
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {others.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    className="inline-flex rounded-full border border-hairline bg-white px-5 py-2.5 text-caption font-semibold text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>
    </>
  );
}
