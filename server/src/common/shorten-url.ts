interface ShortenUrlParams {
  baseUrl: string;
  url: string;
}

import { customAlphabet } from 'nanoid'

export function shortenUrl(params: ShortenUrlParams): { original: string; shortened: string } {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvxwyz', 8);
  return {
    original: params.url,
    shortened: `${params.baseUrl}/${nanoid()}`,
  };
}
