const SearchBar = ( { searchText, setSearchText, onSearch }) => {

    const EnterKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="search_bar">
            <input 
                type="text" 
                placeholder="Search..." 
                className="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={EnterKeyPress}
            />
        </div>
    );
};

export default SearchBar;