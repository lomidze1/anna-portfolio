import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NavigationHeader from '../components/project/ProjectsNavigationHeader';
import ProjectVideo from '../components/video/ProjectVideo';
import ProjectVideoModal from '../components/video/ProjectVideoModal';
import projectsData from '../data/projects.json';
import '../styles/pages/MyWork.scss';

interface Project {
  id: string;
  image: string;
  year: string;
  titleKey: string;
  descriptionKey: string;
  projectNameKey: string;
  problemKey: string;
  solvingBlockNameKey: string;
  solvingKey: string;
  usersBlockNameKey: string;
  usersPastKey: string;
  usersNowKey: string;
  roleKey: string;
  positionKey: string;
  positionKey2: string;
  positionKey3?: string;
  toolsNameKey: string;
  buttonKey: string;
  service1Key: string;
  service2Key: string;
}

const MyWork: React.FC = () => {
  const { t, i18n } = useTranslation();

  const projects = useMemo<Project[]>(() => projectsData as Project[], []);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const formatServices = (serviceText: string): string =>
    serviceText
      .split(',')
      .map((part) => `<span>${part.trim()}</span>`)
      .join(', ');

  const openModal = (path: string) => setSelectedVideo(path);
  const closeModal = () => setSelectedVideo(null);

  return (
    <>
      <section className='work'>
        <NavigationHeader />
        <div className='work__body'>
          {projects.map((project, index) => {
            const isEven = (index + 1) % 2 === 0;
            const itemClass = `work__item${isEven ? ' work__item--even' : ''}`;

            return (
              <div key={project.id} className={itemClass}>
                <div className='work__content'>
                  <div className='work__title'>
                    <h1 className='h1 work__projectName'>
                      <span className='p'>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                      </span>
                      {t(project.projectNameKey)}
                    </h1>
                  </div>

                  <ProjectVideo
                    videoSrc={`/videos/${project.id}.mp4`}
                    onClick={() => openModal(`/videos/${project.id}.mp4`)}
                    ctaText={t('projects_header.click_to_watch')}
                    isInteractive
                    aria-label={t('projects.project-detail.watch-video')}
                  />

                  <div className='work__problem'>
                    <h2 className='h2'>{t(project.problemKey)}</h2>
                  </div>

                  <div className='work__solving'>
                    <h3 className='h3'>{t(project.solvingBlockNameKey)}</h3>
                    <p className='p'>{t(project.solvingKey)}</p>
                  </div>

                  <div className='work__users'>
                    <h3 className='h3'>{t(project.usersBlockNameKey)}</h3>
                    <p className='p'>{t(project.usersPastKey)}</p>
                    <p className='p'>{t(project.usersNowKey)}</p>
                  </div>

                  <div className='work__cta-box'>
                    <div className='work__role'>
                      <h4 className='h4'>{t(project.roleKey)}</h4>
                      <div>
                        <p className='p'>{t(project.positionKey)}</p>
                        <p className='p'>{t(project.positionKey2)}</p>
                        {project.positionKey3 &&
                          i18n.exists(project.positionKey3) && (
                            <p className='p'>{t(project.positionKey3)}</p>
                          )}
                      </div>
                    </div>

                    <div className='work__tools'>
                      <h4 className='h4'>{t(project.toolsNameKey)}</h4>
                      <div>
                        <p
                          className='p'
                          dangerouslySetInnerHTML={{
                            __html: formatServices(t(project.service1Key)),
                          }}
                        ></p>
                        <p
                          className='p'
                          dangerouslySetInnerHTML={{
                            __html: formatServices(t(project.service2Key)),
                          }}
                        ></p>
                      </div>
                    </div>

                    <div className='work__button'>
                      <Link to={`/projects/${project.id}`}>
                        {t(project.buttonKey)}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedVideo && (
        <ProjectVideoModal
          videoSrc={selectedVideo}
          onClose={closeModal}
          aria-label={t('projects.project-detail.close-video')}
        />
      )}
    </>
  );
};

export default MyWork;
