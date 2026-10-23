import { Section } from '../../components/Section/Section';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { wedding } from '../../data/wedding';
import styles from './Gifts.module.css';

export function Gifts({ id }: { id: string }) {
  const { gifts, sections } = wedding;
  const [lead, ...rest] = gifts.text;

  return (
    <Section id={id}>
      <SectionHeading sectionId={id} text={sections.gifts} />
      <div className={styles.body} data-reveal>
        <p className={styles.lead}>{lead}</p>
        {rest.map((paragraph) => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
