import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/components/Navbar.scss';

interface NavbarProps {
  enableToggle?: boolean;
  isStatic?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  enableToggle = true,
  isStatic = false,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const shouldShowToggle = enableToggle;

  return (
    <>
      {isOpen && shouldShowToggle && (
        <div className='navbar__overlay' onClick={toggleMenu}></div>
      )}

      <nav className={`navbar ${isStatic ? 'navbar--static' : ''}`}>
        {shouldShowToggle && (
          <div
            title='Hamburger Button'
            className={`navbar__hamburger-btn menu-toggle ${
              isOpen ? 'open' : ''
            }`}
            onClick={toggleMenu}
          >
            <span className='first'></span>
            <span className='second'></span>
            <span className='third'></span>
          </div>
        )}

        <ul
          className={`navbar__menu-items nav-links ${
            shouldShowToggle ? (isOpen ? 'active' : '') : 'active'
          }`}
        >
          <li title='My Work'>
            <NavLink to='/my-work' onClick={() => setIsOpen(false)}>
              {t('navbar.work')}
            </NavLink>
          </li>
          <li title='About Me'>
            <NavLink
              to='/about-me'
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setIsOpen(false)}
            >
              {t('navbar.about')}
            </NavLink>
          </li>
          <li title='Contact Me'>
            <NavLink to='/contact-me' onClick={() => setIsOpen(false)}>
              {t('navbar.contact')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
