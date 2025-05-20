import { useEffect, useState } from "react";
import useGenre from "../../hooks/useGenre";
import Genres from "../../components/Genres/Genres";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SearchBar from "../../components/SearchBar/SearchBar";

const Series = () =>{
    const key = process.env.REACT_APP_API_KEY;
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    const [searchText, setSearchText] = useState("")

    const fetchSeries = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
        );
        const data = await response.json();
        console.log(data)
        setContent(data.results);
        setnumOfPages(500);
    };  

    useEffect(() => {
        if (searchText.trim()) {
            fetchSearch();
        } else {
            fetchSeries();
        }
    }, [page, genreforURL, searchText]);

    const fetchSearch = async() => {
        if (!searchText.trim()) {
            fetchSeries();
            return;
        };
        const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        const data = await response.json();
        console.log(data)
        console.log(response)
        setContent(data.results)
        setnumOfPages(data.total_pages);
    };  
    
    const handleSearch = () => {
        setPage(1); // reset to first page on new search
        fetchSearch();
    };

    return (
        <div>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                genres={genres}
                setSelectedGenres={setSelectedGenres}
                setGenres={setGenres}
                setPage={setPage}
            /> 
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                onSearch={handleSearch}
            />
            <div className="trending">
                {content && content.map((c)=>(
                    <DisplayItem key={c.id} c={c} media_type="tv"/>
                    ))
                }
            </div>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
            
        </div>
    )
}
export default Series;