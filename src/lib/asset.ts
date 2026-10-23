/** Превращает путь из public/ в URL с учётом base path GitHub Pages. */
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
