import { ButtonLink } from '../../components/ButtonLink/ButtonLink';
import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import { useCountdown } from '../../hooks/useCountdown';
import { googleCalendarHref, icsHref } from '../../lib/calendar';
import { capitalize, eventDate, plural } from '../../lib/date';
import styles from './Countdown.module.css';

type Forms = [string, string, string];

const UNITS: { key: 'days' | 'hours' | 'minutes' | 'seconds'; forms: Forms }[] = [
  { key: 'days', forms: ['день', 'дня', 'дней'] },
  { key: 'hours', forms: ['час', 'часа', 'часов'] },
  { key: 'minutes', forms: ['минута', 'минуты', 'минут'] },
  { key: 'seconds', forms: ['секунда', 'секунды', 'секунд'] },
];

export function Countdown({ id }: { id: string }) {
  const { event, texts, sections } = wedding;
  const parts = useCountdown(event.startsAt);
  const pad = (n: number) => String(n).padStart(2, '0');

  // Для экранных дикторов — спокойная фраза без ежесекундных изменений.
  const summary = `До свадьбы ${parts.days} ${plural(parts.days, UNITS[0].forms)} ${parts.hours} ${plural(parts.hours, UNITS[1].forms)}`;

  return (
    <Section id={id} tone="surface">
      <SectionHeading
        sectionId={id}
        text={
          parts.isOver
            ? { ...sections.countdown, title: texts.countdownAfterTitle }
            : sections.countdown
        }
      />

      {parts.isOver ? (
        <p className={styles.after} data-reveal>
          {texts.countdownAfter}
        </p>
      ) : (
        <>
          <p className="visually-hidden">{summary}</p>
          <ol className={styles.units} aria-hidden="true" data-reveal>
            {UNITS.map(({ key, forms }) => (
              <li key={key} className={styles.unit}>
                <span className={styles.value}>
                  {key === 'days' ? parts[key] : pad(parts[key])}
                </span>
                <span className={styles.label}>{plural(parts[key], forms)}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      <div className={styles.footer} data-reveal>
        <p className={styles.date}>
          <time dateTime={eventDate.iso}>
            {capitalize(eventDate.weekday)}, {eventDate.long}
          </time>
          <span className={styles.dot} aria-hidden="true" />
          <span>начало в {eventDate.time}</span>
        </p>
        <div className={styles.actions}>
          <ButtonLink variant="ghost" href={icsHref()}>
            Добавить в календарь
          </ButtonLink>
          <ButtonLink
            variant="ghost"
            href={googleCalendarHref()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Календарь
            <span className="visually-hidden"> (откроется в новой вкладке)</span>
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
