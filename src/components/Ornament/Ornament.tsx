import styles from './Ornament.module.css';

/** Тонкая линия с ромбом — общий разделитель разделов. */
export function Ornament({ className }: { className?: string }) {
  return (
    <span className={[styles.ornament, className].filter(Boolean).join(' ')} aria-hidden="true" />
  );
}
