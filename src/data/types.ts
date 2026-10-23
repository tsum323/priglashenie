/** Типы конфигурации мероприятия. Все секции сайта читают данные только отсюда. */

export interface Person {
  firstName: string;
}

export interface Photo {
  /** Путь относительно папки public/, например "photos/hero.webp". */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Значение CSS object-position для кадрирования, например "50% 30%". */
  focalPoint?: string;
}

export interface Place {
  name: string;
  /** Полный адрес; null — пока не уточнён. */
  address: string | null;
}

export interface ScheduleItem {
  id: string;
  /** Местное время в формате "HH:MM". */
  time: string;
  title: string;
  place: Place;
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface WeddingConfig {
  couple: {
    groom: Person;
    bride: Person;
    /** Инициалы для монограммы. */
    monogram: [string, string];
  };
  event: {
    /** Начало свадебного дня в формате ISO 8601 со смещением часового пояса. */
    startsAt: string;
    /** IANA-идентификатор часового пояса места проведения. */
    timeZone: string;
    city: string;
  };
  venue: Place;
  schedule: ScheduleItem[];
  texts: {
    heroEyebrow: string;
    /** Короткая фраза первого экрана, по строке на элемент. */
    heroTagline: string[];
    heroCta: string;
    invitationTitle: string;
    invitationBody: string[];
  };
  gifts: {
    title: string;
    text: string;
  };
  dressCode: {
    text: string;
    colors: DressCodeColor[];
  };
  photos: {
    hero: Photo | null;
    gallery: Photo[];
  };
}
