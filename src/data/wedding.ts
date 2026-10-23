import type { Place, WeddingConfig } from './types';

const venue: Place = {
  name: 'Екатерининский зал',
  address: 'Краснодар, Офицерская улица, 47',
};

/**
 * Единственный источник данных о свадьбе.
 * Пометка «уточнить» — данные, которые нужно подтвердить у молодожёнов.
 */
export const wedding: WeddingConfig = {
  couple: {
    groom: { firstName: 'Даниил' },
    bride: { firstName: 'Валерия' },
    monogram: ['Д', 'В'],
  },

  event: {
    startsAt: '2026-12-08T11:00:00+03:00',
    // В базе IANA нет отдельного пояса для Краснодара: он живёт по московскому времени (UTC+3).
    timeZone: 'Europe/Moscow',
    city: 'Краснодар',
  },

  venue,

  schedule: [
    {
      id: 'ceremony',
      time: '11:00',
      title: 'Роспись',
      // уточнить: какой именно ЗАГС и его адрес
      place: { name: 'ЗАГС', address: null },
    },
    {
      id: 'photos',
      time: '12:00',
      title: 'Фотосессия',
      // уточнить: место встречи в парке
      place: { name: 'Парк Галицкого', address: null },
    },
    {
      id: 'banquet',
      time: '15:00',
      title: 'Банкет',
      place: venue,
    },
  ],

  texts: {
    heroEyebrow: 'Приглашение на свадьбу',
    heroTagline: ['Один зимний день.', 'Одна история на двоих.', 'Начало нашей семьи.'],
    heroCta: 'Открыть приглашение',
    invitationTitle: 'Дорогие родные и друзья',
    // уточнить: финальный текст приглашения
    invitationBody: [
      'Мы решили стать семьёй и очень хотим, чтобы в этот день рядом были самые близкие люди.',
      'Будем счастливы разделить с вами радость, тёплые слова и первый праздник нашей семьи.',
    ],
  },

  // уточнить: пожелания по подаркам
  gifts: {
    title: 'Пожелания',
    text: 'Самый ценный подарок для нас — ваше присутствие. Если захотите порадовать нас чем-то ещё, будем благодарны за вклад в бюджет молодой семьи.',
  },

  // уточнить: палитру дресс-кода
  dressCode: {
    text: 'Будем рады, если в своих образах вы поддержите спокойную тёплую палитру нашего дня.',
    colors: [
      { name: 'Молочный', hex: '#F3ECE1' },
      { name: 'Песочный', hex: '#D9C6AA' },
      { name: 'Карамельный', hex: '#A48760' },
      { name: 'Оливковый', hex: '#7C7A5A' },
      { name: 'Шоколадный', hex: '#4E3B30' },
    ],
  },

  photos: {
    // Пример: { src: 'photos/hero.webp', alt: 'Даниил и Валерия', width: 1600, height: 2000 }
    hero: null,
    gallery: [],
  },
};

export const coupleNames = `${wedding.couple.groom.firstName} и ${wedding.couple.bride.firstName}`;
