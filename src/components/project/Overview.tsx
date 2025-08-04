import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectVideo from '../video/ProjectVideo';
import ProjectVideoModal from '../video/ProjectVideoModal';
import commonDetails from '../../data/commonProjectsDetails.json';
import '../../styles/project/Overview.scss';

interface OverviewProps {
  project: {
    id: string;
    titleKey: string;
    hasScreenVideo?: boolean;
    projectDetails?: Record<string, string>;
  };
}

interface CommonDetails {
  titleProductOverview: string;
}

const common: CommonDetails = (commonDetails as CommonDetails[])[0];

const Overview: React.FC<OverviewProps> = ({ project }) => {
  const { t, i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoPath = `/videos/screen/${project.id}.mp4`;

  return (
    <section className='projects__overview section section--half'>
      <div className='projects__container'>
        <h1 className='h1 section__title'>
          <span>01. </span>
          {t(common.titleProductOverview)}
        </h1>
        <div className='projects__overview-content'>
          {project.hasScreenVideo && (
            <div className='projects__overview-video'>
              <ProjectVideo
                videoSrc={videoPath}
                onClick={() => setSelectedVideo(videoPath)}
                ctaText={t('projects_header.click_to_watch')}
                isInteractive
                aria-label={t('projects.project-detail.watch-video')}
              />
            </div>
          )}
          <div className='projects__overview-description'>
            <h2 className='h2 section__subtitle'> {t(project.titleKey)} </h2>
            {project.projectDetails && (
              <>
                {[
                  'review-subtitle-01',
                  'review-subtitle-02',
                  'review-subtitle-03',
                ]
                  .map((key) => project.projectDetails![key])
                  .filter((path) => path && i18n.exists(path))
                  .map((path) => (
                    <h4 key={path} className='h4'>
                      {t(path)}
                    </h4>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      {selectedVideo && (
        <ProjectVideoModal
          videoSrc={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          aria-label={t('projects.project-detail.close-video')}
        />
      )}
    </section>
  );
};

export default Overview;
