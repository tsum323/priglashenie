import { wedding } from '../../data/wedding';
import { eventDate } from '../../lib/date';
import styles from './Masthead.module.css';

/** Шапка в духе журнального выпуска: монограмма, город, дата. */
export function Masthead() {
  const [first, second] = wedding.couple.monogram;

  return (
    <header className={`container ${styles.masthead}`}>
      <a className={styles.monogram} href="#top" aria-label="В начало страницы">
        <span aria-hidden="true">
          {first}
          <span className={styles.amp}>&amp;</span>
          {second}
        </span>
      </a>
      <p className={styles.city}>{wedding.event.city}</p>
      <p className={styles.issue}>
        <time dateTime={eventDate.iso}>{eventDate.numeric}</time>
      </p>
    </header>
  );
}
