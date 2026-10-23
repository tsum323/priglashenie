import type { CSSProperties } from 'react';
import { ArrowDownIcon, ButtonLink } from '../../components/ButtonLink/ButtonLink';
import { Portrait } from '../../components/Portrait/Portrait';
import { wedding } from '../../data/wedding';
import { eventDate } from '../../lib/date';
import styles from './Hero.module.css';

interface HeroProps {
  /** id секции, к которой ведёт кнопка. */
  nextSectionId: string;
}

const order = (n: number) => ({ '--reveal-order': n }) as CSSProperties;

export function Hero({ nextSectionId }: HeroProps) {
  const { couple, event, texts, photos } = wedding;

  return (
    <section className={styles.hero} data-tone="default" aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <p className={`eyebrow reveal ${styles.eyebrow}`} style={order(1)}>
            {texts.heroEyebrow}
          </p>

          <h1 id="hero-title" className={styles.names}>
            <span className={`reveal ${styles.name}`} style={order(2)}>
              {couple.groom.firstName}
            </span>
            <span className={`reveal ${styles.amp}`} style={order(3)}>
              <span aria-hidden="true">&amp;</span>
              <span className="visually-hidden"> и </span>
            </span>
            <span className={`reveal ${styles.name} ${styles.nameSecond}`} style={order(4)}>
              {couple.bride.firstName}
            </span>
          </h1>

          <div className={`reveal ${styles.dateline}`} style={order(5)}>
            <span className={styles.rule} aria-hidden="true" />
            <p className={styles.date}>
              <time dateTime={eventDate.iso}>{eventDate.long}</time>
            </p>
            <p className={styles.meta}>
              <span>{eventDate.weekday}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{eventDate.time}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{event.city}</span>
            </p>
          </div>

          <p className={`reveal ${styles.tagline}`} style={order(6)}>
            {texts.heroTagline.map((line) => (
              <span key={line} className={styles.taglineLine}>
                {line}
              </span>
            ))}
          </p>

          <div className={`reveal ${styles.actions}`} style={order(7)}>
            <ButtonLink href={`#${nextSectionId}`} icon={<ArrowDownIcon />}>
              {texts.heroCta}
            </ButtonLink>
          </div>
        </div>

        <div className={`reveal ${styles.visual}`} style={order(4)}>
          <Portrait
            photo={photos.hero}
            monogram={couple.monogram}
            caption={`${event.city} · ${eventDate.numeric}`}
            priority
          />
        </div>
      </div>
    </section>
  );
}
