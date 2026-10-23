import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Сайт публикуется на GitHub Pages по адресу вида
 * https://<user>.github.io/<repository-name>/, поэтому base не может быть "/".
 *
 * В GitHub Actions base задаётся через VITE_BASE_PATH из имени репозитория
 * (см. .github/workflows/deploy.yml). Локально используется значение
 * по умолчанию — имя текущего репозитория.
 */
const DEFAULT_BASE = '/-/';

function normalizeBase(value: string | undefined): string {
  if (!value) return DEFAULT_BASE;
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
