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
import SoftintermobShowcase from '../components/showcase/SoftintermobShowcase';
// Storytelling components (new)
import ChapterRail from '../components/project/ChapterRail';
import HorizontalStrategy from '../components/project/HorizontalStrategy';
import ImplementationReveal from '../components/project/ImplementationReveal';

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

const STORY_CHAPTERS = [
  { id: 'chapter-overview', labelKey: 'projects.project-detail.title-product-overview' },
  { id: 'chapter-highlights', labelKey: 'projects.project-detail.title-key-highlights' },
  { id: 'chapter-challenge', labelKey: 'projects.project-detail.title-challenge' },
  { id: 'chapter-strategy', labelKey: 'projects.project-detail.title-strategy-planning' },
  { id: 'chapter-implementation', labelKey: 'projects.project-detail.title-solution-implementation' },
  { id: 'chapter-outcomes', labelKey: 'projects.project-detail.title-outcomes-metrics' },
];

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

  if (project.id === 'softintermob') {
    return (
      <div className='projects'>
        <NavigationHeader />
        <div className='projects__item'>
          <Overview project={project} />
          <SoftintermobShowcase />
        </div>
      </div>
    );
  }

  const useStorytelling = project.id !== 'softintermob';

  if (useStorytelling) {
    return (
      <div className='projects projects--story'>
        <NavigationHeader />
        <div className='projects__item projects__item--story'>
          <div className='projects__story-grid'>
            <ChapterRail
              projectTitleKey={project.titleKey}
              chapters={STORY_CHAPTERS}
            />
            <div className='projects__story-main'>
              <div id='chapter-overview'>
                <Overview project={project} />
              </div>
              <div id='chapter-highlights'>
                <Highlights projectDetails={project.projectDetails ?? {}} />
              </div>
              <div id='chapter-challenge'>
                <Challenge projectDetails={project.projectDetails ?? {}} />
              </div>
              <HorizontalStrategy
                projectDetails={project.projectDetails ?? {}}
                sectionId='chapter-strategy'
              />
              <ImplementationReveal
                project={project}
                sectionId='chapter-implementation'
              />
              <div id='chapter-outcomes'>
                <Outcomes outcomes={project.outcomes ?? {}} />
              </div>
            </div>
          </div>
        </div>
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
