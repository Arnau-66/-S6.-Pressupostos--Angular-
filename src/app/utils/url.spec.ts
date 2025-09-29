import { encodeToSearchParams, decodeFromSearchParams } from './url';

type ShareState = {
  seo: boolean;
  ads: boolean;
  web: boolean;
  pages: number;
  languages: number;
  name: string;
  email: string;
  phone?: string;
};

describe('url utils: encodeToSearchParams / decodeFromSearchParams', () => {

  const onlyQuery = (urlOrQs: string): string => {
    if (urlOrQs.startsWith('?')) return urlOrQs;
    
    try {
      const u = new URL(urlOrQs);
      return u.search;
    } catch {
      return urlOrQs;
    }
  };

  const qsToMap = (qs: string): Map<string, string> => {
    const out = new Map<string, string>();
    const sp = new URLSearchParams(onlyQuery(qs));
    sp.forEach((v, k) => out.set(k, v));
    return out;
  };

   it('encodes booleans as 1/0 and numbers as decimals', () => {
    const state: Partial<ShareState> = {
      seo: true,
      ads: false,
      web: true,
      pages: 3,
      languages: 2,
      name: 'Ana',
      email: 'ana@mail.com',
      phone: ''
    };

    const result = encodeToSearchParams(state);
    const map = qsToMap(result);

    expect(map.get('seo')).toBe('1');
    expect(map.get('ads')).toBe('0');
    expect(map.get('web')).toBe('1');
    expect(map.get('pages')).toBe('3');
    expect(map.get('languages')).toBe('2');
    expect(map.get('name')).toBe('Ana');
    expect(map.get('email')).toBe('ana@mail.com');

    expect(map.has('phone')).toBeTrue();
    expect(map.get('phone')).toBe('');
  });

  it('omits undefined / null / empty values from the query string', () => {
    const state: Partial<ShareState> = {
      name: '',         
      email: 'x@y.com',
      phone: undefined,
    };

    const qs = encodeToSearchParams(state);
    const map = qsToMap(qs);

    expect(map.get('email')).toBe('x@y.com');
    if (map.has('name')) {
      expect(map.get('name')).toBe('');
    }

    expect(map.has('phone')).toBeFalse();
  });
  
  it('supports baseUrl, returning a full URL (and keeps the same query string)', () => {
    const state: Partial<ShareState> = { seo: true, pages: 1, name: 'Bruno' };
    const base = 'https://example.com/app';

    const full = encodeToSearchParams(state, base);
    const qs = onlyQuery(full);
    const map = qsToMap(qs);

    expect(full.startsWith(base)).toBeTrue();

    expect(map.get('seo')).toBe('1');
    expect(map.get('name')).toBe('Bruno');

    const pagesVal = map.get('pages');
    if (pagesVal !== undefined) {
      expect(pagesVal).toBe('1');
    }
  });


  it('decodes booleans and numbers from a query string', () => {
    const qs = '?seo=1&ads=0&web=1&pages=5&languages=2&name=Ana&email=ana%40mail.com';

    const decoded = decodeFromSearchParams(qs) as Partial<ShareState>;

    expect(decoded.seo).toBeTrue();
    expect(decoded.ads).toBeFalse();
    expect(decoded.web).toBeTrue();
    expect(decoded.pages).toBe(5);
    expect(decoded.languages).toBe(2);
    expect(decoded.name).toBe('Ana');
    expect(decoded.email).toBe('ana@mail.com');
  });

  it('is resilient to invalid numeric values (e.g., "pages=abc")', () => {

    const qs = '?web=1&pages=abc&languages=-2';
    const decoded = decodeFromSearchParams(qs) as Partial<ShareState>;

    expect(decoded.web).toBeTrue();
    expect(decoded.pages).toBe(1);
    expect(decoded.languages).toBe(1);
  });

  it('round-trips: decode(encode(state)) ≈ normalized(state)', () => {
    const original: Partial<ShareState> = {
      seo: true,
      ads: true,
      web: true,
      pages: 2,
      languages: 3,
      name: 'María López',
      email: 'maria@example.com',
      phone: ''
    };

    const qs = encodeToSearchParams(original);
    const decoded = decodeFromSearchParams(qs) as Partial<ShareState>;

    expect(decoded.seo).toBeTrue();
    expect(decoded.ads).toBeTrue();
    expect(decoded.web).toBeTrue();
    expect(decoded.pages).toBe(2);
    expect(decoded.languages).toBe(3);
    expect(decoded.name).toBe('María López');
    expect(decoded.email).toBe('maria@example.com');

    expect(decoded.phone).toBe('');
  });

  it('handles empty or missing query string gracefully', () => {
    const empty1 = '';
    const empty2 = '?';
    const empty3 = '   ';

    const d1 = decodeFromSearchParams(empty1) as Partial<ShareState>;
    const d2 = decodeFromSearchParams(empty2) as Partial<ShareState>;
    const d3 = decodeFromSearchParams(empty3) as Partial<ShareState>;

    const expectedDefaults = {
      seo: false,
      ads: false,
      web: false,
      pages: 1,
      languages: 1,
      name: '',
      email: '',
      phone: ''
    };

    expect(d1).toEqual(expectedDefaults);
    expect(d2).toEqual(expectedDefaults);
    expect(d3).toEqual(expectedDefaults);
  });
});
