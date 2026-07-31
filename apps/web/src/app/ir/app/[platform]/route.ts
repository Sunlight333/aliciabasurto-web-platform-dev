import { NextResponse, type NextRequest } from 'next/server';
import { STORE } from '@nutricycle/shared';

/**
 * Explicit per-store redirects, used by the badge pair where the user has
 * already chosen a platform. Same tracking contract as /ir/app.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ platform: string }> },
) {
  const { platform } = await context.params;
  const source = request.nextUrl.searchParams.get('src') ?? 'unknown';

  const target =
    platform === 'ios' ? STORE.ios : platform === 'android' ? STORE.android : '';

  if (platform !== 'ios' && platform !== 'android') {
    return NextResponse.redirect(new URL('/descargar', request.nextUrl.origin), 307);
  }

  // TODO: persist { platform, source, ua, ts } to web_cta_events.

  if (!target) {
    const fallback = new URL('/descargar', request.nextUrl.origin);
    fallback.searchParams.set('src', source);
    fallback.searchParams.set('pending', '1');
    return NextResponse.redirect(fallback, 307);
  }

  return NextResponse.redirect(target, 307);
}
