import { useTranslation } from 'react-i18next';
import '../styles/pages/AboutMe.scss';

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className='container about-me-container'>
        <div className='about-me'>
          <p>{t('aboutMe.p1')}</p>
          <p>{t('aboutMe.p2')}</p>
          <p>{t('aboutMe.p3')}</p>
          <p>{t('aboutMe.p4')}</p>
          <p>{t('aboutMe.p5')}</p>
          <p>{t('aboutMe.p6')}</p>
          <p>{t('aboutMe.p7')}</p>
          <p>{t('aboutMe.p8')}</p>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
