import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import commonDetails from '../../data/commonProjectsDetails.json';
import '../../styles/project/HorizontalStrategy.scss';

interface CommonDetails {
  titleStrategyPlanning: string;
}

interface Props {
  projectDetails?: Record<string, string>;
  sectionId?: string;
}

const HorizontalStrategy = ({ projectDetails, sectionId }: Props) => {
  const { t, i18n } = useTranslation();
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const common: CommonDetails = (commonDetails as CommonDetails[])[0];
  const planKeys = ['plan-01', 'plan-02', 'plan-03', 'plan-04', 'plan-05'];
  const plans = planKeys
    .map((key) => ({ key, val: projectDetails?.[key] }))
    .filter(
      (p): p is { key: string; val: string } =>
        Boolean(p.val) && i18n.exists(p.val!)
    );

  useEffect(() => {
    if (!stageRef.current || plans.length === 0) return;
    const stage = stageRef.current;

    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) {
          setProgress(0);
          return;
        }
        const scrolled = -rect.top;
        const pct = Math.min(1, Math.max(0, scrolled / total));
        setProgress(pct);
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
  }, [plans.length]);

  if (plans.length === 0) return null;

  const slidePct = 100 / plans.length;
  const translatePct = progress * slidePct * (plans.length - 1);

  return (
    <section
      className='projects__strategy projects__strategy--horizontal section section--full'
      id={sectionId}
    >
      <div className='projects__container'>
        <h1 className='h1 section__title'>
          <span>04. </span>
          {t(common.titleStrategyPlanning)}
        </h1>
        {projectDetails?.['main-strategy'] &&
          i18n.exists(projectDetails['main-strategy']) && (
            <h3 className='h2 horizontal-strategy__lede'>
              {t(projectDetails['main-strategy'])}
            </h3>
          )}
      </div>

      <div
        ref={stageRef}
        className='horizontal-strategy__stage'
        style={{ height: `${plans.length * 100}vh` }}
      >
        <div className='horizontal-strategy__pin'>
          <div
            ref={trackRef}
            className='horizontal-strategy__track'
            style={{
              transform: `translate3d(-${translatePct}%, 0, 0)`,
              width: `${plans.length * 100}%`,
            }}
          >
            {plans.map((p, i) => {
              const isActive =
                Math.round(progress * (plans.length - 1)) === i;
              return (
                <article
                  key={p.key}
                  className={`horizontal-strategy__slide ${
                    isActive ? 'horizontal-strategy__slide--active' : ''
                  }`}
                  style={{ width: `${100 / plans.length}%` }}
                >
                  <div className='horizontal-strategy__card'>
                    <span className='horizontal-strategy__index'>
                      {String(i + 1).padStart(2, '0')}
                      <span> / {String(plans.length).padStart(2, '0')}</span>
                    </span>
                    <h3 className='h2 horizontal-strategy__title'>
                      {t(`${p.val}-title`)}
                    </h3>
                    <p className='horizontal-strategy__text'>{t(p.val)}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className='horizontal-strategy__progress'>
            <div
              className='horizontal-strategy__progress-fill'
              style={{ ['--fill' as string]: `${progress * 100}%` }}
            />
            <div className='horizontal-strategy__dots'>
              {plans.map((_, i) => {
                const active = Math.round(progress * (plans.length - 1)) === i;
                return (
                  <span
                    key={i}
                    className={`horizontal-strategy__dot ${
                      active ? 'horizontal-strategy__dot--active' : ''
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalStrategy;
