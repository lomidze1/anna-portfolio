import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import additionalWorks from '../../data/additionalWorks.json';
import GalleryModal from '../common/GalleryModal';
import type { ShowcaseItem } from '../showcase/ShowcaseSection';

interface AdditionalWorksCategory {
  items: ShowcaseItem[];
}

type AdditionalWorksMap = Record<string, AdditionalWorksCategory>;

interface AdditionalWorksPageProps {
  categoryId: string;
  titleKey: string;
  descriptionKey?: string;
}

const AdditionalWorksPage = ({
  categoryId,
  titleKey,
  descriptionKey,
}: AdditionalWorksPageProps) => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<{
    title: string;
    images: string[];
  } | null>(null);

  const data = useMemo(
    () => additionalWorks as AdditionalWorksMap,
    []
  );

  const category = data[categoryId];
  const items = category?.items ?? [];

  const sectionClassName = `container additional-work-page additional-work-page--${categoryId}`;

  if (!category || items.length === 0) {
    return (
      <section className={sectionClassName}>
        <div className='additional-work-page__intro'>
          <h1 className='h1'>{t(titleKey)}</h1>
          <p className='p'>{t('projects.project-not-found')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClassName}>
      <div className='additional-work-page__intro'>
        <h1 className='h1'>{t(titleKey)}</h1>
        {descriptionKey && <p className='p'>{t(descriptionKey)}</p>}
      </div>

      <div className='additional-work-page__grid'>
        {items.map((item) => {
          const title = t(item.titleKey);
          const openGallery = () =>
            setActiveItem({
              title,
              images: item.gallery,
            });

          return (
            <article key={item.id} className='additional-work-card'>
              <button
                type='button'
                className='additional-work-card__content'
                onClick={openGallery}
              >
                <div className='additional-work-card__image'>
                  <img src={item.coverImage} alt={title} loading='lazy' />
                </div>
                <h2 className='h3 additional-work-card__title'>{title}</h2>
              </button>

              {item.figmaLink && (
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
        })}
      </div>

      {activeItem && (
        <GalleryModal
          title={activeItem.title}
          images={activeItem.images}
          onClose={() => setActiveItem(null)}
        />
      )}
    </section>
  );
};

export default AdditionalWorksPage;
