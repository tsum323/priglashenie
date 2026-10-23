import type { Photo } from '../../data/types';
import { assetUrl } from '../../lib/asset';
import styles from './Portrait.module.css';

interface PortraitProps {
  photo: Photo | null;
  /** Инициалы для типографической заглушки, пока фотографии нет. */
  monogram: [string, string];
  caption?: string;
  className?: string;
  /** Главное изображение первого экрана загружается без lazy-loading. */
  priority?: boolean;
}

/**
 * Арочная рамка под фотографию пары. Без фотографии показывает намеренную
 * типографическую композицию; при появлении фото в конфигурации заменяется
 * на него без изменения разметки секций.
 */
export function Portrait({ photo, monogram, caption, className, priority = false }: PortraitProps) {
  const [first, second] = monogram;

  return (
    <figure className={[styles.portrait, className].filter(Boolean).join(' ')}>
      <div className={styles.frame}>
        {photo ? (
          <img
            className={styles.image}
            src={assetUrl(photo.src)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            style={photo.focalPoint ? { objectPosition: photo.focalPoint } : undefined}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <span className={styles.letter}>{first}</span>
            <span className={styles.stem} />
            <span className={`${styles.letter} ${styles.letterSecond}`}>{second}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
