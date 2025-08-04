import React from 'react';
import { useTranslation } from 'react-i18next';
import ActionsIcon from '../../assets/icons/ActionsIcon.png';
import commonDetails from '../../data/commonProjectsDetails.json';
import '../../styles/project/Highlights.scss';

interface CommonDetails {
  titleProductHighlights: string;
}

interface HighlightsProps {
  projectDetails?: Record<string, string>;
}

const Highlights: React.FC<HighlightsProps> = ({ projectDetails }) => {
  const { t, i18n } = useTranslation();
  if (!projectDetails) return null;

  const groups = [
    {
      icon: '🎯',
      titleKey: 'highlights-list-title-01',
      items: [
        'highlights-01-list-01',
        'highlights-01-list-02',
        'highlights-01-list-03',
        'highlights-01-list-04',
        'highlights-01-list-05',
      ],
    },
    {
      icon: (
        <img
          src={ActionsIcon}
          alt={t(projectDetails['highlights-list-title-02'] || '')}
          className='projects__icon'
        />
      ),
      titleKey: 'highlights-list-title-02',
      items: [
        'highlights-02-list-01',
        'highlights-02-list-02',
        'highlights-02-list-03',
        'highlights-02-list-04',
        'highlights-02-list-05',
      ],
    },
    {
      icon: '📊',
      titleKey: 'highlights-list-title-03',
      items: ['highlights-03-text-01', 'highlights-03-text-02'],
    },
  ];

  const common: CommonDetails = (commonDetails as CommonDetails[])[0];

  return (
    <section className='projects__highlights section section--full'>
      <div className='projects__container'>
        <h1 className='h1 section__title'>
          <span>02. </span>
          {t(common.titleProductHighlights)}
        </h1>
        <div className='projects__content'>
          {groups.map((g, i) => (
            <div key={i} className='projects__highlights-group'>
              <h3 className='h2 section__subtitle projects__highlights-subtitle'>
                {g.icon} {t(projectDetails[g.titleKey]!)}
              </h3>
              <ul className={i === 2 ? 'projects__highlights-results' : ''}>
                {g.items
                  .map((key) => projectDetails[key])
                  .filter((k) => k && i18n.exists(k))
                  .map((k) => (
                    <li key={k} className='p'>
                      {t(k!)}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
