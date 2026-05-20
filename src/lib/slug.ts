const ACCENT_MAP: Record<string, string> = {
  á: 'a', à: 'a', ä: 'a', â: 'a', ã: 'a',
  é: 'e', è: 'e', ë: 'e', ê: 'e',
  í: 'i', ì: 'i', ï: 'i', î: 'i',
  ó: 'o', ò: 'o', ö: 'o', ô: 'o', õ: 'o',
  ú: 'u', ù: 'u', ü: 'u', û: 'u',
  ñ: 'n', ç: 'c',
}

/** "Aretes Argolla Clásica" → "aretes-argolla-clasica" */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((c) => ACCENT_MAP[c] ?? c)
    .join('')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
}
