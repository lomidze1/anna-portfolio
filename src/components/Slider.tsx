// src/components/Slider.tsx
import React, { useState } from 'react';
import '../styles/components/Slider.scss';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  // Guard for no images
  if (!Array.isArray(images) || length === 0) return null;

  return (
    <div className='slider'>
      {/* Image Display */}
      <div className='slider__image-wrapper'>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className='slider__image'
        />
      </div>

      <div className='slider__buttons'>
        {/* Previous Button */}
        <button
          className='slider__button slider__button--prev'
          onClick={prevSlide}
          aria-label='Previous slide'
        >
          <ArrowLeft size={30} aria-hidden='true' />
        </button>

        {/* Next Button */}
        <button
          className='slider__button slider__button--next'
          onClick={nextSlide}
          aria-label='Next slide'
        >
          <ArrowRight size={30} aria-hidden='true' />
        </button>
      </div>
      {/* Dots Navigation */}
      <div className='slider__dots'>
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`slider__dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
