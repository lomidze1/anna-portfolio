import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/project/BeforeAfterReveal.scss';

interface Props {
  before: string;
  after: string;
  beforeLabelKey?: string;
  afterLabelKey?: string;
}

const BeforeAfterReveal = ({
  before,
  after,
  beforeLabelKey = 'projects.before',
  afterLabelKey = 'projects.after',
}: Props) => {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(50);
  const revealRef = useRef(50);
  const draggingRef = useRef(false);
  const manualRef = useRef(false);
  const rafRef = useRef(0);
  const pendingXRef = useRef<number | null>(null);

  const applyReveal = (pct: number) => {
    const clamped = Math.min(100, Math.max(0, pct));
    revealRef.current = clamped;
    const el = rootRef.current;
    if (el) el.style.setProperty('--reveal', `${clamped}%`);
    const div = el?.querySelector('.before-after__divider') as HTMLElement | null;
    if (div) div.setAttribute('aria-valuenow', String(Math.round(clamped)));
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (manualRef.current) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const scrolled = vh - rect.top;
        const pct = Math.min(0.92, Math.max(0.08, scrolled / total));
        setReveal(pct * 100);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const flushPending = () => {
    rafRef.current = 0;
    const x = pendingXRef.current;
    if (x == null) return;
    pendingXRef.current = null;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    applyReveal(((x - rect.left) / rect.width) * 100);
  };

  const scheduleFromPointer = (clientX: number) => {
    pendingXRef.current = clientX;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(flushPending);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    manualRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    scheduleFromPointer(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    scheduleFromPointer(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      flushPending();
    }
    setReveal(revealRef.current);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    manualRef.current = true;
    const step = (delta: number) => {
      applyReveal(revealRef.current + delta);
      setReveal(revealRef.current);
    };
    if (e.key === 'ArrowLeft') step(-5);
    if (e.key === 'ArrowRight') step(5);
    if (e.key === 'Home') { applyReveal(0); setReveal(0); }
    if (e.key === 'End') { applyReveal(100); setReveal(100); }
  };

  const beforeLabel = i18n.exists(beforeLabelKey) ? t(beforeLabelKey) : 'Before';
  const afterLabel = i18n.exists(afterLabelKey) ? t(afterLabelKey) : 'After';

  return (
    <div
      ref={rootRef}
      className='before-after'
      style={{ ['--reveal' as string]: `${reveal}%` }}
    >
      <div
        ref={stageRef}
        className='before-after__stage'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={before}
          alt={beforeLabel}
          className='before-after__img before-after__img--before'
          loading='lazy'
          draggable={false}
        />
        <div className='before-after__after-wrap' aria-hidden='true'>
          <img
            src={after}
            alt={afterLabel}
            className='before-after__img before-after__img--after'
            loading='lazy'
            draggable={false}
          />
        </div>

        <div
          className='before-after__divider'
          role='slider'
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(reveal)}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <span className='before-after__divider-line' />
          <span className='before-after__divider-handle'>
            <svg
              viewBox='0 0 24 24'
              width='16'
              height='16'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M9 6l-6 6 6 6V6zm6 0v12l6-6-6-6z' />
            </svg>
          </span>
        </div>

        <span className='before-after__chip before-after__chip--before'>
          {beforeLabel}
        </span>
        <span className='before-after__chip before-after__chip--after'>
          {afterLabel}
        </span>
      </div>
      <p className='before-after__hint'>
        ← → {i18n.exists('projects.drag-hint') ? t('projects.drag-hint') : 'გადაიტანეთ შედარებისთვის'}
      </p>
    </div>
  );
};

export default BeforeAfterReveal;
