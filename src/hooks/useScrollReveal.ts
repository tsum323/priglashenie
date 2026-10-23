import { useEffect } from 'react';

const ROOT_CLASS = 'js-reveal';

/**
 * Плавное появление элементов с атрибутом data-reveal при прокрутке.
 * Скрытие включается только после запуска скрипта (класс js-reveal на <html>),
 * поэтому без JS или без IntersectionObserver контент остаётся видимым.
 */
export function useScrollReveal() {
  useEffect(() => {
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (!motionOk || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    root.classList.add(ROOT_CLASS);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove(ROOT_CLASS);
    };
  }, []);
}
