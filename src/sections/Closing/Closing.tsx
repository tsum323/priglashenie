import { Section } from '../../components/Section/Section';
import { wedding } from '../../data/wedding';
import { eventDate } from '../../lib/date';
import styles from './Closing.module.css';

/** Финал страницы — тёмная «задняя обложка». */
export function Closing({ id }: { id: string }) {
  const { texts, couple, event } = wedding;
  const [first, second] = couple.monogram;

  return (
    <Section id={id} tone="inverse" as="footer" className={styles.closing}>
      <div className={styles.inner} data-reveal>
        <p className={styles.monogram} aria-hidden="true">
          {first}
          <span className={styles.amp}>&amp;</span>
          {second}
        </p>
        <h2 id={`${id}-title`} className={styles.title}>
          {texts.closingTitle}{' '}
          <span className={styles.titleDate}>
            <time dateTime={eventDate.iso}>{eventDate.long}</time>
          </span>
        </h2>
        <p className={styles.text}>{texts.closingText}</p>
      </div>

      <div className={styles.bottom}>
        <p>
          {couple.groom.firstName} <span aria-hidden="true">&amp;</span>
          <span className="visually-hidden">и</span> {couple.bride.firstName} · {event.city}
        </p>
        <a className={styles.top} href="#top">
          Наверх
        </a>
      </div>
    </Section>
  );
}
