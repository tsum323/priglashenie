import type { SectionText } from '../../data/types';
import { Ornament } from '../Ornament/Ornament';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  /** id раздела; заголовок получает id `${sectionId}-title`. */
  sectionId: string;
  text: SectionText;
  align?: 'center' | 'start';
  ornament?: boolean;
}

export function SectionHeading({
  sectionId,
  text,
  align = 'center',
  ornament = true,
}: SectionHeadingProps) {
  return (
    <header className={`${styles.heading} ${styles[align]}`} data-reveal>
      <p className="eyebrow">{text.eyebrow}</p>
      <h2 id={`${sectionId}-title`} className={styles.title}>
        {text.title}
      </h2>
      {ornament && <Ornament className={styles.ornament} />}
    </header>
  );
}
