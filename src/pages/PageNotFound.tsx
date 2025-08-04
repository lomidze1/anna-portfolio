import { useTranslation } from 'react-i18next';
import '../styles/pages/PageNotFound.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className='page404'>
      <div className='page404__wrapper'>
        <img
          src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
          alt=''
        />

        <div className='page404__header'>
          <h1 className='h1'>404</h1>
        </div>
      </div>

      <div className='page404__footer'>
        <h3 className='h3'>{t('404.title')}</h3>
        <p className='p'>{t('404.subtitle')}</p>

        <div className='page404__buttons'>
          <button
            className='button'
            title={t('404.go-back')}
            onClick={() => navigate(-1)}
          >
            {t('404.go-back')}
          </button>
          <Link to='/' className='button' title={t('404.return-home')}>
            {t('404.return-home')}
          </Link>
        </div>
      </div>
    </section>
  );
}
