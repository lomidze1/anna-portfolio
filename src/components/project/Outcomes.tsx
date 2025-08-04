import React from 'react';
import { useTranslation } from 'react-i18next';
import commonDetails from '../../data/commonProjectsDetails.json';
import '../../styles/components/Outcomes.scss';

// Arrow icons
import topArrow from '../../assets/icons/top-arrow.svg';
import downArrow from '../../assets/icons/down-arrow.svg';

// Thematic icons
import visitorsIcon from '../../assets/icons/visitors-growth.png';
import salesIcon from '../../assets/icons/sales-growth.png';
import satisfactionIcon from '../../assets/icons/customer-satisfaction-growth.png';
import bounceIcon from '../../assets/icons/bounce-rate.png';

interface OutcomesProps {
  outcomes: Record<string, string>;
}

interface CommonDetails {
  titleOutcomesMetrics: string;
}

const THEME_ICON_MAP: Record<string, string> = {
  visitorsGrowth: visitorsIcon,
  salesGrowth: salesIcon,
  customerSatisfactionGrowth: satisfactionIcon,
  bounceRate: bounceIcon,
};

const Outcomes: React.FC<OutcomesProps> = ({ outcomes }) => {
  const { t, i18n } = useTranslation();
  const common: CommonDetails = (commonDetails as CommonDetails[])[0];

  const cards = Object.keys(outcomes)
    .filter((key) => key.startsWith('label'))
    .map((labelKey) => {
      const suffix = labelKey.replace(/^label/, '');
      const valueKey = suffix.charAt(0).toLowerCase() + suffix.slice(1);
      const labelTrans = outcomes[labelKey];
      const valueTrans = outcomes[valueKey];
      if (
        !labelTrans ||
        !valueTrans ||
        !i18n.exists(labelTrans) ||
        !i18n.exists(valueTrans)
      )
        return null;

      const label = t(labelTrans);
      const value = t(valueTrans);
      const isPositive = value.startsWith('+');
      const arrow = isPositive ? topArrow : downArrow;
      const themeIcon = THEME_ICON_MAP[valueKey] || '';

      return (
        <div
          key={labelKey}
          className={`outcome outcome--card ${
            isPositive ? 'positive' : 'negative'
          }`}
        >
          <div className='outcome__images'>
            <img
              src={themeIcon}
              alt={`${label} icon`}
              className='outcome__theme-icon'
            />
            <img
              src={arrow}
              alt={isPositive ? 'up arrow' : 'down arrow'}
              className='outcome__arrow-icon'
            />
          </div>
          <div className='outcome__info'>
            <h2 className='outcome__value h2'>{value}</h2>
            <p className='outcome__label'>{label}</p>
          </div>
        </div>
      );
    })
    .filter(Boolean);

  if (!cards.length) return null;

  return (
    <section className='projects__outcomes section section--full'>
      <div className='projects__container'>
        <h1 className='h1 section__title'>
          <span>06. </span>
          {t(common.titleOutcomesMetrics)}
        </h1>

        <div className='projects__content'>
          <div className='projects__outcomes-list'>{cards}</div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
