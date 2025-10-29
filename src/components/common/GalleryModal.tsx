import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/components/GalleryModal.scss";

interface GalleryModalProps {
  title: string;
  images: string[];
  onClose: () => void;
}

const GalleryModal = ({ title, images, onClose }: GalleryModalProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollBarCompensation =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarCompensation > 0) {
      document.body.style.paddingRight = `${scrollBarCompensation}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  useEffect(() => {
    const scrollerEl = scrollerRef.current;
    if (!scrollerEl) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const { deltaX, deltaY } = event;
      const dominantDelta =
        Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      if (dominantDelta === 0) {
        return;
      }

      event.preventDefault();
      scrollerEl.scrollBy({
        left: dominantDelta,
        behavior: "smooth",
      });
    };

    scrollerEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scrollerEl.removeEventListener("wheel", handleWheel);
    };
  }, [images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="gallery-modal__overlay" role="dialog" aria-modal="true">
      <div className="gallery-modal">
        <header className="gallery-modal__header">
          <h2 className="h2 gallery-modal__title">{title}</h2>
          <button
            className="gallery-modal__close"
            onClick={onClose}
            type="button"
            aria-label="Close gallery"
          >
            &times;
          </button>
        </header>

        <div
          className="gallery-modal__scroller"
          role="list"
          ref={scrollerRef}
        >
          {images.map((image, index) => (
            <div className="gallery-modal__item" role="listitem" key={image}>
              <img
                src={image}
                alt={`${title} frame ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GalleryModal;
