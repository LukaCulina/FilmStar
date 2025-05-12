import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import { useEffect, useState } from "react";
import InfoModal from '../Info/Info';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const PopularCarousel = ({media_type}) => {
    const key = process.env.REACT_APP_API_KEY;
    const [content, setContent] = useState([]);

    const fetchData = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/${media_type}?api_key=${key}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`
        )
        const data = await response.json();
        setContent(data.results);
    };  
        
    useEffect(()=>{
        fetchData();
    },[])

    const items = content?.map((c) =>(
        <InfoModal id={c.id} media_type={media_type} keyword="home" c={c}>
            <div className='carouselItem'>
                <img 
                    src={c.poster_path ? `${img_300}/${c.poster_path}`:noPicture} 
                    alt={c.name || c.title} 
                    onDragStart={handleDragStart}
                    className='carouselItem_img_home'
                />
                <b className='carouselItem_txt'>
                    {c.name || c.title}
                </b>
            </div>
        </InfoModal>
    ))
    
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
        <div className='tray'>
            <div className='genre'>
               <span>Popular {media_type === "movie" ? `movies` : `series`}</span> 
            </div>
            <AliceCarousel  
                /* autoPlay */
                animationDuration={2000}
                responsive={responsive} 
                infinite
                disableDotsControls
                disableButtonsControls
                mouseTracking 
                items={items}> 
            </AliceCarousel>
        </div>
    );
}
export default PopularCarousel;

