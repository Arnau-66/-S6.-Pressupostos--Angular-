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



});
