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

/** ISO-строка для пункта программы: дата свадьбы + местное время "HH:MM". */
export function scheduleTimeIso(time: string): string {
  const [datePart, rest] = wedding.event.startsAt.split('T');
  const offset = rest.match(/([+-]\d{2}:\d{2}|Z)$/)?.[0] ?? '';
  return `${datePart}T${time}:00${offset}`;
}

const pluralRules = new Intl.PluralRules(LOCALE);

/** Выбор формы слова: plural(5, ['день', 'дня', 'дней']) → «дней». */
export function plural(n: number, [one, few, many]: [string, string, string]): string {
  switch (pluralRules.select(n)) {
    case 'one':
      return one;
    case 'few':
      return few;
    default:
      return many;
  }
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
