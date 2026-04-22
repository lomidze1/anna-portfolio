import { useTranslation } from 'react-i18next';
import type { ShowcaseItem } from '../showcase/ShowcaseSection';

interface WorkCardProps {
  item: ShowcaseItem;
  onOpenGallery: (item: ShowcaseItem) => void;
}

const WorkCard = ({ item, onOpenGallery }: WorkCardProps) => {
  const { t } = useTranslation();
  const title = t(item.titleKey);

  return (
    <article className='additional-work-card'>
      <button
        type='button'
        className='additional-work-card__content'
        onClick={() => onOpenGallery(item)}
      >
        <div className='additional-work-card__image'>
          <img src={item.coverImage} alt={title} loading='lazy' />
        </div>
        <h2 className='h3 additional-work-card__title'>{title}</h2>
        {item.descriptionKey && (
          <p className='p additional-work-card__description'>
            {t(item.descriptionKey)}
          </p>
        )}
      </button>

      {item.externalLink && (
        <div className='additional-work-card__cta'>
          {item.externalLinkDescriptionKey && (
            <p className='p additional-work-card__cta-text'>
              {t(item.externalLinkDescriptionKey)}
            </p>
          )}
          <a
            href={item.externalLink}
            target='_blank'
            rel='noopener noreferrer'
            className='additional-work-card__cta-button additional-work-card__cta-button--buy'
          >
            {t(item.externalLinkLabelKey ?? 'creative-products.buy-on-etsy')}
          </a>
        </div>
      )}

      {!item.externalLink && item.figmaLink && (
        <div className='additional-work-card__cta'>
          <p className='p additional-work-card__cta-text'>
            {t('additional-work.figma-description')}
          </p>
          <a
            href={item.figmaLink}
            target='_blank'
            rel='noopener noreferrer'
            className='additional-work-card__cta-button'
          >
            {t('additional-work.figma-button')}
          </a>
        </div>
      )}
    </article>
  );
};

export default WorkCard;
