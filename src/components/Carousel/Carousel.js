import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import { useEffect, useState } from "react";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id, media_type}) => {
  const key = process.env.REACT_APP_API_KEY;
  const [credits, setCredits] = useState()

  const fetchCredits = async() => {
    const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${key}&language=en-US`

    )
    const data = await response.json();
    console.log(data);
    setCredits(data.cast);
  };

  useEffect(()=>{
      fetchCredits();
      
  },[])

  const items = credits?.map((c) =>(
      <a
        href={`https://www.themoviedb.org/person/${c.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="carouselItem"
        key={c.id}
        title={c.name}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
      <img 
        src={c.profile_path ? `${img_300}/${c.profile_path}`:noPicture} 
        alt={c?.name} 
        onDragStart={handleDragStart}
        className='carouselItem_img'
      />
      <b className='carouselItem_txt'>{c?.name}</b></a>
  ));
  
  const responsive ={
    0: {
      items:3,
    },
    512: {
      items:5,
    },
    1024: {
      items:7,
    },
  }

  return (
    <AliceCarousel 
      autoPlay
      animationDuration={2000}
      responsive={responsive} 
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking 
      items={items} 
    />
  );
}

export default Carousel;