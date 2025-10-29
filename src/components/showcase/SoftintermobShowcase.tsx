import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import additionalWorks from '../../data/additionalWorks.json';
import GalleryModal from '../common/GalleryModal';
import ShowcaseSection from './ShowcaseSection';
import type { ShowcaseItem } from './ShowcaseSection';

interface AdditionalWorksCategory {
  viewAllPath: string;
  items: ShowcaseItem[];
}

type AdditionalWorksMap = Record<string, AdditionalWorksCategory>;

const sectionsOrder = ['ios', 'ipad', 'graphic'] as const;

const SoftintermobShowcase = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<{
    title: string;
    images: string[];
  } | null>(null);

  const data = useMemo(
    () => additionalWorks as AdditionalWorksMap,
    []
  );

  const viewAllLabel = t('projects.softintermob.sections.view-all');

  return (
    <>
      {sectionsOrder.map((sectionId) => {
        const category = data[sectionId];
        if (!category || !category.items || category.items.length === 0) {
          return null;
        }

        return (
          <ShowcaseSection
            key={sectionId}
            title={t(`projects.softintermob.sections.${sectionId}`)}
            viewAllLabel={viewAllLabel}
            items={category.items}
            onViewAll={() => navigate(category.viewAllPath)}
            onCardClick={(item) =>
              setActiveItem({
                title: t(item.titleKey),
                images: item.gallery,
              })
            }
          />
        );
      })}

      {activeItem && (
        <GalleryModal
          title={activeItem.title}
          images={activeItem.images}
          onClose={() => setActiveItem(null)}
        />
      )}
    </>
  );
};

export default SoftintermobShowcase;
