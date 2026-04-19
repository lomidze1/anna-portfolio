import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from './header/Navbar';
import { FiDownload } from 'react-icons/fi';
import {
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaBehance,
  FaLinkedinIn,
} from 'react-icons/fa';
import '../styles/components/Footer.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__navigation'>
          <Navbar enableToggle={false} isStatic />
        </div>

        <div className='footer__center'>
          <Link to='/' title='Home' className='header__logo'>
            <span className='header__logo-text'>{t('header.name')}</span>
          </Link>

          <div className='footer__socials'>
            <a
              href='https://x.com/anna_lomid7583'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='X-Twitter'
            >
              <FaTwitter />
            </a>
            <a
              href='https://www.behance.net/analomidze4'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Behance'
            >
              <FaBehance />
            </a>
            <a
              href='https://t.me/anna_lomidze'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Telegram'
            >
              <FaTelegramPlane />
            </a>
            <a
              href='https://www.instagram.com/anuki_a/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
            >
              <FaInstagram />
            </a>
            <a
              href='https://www.linkedin.com/in/anna-lomidze'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <FaLinkedinIn />
            </a>
          </div>

          <a href='/resume.pdf' download className='footer__download-btn'>
            <FiDownload style={{ marginRight: '8px' }} />
            {t('footer.download-resume')}
          </a>

        </div>
      </div>

      <div className='footer__copyright'>
        <p>&copy; {t('footer.copyright')} </p>
        <p>&copy; {t('footer.reserve')} </p>
      </div>
    </footer>
  );
};

export default Footer;
