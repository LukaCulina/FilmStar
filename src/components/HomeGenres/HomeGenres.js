import * as React from 'react';
import { useEffect, useState } from "react";

export default function HomeGenres({id}) {
  const key = process.env.REACT_APP_API_KEY;  
  const [details, setDetails] = useState([]);
  
    const fetchDetails = async() => {
        if(id){
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
            )
            const data = await response.json();
            setDetails(data);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id])

  return (
    <>   
        {details.genres &&
            details.genres.slice(0, 5).map((genre, i) => (
            <span key={i} className="home_genre">
                {genre.name}
            </span>
        ))}
    </>
  );
}
