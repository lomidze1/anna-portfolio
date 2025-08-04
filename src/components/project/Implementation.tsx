import React from 'react';
import { useTranslation } from 'react-i18next';
import commonDetails from '../../data/commonProjectsDetails.json';
import Slider from '../Slider';
import '../../styles/project/Implementation.scss';

interface CommonDetails {
  titleSolutionImplementation: string;
}

interface ImplementationProps {
  project: {
    projectDetails?: Record<string, string>;
    images: {
      [key: string]: string | string[];
    };
    id: string;
  };
}

const Implementation: React.FC<ImplementationProps> = ({ project }) => {
  const { t, i18n } = useTranslation();
  const common: CommonDetails = (commonDetails as CommonDetails[])[0];

  // პროექტის დეტალები
  const details = project.projectDetails ?? {};
  const implKey = 'solution-implementation';
  const hasImpl = Boolean(details[implKey]) && i18n.exists(details[implKey]!);

  // Hero სურათები
  const images = project.images ?? {};
  const heroImages = Array.isArray(images.slider) ? images.slider : [];

  return (
    <section className='projects__solution-implementation section section--half'>
      <div className='projects__container'>
        <h1 className='h1 section__title'>
          <span>05. </span>
          {t(common.titleSolutionImplementation)}
        </h1>
        <div className='projects__content'>
          {hasImpl && (
            <h3 className='h3 implementation__text'>{t(details[implKey]!)}</h3>
          )}
          {heroImages.length > 0 ? (
            <div className='slider-container'>
              <Slider images={heroImages} />
            </div>
          ) : (
            <div className='slider-missing text-muted'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M21 19V5H3v14h18zm0-16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h18zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' />
              </svg>
              <h2 className='error-message'>
                ამ პროექტისთვის სლაიდერის ფოტოები დროებით მიუწვდომელია
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Implementation;
