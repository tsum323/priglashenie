import { wedding } from '../data/wedding';

const LOCALE = 'ru-RU';
const NBSP = ' ';

function format(date: Date, options: Intl.DateTimeFormatOptions, timeZone: string): string {
  return new Intl.DateTimeFormat(LOCALE, { ...options, timeZone }).format(date);
}

export interface EventDate {
  /** Значение для атрибута datetime. */
  iso: string;
  /** «8 декабря 2026» — без «г.», с неразрывными пробелами. */
  long: string;
  /** «08.12.2026» */
  numeric: string;
  /** «вторник» */
  weekday: string;
  /** «11:00» */
  time: string;
}

export function describeDate(iso: string, timeZone: string): EventDate {
  const date = new Date(iso);
  const dayMonth = format(date, { day: 'numeric', month: 'long' }, timeZone);
  const year = format(date, { year: 'numeric' }, timeZone);

  return {
    iso,
    long: `${dayMonth} ${year}`.replace(/ /g, NBSP),
    numeric: format(date, { day: '2-digit', month: '2-digit', year: 'numeric' }, timeZone),
    weekday: format(date, { weekday: 'long' }, timeZone),
    time: format(date, { hour: '2-digit', minute: '2-digit', hour12: false }, timeZone),
  };
}

export const eventDate = describeDate(wedding.event.startsAt, wedding.event.timeZone);
