import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './ButtonLink.module.css';

type Variant = 'primary' | 'ghost';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
}

/** Ссылка, оформленная как кнопка: навигация по странице и внешние ссылки (карты и т. п.). */
export function ButtonLink({
  variant = 'primary',
  icon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return (
    <a className={classes} {...rest}>
      <span className={styles.label}>{children}</span>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </a>
  );
}

export function ArrowDownIcon() {
  return (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
      <path d="M6 1v13.5M1 9.5l5 5 5-5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
