import { useEffect, useRef, useState } from 'react';

type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-up'
  | 'clip-up'
  | 'blur-in'
  | 'rotate-in';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  threshold?: number;
  duration?: number;
  immediate?: boolean;
}

const RevealOnScroll = ({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  threshold = 0.15,
  duration,
  immediate = false,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    if (immediate) {
      const timer = setTimeout(() => setIsRevealed(true), 10);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, immediate]);

  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
    ...(duration ? { transitionDuration: `${duration}ms` } : {}),
  };

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${isRevealed ? 'revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
