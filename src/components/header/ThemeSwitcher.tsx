import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import sunGif from '../../assets/icons/sun.gif';
import moonGif from '../../assets/icons/moon.gif';
import '../../styles/components/ThemeSwitcher.scss';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const iconSrc = theme === 'dark' ? sunGif : moonGif;
  const altText = theme === 'dark' ? 'Sun Shining' : 'Moon Sleeping';
  const iconClass =
    theme === 'dark' ? 'theme-icon sun-theme' : 'theme-icon moon-theme';

  return (
    <div className='theme-switcher'>
      <button
        className='theme-toggle-btn'
        onClick={toggleTheme}
        aria-label='Toggle Theme'
        title='Toggle Theme'
      >
        <img
          src={iconSrc}
          alt={altText}
          className={iconClass}
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
