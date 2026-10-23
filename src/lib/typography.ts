const NBSP = ' ';

/** Не даёт последнему слову (например, номеру дома) остаться одному на строке. */
export function keepLastWord(text: string): string {
  const i = text.lastIndexOf(' ');
  return i === -1 ? text : `${text.slice(0, i)}${NBSP}${text.slice(i + 1)}`;
}
