import { useTranslation } from 'react-i18next';
import '../../styles/components/ShowcaseSection.scss';

export interface ShowcaseItem {
  id: string;
  titleKey: string;
  coverImage: string;
  gallery: string[];
  figmaLink?: string;
  descriptionKey?: string;
  externalLink?: string;
  externalLinkLabelKey?: string;
  externalLinkDescriptionKey?: string;
}

interface ShowcaseSectionProps {
  title: string;
  items: ShowcaseItem[];
  viewAllLabel: string;
  onViewAll: () => void;
  onCardClick: (item: ShowcaseItem) => void;
}

const ShowcaseSection = ({
  title,
  items,
  viewAllLabel,
  onViewAll,
  onCardClick,
}: ShowcaseSectionProps) => {
  const { t } = useTranslation();
  if (!items || items.length === 0) {
    return null;
  }

  const itemsToDisplay = items.slice(0, 4);

  return (
    <section className='section section--full showcase-section'>
      <div className='projects__container showcase-section__container'>
        <header className='showcase-section__header'>
          <h2 className='h2 section__subtitle'>{title}</h2>
        </header>

        <div className='showcase-section__grid'>
          {itemsToDisplay.map((item) => (
            <button
              type='button'
              key={item.id}
              className='showcase-card'
              onClick={() => onCardClick(item)}
            >
              <div className='showcase-card__image'>
                <img
                  src={item.coverImage}
                  alt={t(item.titleKey)}
                  loading='lazy'
                />
              </div>
              <h3 className='h3 showcase-card__title'>{t(item.titleKey)}</h3>
            </button>
          ))}
        </div>

        <div className='showcase-section__footer'>
          <button
            type='button'
            className='showcase-section__view-all'
            onClick={onViewAll}
          >
            {viewAllLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
