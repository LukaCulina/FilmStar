import { useEffect, useState, useRef } from "react";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () =>{
    const key = process.env.REACT_APP_API_KEY;
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchText, setSearchText] = useState("");

    const genreforURL = useGenre(selectedGenres);
    
    const fetchMovies = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
        )
        const data = await response.json();
        console.log(data)
        setContent(data.results);
        setnumOfPages(500);
    };  
 
    useEffect(()=>{
        fetchMovies();
    },[page, genreforURL])

    const fetchSearch = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            )
        const data = await response.json();
        console.log(data)
        console.log(response)
        data.length !==0 ? setContent(data.results):setContent(0)
        setnumOfPages(data.total_pages);
    };  
    const ref = useRef(null);
    const EnterKeyPress = (event) => {
        if (event.key === "Enter") {
            fetchSearch(searchText);
            ref.current.value = '';
        }
      }; 

    return (
        <div>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                genres={genres}
                setSelectedGenres={setSelectedGenres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="search_bar">
                <input 
                    type="text" 
                    ref={ref}
                    placeholder="Search..." 
                    className="search"
                    onChange={(e)=> {
                        setSearchText(e.target.value);
                        }
                    }
                    onKeyDown={EnterKeyPress}
                />
            </div>
            <div className="trending">
                {content && content.map((c)=>(
                    <DisplayItem key={c.id} c={c} media_type="movie"/>
                ))}
            </div>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
            
        </div>
    )
}

export default Movies;