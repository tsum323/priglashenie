import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { buildIcs, ICS_FILE_NAME } from './src/lib/ics.ts';

/**
 * Сайт публикуется на GitHub Pages по адресу вида
 * https://<user>.github.io/<repository-name>/, поэтому base не может быть "/".
 *
 * В GitHub Actions base задаётся через VITE_BASE_PATH из имени репозитория
 * (см. .github/workflows/deploy.yml). Локально используется значение
 * по умолчанию — имя текущего репозитория.
 */
const DEFAULT_BASE = '/priglashenie/';

function normalizeBase(value: string | undefined): string {
  if (!value) return DEFAULT_BASE;
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

/** Публикует файл события календаря рядом с сайтом — данные берутся из src/data/wedding.ts. */
function calendarFile(): Plugin {
  return {
    name: 'wedding-calendar-file',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.split('?')[0].endsWith(`/${ICS_FILE_NAME}`)) return next();
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.end(buildIcs());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: ICS_FILE_NAME, source: buildIcs() });
    },
  };
}

export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
  plugins: [react(), calendarFile()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
