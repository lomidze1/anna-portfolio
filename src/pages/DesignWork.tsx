import CategoryNavPage from '../components/works/CategoryNavPage';
import additionalWorks from '../data/additionalWorks.json';
import '../styles/pages/AdditionalWork.scss';
import '../styles/pages/CategoryNav.scss';

const categories = [
  { id: 'ios', labelKey: 'additional-work.ios-title' },
  { id: 'ipad', labelKey: 'additional-work.ipad-title' },
  { id: 'graphic', labelKey: 'additional-work.graphic-title' },
];

const DesignWork = () => (
  <CategoryNavPage
    pageKey='design-work'
    titleKey='design-work.title'
    descriptionKey='design-work.description'
    categories={categories}
    data={additionalWorks}
  />
);

export default DesignWork;
