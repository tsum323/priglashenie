import { wedding } from '../data/wedding';

/** Дата в формате iCalendar в UTC: 20261208T080000Z. */
function toIcsUtc(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

const { event, venue, texts, schedule } = wedding;
const location = venue.address ?? event.city;
const details = schedule
  .map((item) => `${item.time} — ${item.title}, ${item.place.name}`)
  .join('\n');

/** data:-ссылка на .ics-файл: работает без сервера. */
export function icsHref(): string {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding-invitation//RU',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${toIcsUtc(event.startsAt)}-wedding@invitation`,
    `DTSTAMP:${toIcsUtc(event.startsAt)}`,
    `DTSTART:${toIcsUtc(event.startsAt)}`,
    `DTEND:${toIcsUtc(event.endsAt)}`,
    `SUMMARY:${escapeIcs(texts.calendarTitle)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(details)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function googleCalendarHref(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: texts.calendarTitle,
    dates: `${toIcsUtc(event.startsAt)}/${toIcsUtc(event.endsAt)}`,
    location,
    details,
    ctz: event.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
