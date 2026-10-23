import type { ReactNode } from 'react';
import styles from './Section.module.css';

export type SectionTone = 'default' | 'surface' | 'inverse';

interface SectionProps {
  id: string;
  tone?: SectionTone;
  /** Секция подписана своим заголовком с id `${id}-title`. */
  children: ReactNode;
  className?: string;
  as?: 'section' | 'footer';
}

/** Обёртка раздела: отступы, тон и связь с заголовком для экранных дикторов. */
export function Section({
  id,
  tone = 'default',
  children,
  className,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div className="container">{children}</div>
    </Tag>
  );
}
