/**
 * Mengubah string menjadi Base64 untuk melindungi dari inspeksi memori (Anti-F12).
 */
export const obfuscate = (text: string): string => {
  if (typeof window !== 'undefined') {
    return btoa(encodeURIComponent(text));
  }
  // Fallback untuk SSR/Server environment (meski app kita client-side)
  return Buffer.from(encodeURIComponent(text)).toString('base64');
};

/**
 * Mengembalikan string Base64 ke bentuk aslinya.
 */
export const deobfuscate = (obfuscatedText: string): string => {
  try {
    if (typeof window !== 'undefined') {
      return decodeURIComponent(atob(obfuscatedText));
    }
    return decodeURIComponent(Buffer.from(obfuscatedText, 'base64').toString('ascii'));
  } catch (e) {
    return "Error-Deobfuscate";
  }
};
