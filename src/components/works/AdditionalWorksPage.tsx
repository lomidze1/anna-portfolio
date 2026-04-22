import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import additionalWorks from '../../data/additionalWorks.json';
import creativeProducts from '../../data/creativeProducts.json';
import GalleryModal from '../common/GalleryModal';
import WorkCard from './WorkCard';
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
    () =>
      ({
        ...(additionalWorks as AdditionalWorksMap),
        ...(creativeProducts as AdditionalWorksMap),
      }) as AdditionalWorksMap,
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

  const openGallery = (item: ShowcaseItem) =>
    setActiveItem({ title: t(item.titleKey), images: item.gallery });

  return (
    <section className={sectionClassName}>
      <div className='additional-work-page__intro'>
        <h1 className='h1'>{t(titleKey)}</h1>
        {descriptionKey && <p className='p'>{t(descriptionKey)}</p>}
      </div>

      <div className='additional-work-page__grid'>
        {items.map((item) => (
          <WorkCard key={item.id} item={item} onOpenGallery={openGallery} />
        ))}
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
