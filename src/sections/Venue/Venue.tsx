import { ButtonLink } from '../../components/ButtonLink/ButtonLink';
import { Ornament } from '../../components/Ornament/Ornament';
import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import { scheduleTimeIso } from '../../lib/date';
import { mapUrl } from '../../lib/maps';
import { assetUrl } from '../../lib/asset';
import { keepLastWord } from '../../lib/typography';
import styles from './Venue.module.css';

/** Площадки с известным адресом — по одной «табличке» на каждый пункт программы. */
export function Venue({ id }: { id: string }) {
  const { schedule, sections } = wedding;
  const places = schedule.filter((item) => item.place.address);

  return (
    <Section id={id}>
      <SectionHeading sectionId={id} text={sections.venue} ornament={false} />
      <ul className={styles.list}>
        {places.map((item) => (
          <li key={item.id} className={styles.plate} data-reveal>
            <div className={styles.inner}>
              {item.place.photos && item.place.photos.length > 0 && (
                <div className={styles.photos} data-count={item.place.photos.length}>
                  {item.place.photos.map((photo) => (
                    <img
                      key={photo.src}
                      className={styles.photo}
                      src={assetUrl(photo.src)}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      style={photo.focalPoint ? { objectPosition: photo.focalPoint } : undefined}
                    />
                  ))}
                </div>
              )}
              <p className={styles.when}>
                {item.title} · <time dateTime={scheduleTimeIso(item.time)}>{item.time}</time>
              </p>
              <h3 className={styles.name}>{item.place.name}</h3>
              <Ornament />
              {item.place.address && (
                <>
                  <address className={styles.address}>{keepLastWord(item.place.address)}</address>
                  <ButtonLink
                    href={mapUrl(item.place.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Открыть на карте
                    <span className="visually-hidden">
                      {' '}
                      — {item.place.name} (Яндекс Карты, новая вкладка)
                    </span>
                  </ButtonLink>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
