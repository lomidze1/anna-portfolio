import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from './header/Navbar';
import { FiDownload } from 'react-icons/fi';
import MailchimpSubscribeForm from './form/MailchimpSubscribeForm';

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
            <button type='button'>{t('header.name')}</button>
          </Link>

          <div className='footer__socials'>
            <a
              href='https://x.com/anna_lomid7583'
              target='_blank'
              rel='noopener noreferrer'
              title='X-Twitter'
            >
              <FaTwitter />
            </a>
            <a
              href='https://www.behance.net/analomidze4'
              target='_blank'
              rel='noopener noreferrer'
              title='Behance'
            >
              <FaBehance />
            </a>
            <a
              href='https://t.me/anna_lomidze'
              target='_blank'
              rel='noopener noreferrer'
              title='Telegram'
            >
              <FaTelegramPlane />
            </a>
            <a
              href='https://www.instagram.com/anuki_a/'
              target='_blank'
              rel='noopener noreferrer'
              title='Instagram'
            >
              <FaInstagram />
            </a>
            <a
              href='https://www.linkedin.com/in/anna-lomidze'
              target='_blank'
              rel='noopener noreferrer'
              title='LinkedIn'
            >
              <FaLinkedinIn />
            </a>
          </div>

          <span className='footer__vertical-stick'></span>

          <div className='footer__newsletter'>
            <MailchimpSubscribeForm />
          </div>
        </div>

        <div className='footer__navbar navbar '>
          <ul className='navbar__menu-items'>

            <li>
              <a href='/magazine'>{t('footer.magazine')}</a>
            </li>
            <li>
              <a href='/ui-kits'>{t('footer.UI-Kits')}</a>
            </li>
            <li>
              <a href='/blog'>{t('footer.blog')}</a>
            </li>
          </ul>

          <a href='/resume.pdf' download className=' footer__download-btn '>
            <FiDownload style={{ marginRight: '8px' }} />
            {t('footer.download-resume')}
          </a>
        </div>
      </div>

      <div className='footer__copyright'>
        <p>© {t('footer.copyright')} </p>
        <p>© {t('footer.reserve')} </p>
      </div>
    </footer>
  );
};

export default Footer;
