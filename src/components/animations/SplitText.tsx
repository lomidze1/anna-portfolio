import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitBy?: 'char' | 'word';
  staggerDelay?: number;
  initialDelay?: number;
  animation?: 'fade-up' | 'fade-down' | 'blur-in' | 'slide-up';
}

const SplitText = ({
  text,
  className = '',
  as: Tag = 'h1',
  splitBy = 'char',
  staggerDelay = 30,
  initialDelay = 0,
  animation = 'fade-up',
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const units = splitBy === 'char' ? text.split('') : text.split(' ');

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`split-text ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className={`split-text__unit split-text--${animation} ${isVisible ? 'split-text--visible' : ''}`}
          style={{
            transitionDelay: `${initialDelay + i * staggerDelay}ms`,
          }}
          aria-hidden='true'
        >
          {unit === ' ' ? '\u00A0' : unit}
          {splitBy === 'word' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
