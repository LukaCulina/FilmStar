import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Genres.css'

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const key = process.env.REACT_APP_API_KEY;

    const handleAdd=(genre)=>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g)=>g.id!==genre.id))
        setPage(1);
    }

    const handleRemove=(genre)=>{
        setSelectedGenres(
            selectedGenres.filter((selected)=>selected.id!==genre.id))
        setGenres([...genres, genre]);
        setPage(1);
    }

    const sortSelectedGenres = (selectedGenres) => {
        return selectedGenres.slice().sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    };

    const sortGenres = (genres) => {
        return genres.slice().sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    };

    const fetchGenres = async() =>{
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${key}&language=en-US`
        )
        const data = await response.json();
        console.log(data);
        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();
        return ()=>{
            setGenres({})
        };
    }, [])

    useEffect(() => {
        const sortedSelectedGenres = sortSelectedGenres(selectedGenres);
        setSelectedGenres(sortedSelectedGenres);
    
        const sortedGenres = sortGenres(genres);
        setGenres(sortedGenres);
    }, [selectedGenres, genres]);

    const genreChips = Array.isArray(genres)
        ? genres.map((genre) => (
            <Chip
                label={genre.name}
                style={{ margin: 4, padding: 5, fontSize: 17, height: 30 }}
                clickable
                size="small"
                key={genre.id}
                onClick={() => handleAdd(genre)}
            />
        ))
  : [];

    const selectedGenreChips = Array.isArray(selectedGenres)
        ? selectedGenres.map((genre) => (
            <Chip
                label={genre.name}
                style={{ margin: 4, padding: 5, fontSize: 17, height: 30 }}
                clickable
                size="small"
                color="primary"
                key={genre.id}
                onDelete={() => handleRemove(genre)}
            />
        ))
    : [];

    const allGenreChips = [...selectedGenreChips, ...genreChips];
  
    const responsive = {
        0: {
            items:3,
        },
        512: {
            items:5,
        },
        1024: {
            items:10,
        },
    }
    
    return(
        <div className="genres_carousel">
            <AliceCarousel
                disableDotsControls
                disableButtonsControls
                mouseTracking 
                responsive={responsive}
                items={allGenreChips} >
            </AliceCarousel>  
        </div>
    )
}
export default Genres;