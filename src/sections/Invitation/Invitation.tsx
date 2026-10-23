import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import styles from './Invitation.module.css';

export function Invitation({ id }: { id: string }) {
  const { texts, sections, couple } = wedding;

  return (
    <Section id={id}>
      <SectionHeading sectionId={id} text={sections.invitation} />
      <div className={styles.body} data-reveal>
        {texts.invitationBody.map((paragraph) => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
        <p className={styles.signature}>
          <span className={styles.signatureLead}>{texts.invitationSignature}</span>
          <span className={styles.signatureNames}>
            {couple.groom.firstName} <span aria-hidden="true">&amp;</span>
            <span className="visually-hidden">и</span> {couple.bride.firstName}
          </span>
        </p>
      </div>
    </Section>
  );
}
