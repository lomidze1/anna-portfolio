import CategoryNavPage from '../components/works/CategoryNavPage';
import creativeProducts from '../data/creativeProducts.json';
import '../styles/pages/AdditionalWork.scss';
import '../styles/pages/CategoryNav.scss';

const categories = [
  { id: 'books', labelKey: 'creative-products.books.title' },
  { id: 'posters', labelKey: 'creative-products.posters.title' },
  { id: 'logos', labelKey: 'creative-products.logos.title' },
  { id: 'banners', labelKey: 'creative-products.banners.title' },
];

const CreativeProducts = () => (
  <CategoryNavPage
    pageKey='creative-products'
    titleKey='creative-products.title'
    descriptionKey='creative-products.description'
    categories={categories}
    data={creativeProducts}
  />
);

export default CreativeProducts;
