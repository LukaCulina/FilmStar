import React, { useRef } from 'react';
import { img_300, noPicture } from '../../config/config';
import InfoModal from '../Info/Info';
import './Carousel.css';

const CarouselItem = ({ media_type, c }) => {
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = false;
  };

  const handleMouseMove = () => {
    isDragging.current = true;
  };

  const handleClick = (e) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Otherwise, let InfoModal open
  };

  return (
    <InfoModal id={c.id} media_type={media_type} keyword="home" c={c}>
      <div
        className='carouselItem'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <img 
          src={c.poster_path ? `${img_300}/${c.poster_path}` : noPicture} 
          alt={c.name || c.title}
          onDragStart={e => e.preventDefault()}
          className='carouselItem_img_home'
        />
        <b className='carouselItem_txt'>
          {c.name || c.title}
        </b>
      </div>
    </InfoModal>
  );
};

export default CarouselItem;