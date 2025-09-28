export interface ShareableState {
  seo: boolean;
  ads: boolean;
  web: boolean;
  pages: number;
  languages: number;
  name: string;
  email: string;
  phone: string;
}

function toBool(v: string | null | undefined): boolean {
  if (v == null) return false;
  const s = v.toLowerCase();
  return s === '1' || s === 'true';
}

function toInt(v: string | null | undefined, min = 1, fallback = 1): number {
  const n = Number(v);
  if (Number.isInteger(n) && n >= min) return n;
  return fallback;
}

function sanitizeString(v: string | null | undefined, maxLen = 200): string {
  if (v == null) return '';
  const trimmed = String(v).trim();
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

function looksLikeEmail(v: string): boolean {
  return !!v && v.includes('@') && v.includes('.');
}

export function decodeFromSearchParams(
  search: string
): Partial<ShareableState> {
  const sp = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);

  const web = toBool(sp.get('web'));

  const name = sanitizeString(sp.get('name'));
  const emailRaw = sanitizeString(sp.get('email'));
  const email = looksLikeEmail(emailRaw) ? emailRaw : '';
  const phone = sanitizeString(sp.get('phone'));

  const pages = web ? toInt(sp.get('pages'), 1, 1) : 1;
  const languages = web ? toInt(sp.get('languages'), 1, 1) : 1;

  return {
    seo: toBool(sp.get('seo')),
    ads: toBool(sp.get('ads')),
    web,
    pages,
    languages,
    name,
    email,
    phone,
  };
}

export function encodeToSearchParams(
  state: Partial<ShareableState>,
  baseUrl?: string
): string {
  const sp = new URLSearchParams();

  if (state.seo != null) sp.set('seo', state.seo ? '1' : '0');
  if (state.ads != null) sp.set('ads', state.ads ? '1' : '0');

  if (state.web != null) sp.set('web', state.web ? '1' : '0');
  if (state.web) {
    if (state.pages != null) sp.set('pages', String(toInt(String(state.pages), 1, 1)));
    if (state.languages != null) sp.set('languages', String(toInt(String(state.languages), 1, 1)));
  }

  if (state.name != null) sp.set('name', sanitizeString(state.name));
  if (state.email != null) {
    const e = sanitizeString(state.email);
    if (looksLikeEmail(e)) sp.set('email', e);
  }
  if (state.phone != null) sp.set('phone', sanitizeString(state.phone));

  const qs = sp.toString();

  if (!baseUrl) return qs;

  const sep = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${qs ? sep + qs : ''}`;
}
