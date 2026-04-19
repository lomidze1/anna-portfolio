import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectCard = target.closest('.project-card, .showcase-card');
      const interactive = target.closest(
        'a:not(.project-card), button, [role="button"], input, textarea, select, .lang-btn'
      );

      if (projectCard) {
        setIsHovering(true);
        setCursorLabel('View');
      } else if (interactive) {
        setIsHovering(true);
        setCursorLabel('');
      } else {
        setIsHovering(false);
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      const lerp = 0.12;
      circlePos.current.x +=
        (mousePos.current.x - circlePos.current.x) * lerp;
      circlePos.current.y +=
        (mousePos.current.y - circlePos.current.y) * lerp;

      if (circleRef.current) {
        const size = isHovering ? 50 : 36;
        circleRef.current.style.transform = `translate(${circlePos.current.x - size / 2}px, ${circlePos.current.y - size / 2}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className='custom-cursor__dot'
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={circleRef}
        className={`custom-cursor__circle ${isHovering ? 'custom-cursor__circle--hover' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {cursorLabel && (
          <span className='custom-cursor__label'>{cursorLabel}</span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
