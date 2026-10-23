import { wedding } from '../data/wedding';

/**
 * Файл события для календаря (iCalendar, RFC 5545).
 * Собирается при сборке сайта и публикуется как обычный файл wedding.ics:
 * iPhone и Android открывают его в системном календаре только по настоящему
 * URL с типом text/calendar, а не по data:-ссылке.
 */
export const ICS_FILE_NAME = 'wedding.ics';

const { event, texts, schedule } = wedding;

/** Место сбора — первый пункт программы с адресом. */
export const calendarLocation =
  schedule.find((item) => item.place.address)?.place.address ?? event.city;

export const calendarDetails = schedule
  .map((item) => `${item.time} — ${item.title}, ${item.place.name}`)
  .join('\n');

/** Дата в формате iCalendar в UTC: 20261208T080000Z. */
export function toIcsUtc(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

function escapeText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Перенос строк длиннее 75 байт (UTF-8) — требование формата, без него часть календарей отказывается импортировать файл. */
function fold(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = '';
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    const limit = parts.length === 0 ? 75 : 74; // у продолжения первый байт — пробел
    if (bytes + size > limit) {
      parts.push(current);
      current = '';
      bytes = 0;
    }
    current += char;
    bytes += size;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

export function buildIcs(now = new Date()): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Daniil & Valeria//Wedding invitation//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${toIcsUtc(event.startsAt)}@daniil-valeria`,
    `DTSTAMP:${toIcsUtc(now.toISOString())}`,
    `DTSTART:${toIcsUtc(event.startsAt)}`,
    `DTEND:${toIcsUtc(event.endsAt)}`,
    `SUMMARY:${escapeText(texts.calendarTitle)}`,
    `LOCATION:${escapeText(calendarLocation)}`,
    `DESCRIPTION:${escapeText(calendarDetails)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}
