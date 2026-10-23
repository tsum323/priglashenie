import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import { assetUrl } from '../../lib/asset';
import styles from './Gallery.module.css';

/** Раздел появляется автоматически, как только в конфигурации есть фотографии. */
export function Gallery({ id }: { id: string }) {
  const { photos, sections } = wedding;
  if (photos.gallery.length === 0) return null;

  return (
    <Section id={id}>
      <SectionHeading sectionId={id} text={sections.gallery} />
      <ul className={styles.grid}>
        {photos.gallery.map((photo) => (
          <li key={photo.src} className={styles.item} data-reveal>
            <img
              className={styles.image}
              src={assetUrl(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              style={photo.focalPoint ? { objectPosition: photo.focalPoint } : undefined}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
