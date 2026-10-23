# Даниил & Валерия — свадебное приглашение

Одностраничный сайт-приглашение: 8 декабря 2026, Краснодар.
Vite + React + TypeScript, CSS Modules, без серверной части.

## Команды

```bash
npm install       # установка зависимостей
npm run dev       # локальная разработка: http://localhost:5173/-/
npm run build     # проверка типов и production-сборка в dist/
npm run preview   # просмотр собранной версии: http://localhost:4173/-/
```

## Структура

```
src/
  data/        wedding.ts — все данные мероприятия; types.ts — их типы
  styles/      tokens.css — дизайн-система; base.css — сброс, типографика, утилиты
  lib/         date.ts — форматирование даты; asset.ts — пути с учётом base path
  components/  переиспользуемые элементы (ButtonLink, Portrait, Masthead)
  sections/    разделы страницы (Hero, Invitation)
public/
  photos/      фотографии пары (подключаются через src/data/wedding.ts)
```

Тексты, даты, адреса, программа, дресс-код и фотографии меняются только в
`src/data/wedding.ts`. Цвета, шрифты, отступы и анимации — только в `src/styles/tokens.css`.

## Фотографии

1. Положите файл в `public/photos/`, например `hero.webp`.
2. В `src/data/wedding.ts` укажите:
   `hero: { src: 'photos/hero.webp', alt: 'Даниил и Валерия', width: 1600, height: 2000 }`.

Арка первого экрана сама заменит типографическую заглушку на фотографию.

## Публикация на GitHub Pages

1. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Слейте изменения в `main` — workflow `.github/workflows/deploy.yml` соберёт и опубликует сайт.

Base path берётся из имени репозитория автоматически (`/<repository-name>/`).
Для локальной сборки под другой путь: `VITE_BASE_PATH=/my-repo/ npm run build`.
