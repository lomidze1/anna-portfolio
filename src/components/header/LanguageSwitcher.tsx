import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import usaFlag from '../../assets/flags/usa-flag.png';
import russianFlag from '../../assets/flags/russian-flag.png';
import georgianFlag from '../../assets/flags/geo-flag.png';
import '../../styles/components/LanguageSwitcher.scss';

const flagMap: Record<string, string> = {
  en: usaFlag,
  ru: russianFlag,
  ka: georgianFlag,
};

const languageLabels: Record<string, string> = {
  en: 'English',
  ru: 'Русский',
  ka: 'ქართული',
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // გარეთ დაწკაპუნებაზე დაიხუროს
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const setLanguageByGeoIP = async () => {
      if (localStorage.getItem('langSet')) return;

      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        let detectedLang = 'en';
        if (data.country === 'GE') detectedLang = 'ka';
        else if (data.country === 'RU') detectedLang = 'ru';

        i18n.changeLanguage(detectedLang);
        setSelectedLang(detectedLang);
        localStorage.setItem('langSet', 'true');
      } catch (error) {
        console.error('GeoIP language detection failed:', error);
      }
    };

    setLanguageByGeoIP();
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
    setDropdownOpen(false);
  };

  return (
    <div className='language-switcher' ref={switcherRef}>
      <button
        className='lang-btn'
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label='Toggle language dropdown'
        title='Toggle Language'
      >
        <img
          src={flagMap[selectedLang]}
          alt={selectedLang}
          width={24}
          height={24}
        />
      </button>

      {dropdownOpen && (
        <ul className='lang-menu'>
          {Object.entries(flagMap).map(([code, flag]) => (
            <li key={code} onClick={() => changeLanguage(code)}>
              <img src={flag} alt={languageLabels[code]} />
              <span>{languageLabels[code]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
