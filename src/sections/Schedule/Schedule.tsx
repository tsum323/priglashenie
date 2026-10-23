import type { CSSProperties } from 'react';
import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import { eventEnd, scheduleTimeIso } from '../../lib/date';
import { mapUrl } from '../../lib/maps';
import { keepLastWord } from '../../lib/typography';
import styles from './Schedule.module.css';

export function Schedule({ id }: { id: string }) {
  const { schedule, sections, texts } = wedding;

  return (
    <Section id={id}>
      <SectionHeading sectionId={id} text={sections.schedule} />
      <ol className={styles.timeline}>
        {schedule.map((item, index) => (
          <li
            key={item.id}
            className={styles.item}
            data-reveal
            style={{ '--reveal-order': index } as CSSProperties}
          >
            <time className={styles.time} dateTime={scheduleTimeIso(item.time)}>
              {item.time}
            </time>
            <span className={styles.marker} aria-hidden="true" />
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.place}>{item.place.name}</p>
              {item.note && <p className={styles.note}>{item.note}</p>}
              {index === schedule.length - 1 && (
                <p className={styles.until}>
                  {texts.scheduleUntil} <time dateTime={eventEnd.iso}>{eventEnd.time}</time>
                </p>
              )}
              {item.place.address && (
                <a
                  className={styles.link}
                  href={mapUrl(item.place.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {keepLastWord(item.place.address)}
                  <span className="visually-hidden"> — открыть на карте в новой вкладке</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
