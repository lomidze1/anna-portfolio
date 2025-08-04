import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/components/ProjectVideoModal.scss';


interface ProjectVideoModalProps {
  videoSrc: string;
  onClose: () => void;
}

const ProjectVideoModal: React.FC<ProjectVideoModalProps> = ({
  videoSrc,
  onClose,
}) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.querySelector('.modal');
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='modal__close' onClick={onClose}>
          &times;
        </button>
        <video src={videoSrc} controls autoPlay className='modal__video' />
      </div>
    </div>,
    document.body
  );
};

export default ProjectVideoModal;
