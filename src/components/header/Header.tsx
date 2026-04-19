import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Navbar from './Navbar';
import '../../styles/components/Header.scss';

const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <a href='#main-content' className='skip-link'>
        Skip to content
      </a>
      <header className='header'>
        <Link to='/' title='Home' className='header__logo'>
          <span className='header__logo-text'>{t('header.name')}</span>
        </Link>
        <div className='header__navigation'>
          <Navbar enableToggle={true} />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
};

export default Header;
