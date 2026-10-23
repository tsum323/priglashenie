import { wedding } from '../data/wedding';
import { assetUrl } from './asset';
import { calendarDetails, calendarLocation, ICS_FILE_NAME, toIcsUtc } from './ics';

/** Ссылка на wedding.ics, который генерируется при сборке (см. vite.config.ts). */
export function icsHref(): string {
  return assetUrl(ICS_FILE_NAME);
}

export function googleCalendarHref(): string {
  const { event, texts } = wedding;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: texts.calendarTitle,
    dates: `${toIcsUtc(event.startsAt)}/${toIcsUtc(event.endsAt)}`,
    location: calendarLocation,
    details: calendarDetails,
    ctz: event.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
