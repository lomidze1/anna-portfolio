import React from 'react';
import '../../styles/components/ProjectVideo.scss';

interface ProjectVideoProps {
  videoSrc: string;
  ctaText?: string;
  onClick?: () => void;
  isInteractive?: boolean;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({
  videoSrc,
  ctaText,
  onClick,
  isInteractive = false,
}) => {
  const containerClass = isInteractive
    ? 'project__video-container project__video-container--interactive'
    : 'project__video-container';

  return (
    <div
      className={containerClass}
      {...(isInteractive && onClick ? { onClick } : {})}
    >
      <video
        src={videoSrc}
        muted
        autoPlay
        loop
        playsInline
        className='project__video-preview'
      />

      {isInteractive && ctaText && (
        <p className='project__video-cta'>{ctaText}</p>
      )}
    </div>
  );
};

export default ProjectVideo;
