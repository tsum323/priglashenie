import { ButtonLink } from '../../components/ButtonLink/ButtonLink';
import { Ornament } from '../../components/Ornament/Ornament';
import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import { scheduleTimeIso } from '../../lib/date';
import { mapUrl } from '../../lib/maps';
import { keepLastWord } from '../../lib/typography';
import styles from './Venue.module.css';

export function Venue({ id }: { id: string }) {
  const { venue, schedule, sections } = wedding;
  const venueItem = schedule.find((item) => item.place === venue);

  return (
    <Section id={id}>
      <SectionHeading sectionId={id} text={sections.venue} ornament={false} />
      <div className={styles.plate} data-reveal>
        <div className={styles.inner}>
          {venueItem && (
            <p className={styles.when}>
              {venueItem.title} ·{' '}
              <time dateTime={scheduleTimeIso(venueItem.time)}>{venueItem.time}</time>
            </p>
          )}
          <h3 className={styles.name}>{venue.name}</h3>
          <Ornament />
          {venue.address && (
            <>
              <address className={styles.address}>{keepLastWord(venue.address)}</address>
              <ButtonLink href={mapUrl(venue.address)} target="_blank" rel="noopener noreferrer">
                Открыть на карте
                <span className="visually-hidden"> (Яндекс Карты, новая вкладка)</span>
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
