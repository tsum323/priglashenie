import type { CSSProperties } from 'react';
import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import styles from './DressCode.module.css';

export function DressCode({ id }: { id: string }) {
  const { dressCode, sections } = wedding;

  return (
    <Section id={id} tone="surface">
      <SectionHeading sectionId={id} text={sections.dressCode} />
      <p className={styles.text} data-reveal>
        {dressCode.text}
      </p>
      <ul className={styles.palette} aria-label="Цвета дресс-кода" data-reveal>
        {dressCode.colors.map((color) => (
          <li key={color.hex} className={styles.color}>
            <span
              className={styles.swatch}
              style={{ '--swatch-color': color.hex } as CSSProperties}
              aria-hidden="true"
            />
            <span className={styles.name}>{color.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
