import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../lib/hooks';

interface RevealProps {
  readonly as?: ElementType;
  readonly delay?: number;
  readonly className?: string;
  readonly 'aria-label'?: string;
  readonly children: ReactNode;
}

/** Fades its content up once it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }: RevealProps) {
  const [ref, visible] = useInView<HTMLElement>(0.15);
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
