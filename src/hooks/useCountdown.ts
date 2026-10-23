import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

function partsUntil(target: number): CountdownParts {
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isOver: diff === 0,
  };
}

/** Обратный отсчёт до момента iso; останавливается, когда время вышло. */
export function useCountdown(iso: string): CountdownParts {
  const target = new Date(iso).getTime();
  const [parts, setParts] = useState(() => partsUntil(target));

  useEffect(() => {
    if (parts.isOver) return;
    const id = window.setInterval(() => {
      const next = partsUntil(target);
      setParts(next);
      if (next.isOver) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target, parts.isOver]);

  return parts;
}
