import { useEffect, useState } from "react";
import PopularCarousel from '../../components/Carousel/PopularCarousel';
import TopRatedCarousel from '../../components/Carousel/TopRatedCarousel';
import { img_500, unavailableLandscape } from "../../config/config";
import HomeGenres from '../../components/HomeGenres/HomeGenres';
import './Home.css'

export default function Home() {
  const key = process.env.REACT_APP_API_KEY;  
  const [banner, setBanner] = useState([]);
  
  const fetchContent = async() =>{
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${key}&include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`
    )
    const data = await response.json();
    //Odabir nasumičnog filma
    const banner_movie = data.results[Math.floor(Math.random() * data.results.length)];
    setBanner(banner_movie);
    }

    useEffect(() => {
        fetchContent();
    }, [])

    const shortenString = (text, WordNum) => {
      if(text){
        const words = text.split(' ');
        const shortened = words.slice(0, WordNum).join(' ');
        return shortened + (words.length > WordNum ? '...' : '');
      }
      return '';
    };

  return (
    <>   
    <div className='banner_container'>
      <img
          className="banner_image"
          src={banner.backdrop_path
            ? `${img_500}/${banner.backdrop_path}` 
            : unavailableLandscape}   
          alt={banner.title}
        />
        <div className='home_banner'>
          <h1 className='banner_title'>{banner.title}</h1>
          <span className='details'>
            <HomeGenres id={banner.id}></HomeGenres>
          </span>
          <p className='banner_overview details'>
            {shortenString(banner?.overview, 25)}
          </p>
        </div>
      </div>
      <div>
          <PopularCarousel  media_type="movie"/>
      </div>
      <div>
          <PopularCarousel  media_type="tv"/>
      </div>
      <div>
          <TopRatedCarousel  media_type="movie"/>
      </div>
      <div>
          <TopRatedCarousel  media_type="tv"/>
      </div>
    </>
  );
}
