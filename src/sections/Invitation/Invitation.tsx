import { wedding } from '../../data/wedding';
import styles from './Invitation.module.css';

interface InvitationProps {
  id: string;
}

/**
 * Предварительная версия раздела приглашения — цель кнопки первого экрана.
 * Полная реализация (таймер, программа, место, дресс-код, пожелания) — задание 2.
 */
export function Invitation({ id }: InvitationProps) {
  const { texts } = wedding;

  return (
    <section id={id} className={styles.invitation} aria-labelledby={`${id}-title`} tabIndex={-1}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Приглашение</p>
        <h2 id={`${id}-title`} className={styles.title}>
          {texts.invitationTitle}
        </h2>
        <span className={styles.ornament} aria-hidden="true" />
        {texts.invitationBody.map((paragraph) => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
