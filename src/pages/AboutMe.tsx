import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import SplitText from '../components/animations/SplitText';
import PageTransition from '../components/animations/PageTransition';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import '../styles/pages/AboutMe.scss';

const FloatingShape = lazy(
  () => import('../components/animations/FloatingShape')
);

const skills = [
  'Figma',
  'Sketch',
  'Adobe XD',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Blender',
  'After Effects',
  'Principle',
];

const AboutMe = () => {
  const { t } = useTranslation();
  const capability = useDeviceCapability();

  return (
    <PageTransition>
      <section className='about'>
        {capability === 'high' && (
          <Suspense fallback={null}>
            <FloatingShape />
          </Suspense>
        )}

        <div className='about__hero'>
          <RevealOnScroll variant='scale-up' duration={900}>
            <img
              src='/images/profile.jpg'
              alt='Anna Lomidze'
              className='about__hero-image'
            />
          </RevealOnScroll>
          <SplitText
            text={t('aboutMe.name', 'Anna Lomidze')}
            as='h1'
            className='about__name'
            splitBy='char'
            staggerDelay={40}
            initialDelay={400}
            animation='slide-up'
          />
          <SplitText
            text={t('aboutMe.role', 'UI/UX Designer')}
            as='p'
            className='about__role'
            splitBy='char'
            staggerDelay={25}
            initialDelay={700}
            animation='blur-in'
          />
        </div>

        <div className='about__content'>
          <RevealOnScroll variant='slide-right'>
            <div className='about__section'>
              <h2>{t('aboutMe.section-background', 'Background')}</h2>
              <p>{t('aboutMe.p1')}</p>
              <p>{t('aboutMe.p2')}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant='slide-left'>
            <div className='about__section'>
              <h2>{t('aboutMe.section-philosophy', 'Philosophy')}</h2>
              <p>{t('aboutMe.p3')}</p>
              <p>{t('aboutMe.p4')}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant='fade-up'>
            <div className='about__section'>
              <h2>{t('aboutMe.section-approach', 'My Approach')}</h2>
              <p>{t('aboutMe.p5')}</p>
              <p>{t('aboutMe.p6')}</p>
              <p>{t('aboutMe.p7')}</p>
              <p>{t('aboutMe.p8')}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant='blur-in'>
            <div className='about__skills'>
              <h2>{t('aboutMe.section-skills', 'Tools & Skills')}</h2>
              <div className='about__skills-grid'>
                {skills.map((skill, i) => (
                  <RevealOnScroll key={skill} variant='scale-up' delay={i * 80}>
                    <span className='about__skill-badge'>{skill}</span>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutMe;
