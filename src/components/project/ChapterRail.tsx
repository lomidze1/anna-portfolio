import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/project/ChapterRail.scss';

interface Chapter {
  id: string;
  labelKey: string;
}

interface ChapterRailProps {
  projectTitleKey: string;
  chapters: Chapter[];
}

const ChapterRail = ({ projectTitleKey, chapters }: ChapterRailProps) => {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = chapters.findIndex((c) => c.id === entry.target.id);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const first = document.getElementById(chapters[0].id);
        const last = document.getElementById(chapters[chapters.length - 1].id);
        if (!first || !last) return;
        const startY = first.getBoundingClientRect().top + window.scrollY;
        const endY =
          last.getBoundingClientRect().top +
          window.scrollY +
          last.offsetHeight;
        const total = endY - startY;
        const scrolled = window.scrollY + window.innerHeight * 0.5 - startY;
        const pct = Math.min(1, Math.max(0, scrolled / total));
        setProgress(pct);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [chapters]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside
      className='chapter-rail'
      ref={railRef}
      aria-label='Project sections'
    >
      <div className='chapter-rail__project'>{t(projectTitleKey)}</div>
      <div className='chapter-rail__track'>
        <div
          className='chapter-rail__fill'
          style={{ height: `${progress * 100}%` }}
        />
        <ol className='chapter-rail__list'>
          {chapters.map((c, i) => (
            <li
              key={c.id}
              className={`chapter-rail__item ${
                i === activeIdx ? 'chapter-rail__item--active' : ''
              } ${i < activeIdx ? 'chapter-rail__item--done' : ''}`}
            >
              <button
                type='button'
                className='chapter-rail__button'
                onClick={() => scrollTo(c.id)}
              >
                <span className='chapter-rail__dot' aria-hidden='true' />
                <span className='chapter-rail__index'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='chapter-rail__label'>{t(c.labelKey)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

export default ChapterRail;
