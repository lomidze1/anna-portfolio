import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import projects from '../../data/projects.json';
import '../../styles/components/ProjectsNavigationHeader.scss';
import { useLocation } from 'react-router-dom';

const ProjectsNavigationHeader = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <section className='projects__header'>
      <div className='projects__content'>
        <div className='projects__header-description'>
          <h1 className='h1'>{t('projects_header.title')}</h1>
          <h3 className='h3'>{t('projects_header.sub-title-1')}</h3>
          <h3 className='h3'>{t('projects_header.sub-title-2')}</h3>
          <h3 className='h3'>{t('projects_header.sub-title-3')}</h3>
        </div>

        <nav className='projects__header-navigation'>
          <ul>
            {projects.map((project) => {
              const isActive = location.pathname.includes(project.id);

              return (
                <li
                  className={`li work__nav-item${
                    isActive ? ' work__nav-item--active' : ''
                  }`}
                  key={project.id}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className='work__nav-link'
                  >
                    {t(project.projectNameKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>{' '}
    </section>
  );
};

export default ProjectsNavigationHeader;
