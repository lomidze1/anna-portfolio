import React from 'react';
import { useTranslation } from 'react-i18next';
import commonDetails from '../../data/commonProjectsDetails.json';
import '../../styles/project/Challenge.scss';

interface CommonDetails {
  titleChallenge: string;
}

interface ChallengeProps {
  projectDetails?: Record<string, string>;
}

const Challenge: React.FC<ChallengeProps> = ({ projectDetails }) => {
  const { t, i18n } = useTranslation();
  if (!projectDetails) return null;

  const common: CommonDetails = (commonDetails as CommonDetails[])[0];

  return (
    <section className='projects__challenge section section--half'>
      <div className='projects__container'>
        {/* Title */}
        <h1 className='h1 section__title'>
          <span>03. </span>
          {t(common.titleChallenge)}
        </h1>

        {/* Problems list */}
        <div className='projects__content'>
          {['01', '02', '03', '04', '05'].map((num) => {
            const titleKey = `problem-${num}-title`;
            const textKey = `problem-${num}-text`;
            const imageKey = `problem-${num}-image`;

            const titleVal = projectDetails[titleKey];
            if (!titleVal || !i18n.exists(titleVal)) return null;

            return (
              <div key={num} className={`problem problem-${num}`}>
                <h3 className='h2 section__subtitle problem__title'>
                  {t(titleVal)}
                </h3>
                {(() => {
                  const textVal = projectDetails[textKey];
                  if (!textVal || !i18n.exists(textVal)) return null;

                  const imgSrc = projectDetails[imageKey];

                  return (
                    <div className='problem__description'>
                      <h4 className='h4 problem__text'>{t(textVal)}</h4>

                      {imgSrc && (
                        <div className='problem__image'>
                          <img className='image' src={imgSrc} alt={t(titleVal)} />
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Challenge;
