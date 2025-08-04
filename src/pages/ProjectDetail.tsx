import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Components
import NavigationHeader from '../components/project/ProjectsNavigationHeader';
// Data
import projects from '../data/projects.json';
// Styles
import '../styles/pages/ProjectDetail.scss';
// Sections
import Overview from '../components/project/Overview';
import Highlights from '../components/project/Highlights';
import Challenge from '../components/project/Challenge';
import Strategy from '../components/project/Strategy';
import Implementation from '../components/project/Implementation';
import Outcomes from '../components/project/Outcomes';

interface ProjectData {
  id: string;
  image: string;
  year: string;
  titleKey: string;
  descriptionKey: string;
  hasScreenVideo?: boolean;
  projectDetails?: Record<string, string>;
  images: {
    slider: string[];
    [key: string]: string | string[];
  };
  outcomes?: Record<string, string>;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const project = (projects as ProjectData[]).find((p) => p.id === id);
  if (!project) {
    return (
      <div className='projects__not-found'>
        {t('projects.project-not-found')}
      </div>
    );
  }

  return (
    <div className='projects'>
      <NavigationHeader />
      <div className='projects__item'>
        <Overview project={project} />
        <Highlights projectDetails={project.projectDetails ?? {}} />
        <Challenge projectDetails={project.projectDetails ?? {}} />
        <Strategy projectDetails={project.projectDetails ?? {}} />
        <Implementation project={project} />
        <Outcomes outcomes={project.outcomes ?? {}} />
      </div>
    </div>
  );
};

export default ProjectDetail;
