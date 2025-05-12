import { useEffect, useState, useRef } from "react";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () =>{
    const key = process.env.REACT_APP_API_KEY;
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [numOfPages, setnumOfPages] = useState();

    const fetchTrending = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&page=${page}`
        )
        const data = await response.json();
        console.log(data)
        setContent(data.results);
    };

    useEffect(()=>{
        fetchTrending();
    },[page])
    const fetchSearch = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&query=${searchText}&page=${page}&include_adult=false`
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
                    <DisplayItem key={c.id} c={c} media_type={c.media_type}/>
                    ))
                }
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending;