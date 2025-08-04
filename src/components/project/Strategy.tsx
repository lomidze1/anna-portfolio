import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import commonDetails from '../../data/commonProjectsDetails.json';
import dropdownIcon  from '../../assets/icons/drop-down-icon.png';
import lightOnIcon   from '../../assets/icons/light-on.png';
import lightOffIcon  from '../../assets/icons/light-off.png';
import '../../styles/project/Strategy.scss';

interface CommonDetails {
  titleStrategyPlanning: string;
}
interface StrategyProps { projectDetails?: Record<string,string>; }

const Strategy: React.FC<StrategyProps> = ({ projectDetails }) => {
  const { t, i18n } = useTranslation();
  const [activePlan, setActivePlan] = useState<string|null>(null);
  if (!projectDetails) return null;

  const common: CommonDetails = (commonDetails as CommonDetails[])[0];
  const planKeys = ['plan-01','plan-02','plan-03','plan-04','plan-05'];

  return (
    <section className="projects__strategy section section--full">
      <div className="projects__container">
        <h1 className="h1 section__title">
          <span>04. </span>{t(common.titleStrategyPlanning)}
        </h1>
        <div className="projects__content">
          {projectDetails['main-strategy'] && i18n.exists(projectDetails['main-strategy']) &&
            <h3 className="h2">{t(projectDetails['main-strategy'])}</h3>
          }

          <div className="plans">
            {planKeys.map(key => {
              const val = projectDetails[key];
              if (!val || !i18n.exists(val)) return null;

              return (
                <div
                  key={key}
                  className={`plan ${activePlan===key ? 'plan--active' : ''}`}
                  onClick={() => setActivePlan(prev => prev===key ? null : key)}
                >
                  <div className="plan__background">
                    <img
                      src={dropdownIcon}
                      alt={t('projects.project-detail.toggle')}
                      className="plan__icon plan__icon--dropdown"
                    />
                  </div>
                  <span className="plan__shape">
                    <img
                      src={lightOnIcon}
                      alt={t('projects.project-detail.light-on')}
                      className="plan__icon plan__icon--on"
                    />
                    <img
                      src={lightOffIcon}
                      alt={t('projects.project-detail.light-off')}
                      className="plan__icon plan__icon--off"
                    />
                  </span>
                  <div className="plan__item">
                    <h3 className="h3 plan__title">{t(`${val}-title`)}</h3>
                    <h4 className="plan__text h4">{t(val)}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
