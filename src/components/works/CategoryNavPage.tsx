import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import GalleryModal from '../common/GalleryModal';
import WorkCard from './WorkCard';
import type { ShowcaseItem } from '../showcase/ShowcaseSection';

export interface CategoryNavItem {
  id: string;
  labelKey: string;
}

interface CategoryDataMap {
  [key: string]: { items: ShowcaseItem[] };
}

interface CategoryNavPageProps {
  pageKey: string;
  titleKey: string;
  descriptionKey?: string;
  categories: CategoryNavItem[];
  data: CategoryDataMap;
  emptyKey?: string;
}

const CategoryNavPage = ({
  pageKey,
  titleKey,
  descriptionKey,
  categories,
  data,
  emptyKey,
}: CategoryNavPageProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeItem, setActiveItem] = useState<{
    title: string;
    images: string[];
  } | null>(null);

  const defaultCategory = categories[0]?.id ?? '';
  const requested = searchParams.get('category') ?? '';
  const activeCategoryId = categories.some((c) => c.id === requested)
    ? requested
    : defaultCategory;

  const items = useMemo(() => {
    const cat = data[activeCategoryId];
    return cat?.items ?? [];
  }, [data, activeCategoryId]);

  const openGallery = (item: ShowcaseItem) =>
    setActiveItem({ title: t(item.titleKey), images: item.gallery });

  const handleTabClick = (id: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', id);
    setSearchParams(next, { replace: true });
  };

  return (
    <section className={`container category-nav-page category-nav-page--${pageKey}`}>
      <div className='category-nav-page__intro'>
        <h1 className='h1'>{t(titleKey)}</h1>
        {descriptionKey && <p className='p'>{t(descriptionKey)}</p>}
      </div>

      <nav className='category-nav-page__subnav' aria-label={t(titleKey)}>
        <ul className='category-nav-page__subnav-list'>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type='button'
                className={`category-nav-page__tab ${
                  cat.id === activeCategoryId
                    ? 'category-nav-page__tab--active'
                    : ''
                }`}
                onClick={() => handleTabClick(cat.id)}
                aria-current={cat.id === activeCategoryId ? 'page' : undefined}
              >
                {t(cat.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {items.length === 0 ? (
        <p className='p category-nav-page__empty'>
          {t(emptyKey ?? 'projects.project-not-found')}
        </p>
      ) : (
        <div className='category-nav-page__grid'>
          {items.map((item) => (
            <WorkCard key={item.id} item={item} onOpenGallery={openGallery} />
          ))}
        </div>
      )}

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

export default CategoryNavPage;
