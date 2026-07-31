import { NextResponse, type NextRequest } from 'next/server';
import { STORE } from '@nutricycle/shared';

/**
 * Device-aware store redirect.
 *
 * Every CTA on the site points here rather than at a store URL directly.
 * That gives one place to change the URLs, placement-level click tracking,
 * and a QR target that never needs reprinting (cta-strategy.md §2).
 *
 * Desktop visitors cannot install, so they are returned to /descargar
 * where both badges and a QR code live — that is where app-landing funnels
 * usually leak.
 */

function detect(ua: string): 'ios' | 'android' | 'desktop' {
  const s = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(s)) return 'ios';
  if (/android/.test(s)) return 'android';
  // iPadOS 13+ reports as desktop Safari but exposes touch.
  if (/macintosh/.test(s) && /mobile/.test(s)) return 'ios';
  return 'desktop';
}

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  const platform = detect(ua);
  const source = request.nextUrl.searchParams.get('src') ?? 'unknown';

  // TODO: persist { platform, source, ua, ts } to web_cta_events.
  //       Schema in revised-direction.md §2.

  const target = platform === 'ios' ? STORE.ios : platform === 'android' ? STORE.android : '';

  // ⚠️ Store URLs are not configured yet. Until they are, send everyone to
  // /descargar rather than to a broken redirect.
  if (!target) {
    const fallback = new URL('/descargar', request.nextUrl.origin);
    fallback.searchParams.set('src', source);
    fallback.searchParams.set('pending', '1');
    return NextResponse.redirect(fallback, 307);
  }

  return NextResponse.redirect(target, 307);
}
