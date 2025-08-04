import '../styles/pages/Home.scss';
import { useTranslation } from 'react-i18next';
import rightOlive from '../assets/images/hero-right-olive.png';
import leftOlive from '../assets/images/hero-left-olive.png';
import projects from '../data/projects.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className='container home'>
      <section className='hero-container'>
        <h1 className='h1'>{t('hero-welcome.welcome-message')}</h1>
        <div className='hero-profileBox'>
          <img
            src={'/images/profile.png'}
            alt='Profile Image off Anna'
            className='profileImage'
            loading='lazy'
            width={300}
            height={300}
          />
          <h3 className='h3'>{t('hero-welcome.welcome-description')}</h3>
        </div>
      </section>

      <section className='hero-images'>
        <div className='hero-right-olive'>
          <img src={rightOlive} alt='Olive leaf' />
        </div>
        <div className='hero-left-olive'>
          <img src={leftOlive} alt='Olive leaf' />
        </div>
        <div className='steve-jobs-quote'>
          <h5 className='h5'>
            „{t('hero-welcome.hero-quote')}”
            <br />
            {t('hero-welcome.hero-quote-writer')}
          </h5>
        </div>
      </section>

      <section className='container work-container'>
        <h2 className='h2'>{t('hero-work.title')}</h2>

        <div className='projects-box'>
          {projects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className='project-card'
            >
              <h3 className='h3'>{t(project.titleKey)}</h3>
              <span>{project.year}</span>
              <img src={project.image} alt={t(project.titleKey)} />
              <p className='p'>{t(project.descriptionKey)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
