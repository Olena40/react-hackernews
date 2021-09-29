import React, {useState, useEffect} from 'react'
import './NewsArticle.css';

function NewsArticle() {

    const [search, setSearch] = useState();
    const [article, setArticle] = useState([]);
    const [input, setInput] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Function to handle Loading spinner - L. 9, 22 
    const loadingHandler = (state) => {
      setLoading(state)
      setTimeout(() => {setLoading(false); return loading}, 1500);
    }

    // Fetching the data from API, with search and pagination
    useEffect(() => {
      fetch(`http://hn.algolia.com/api/v1/search?query=${search}&hitsPerPage=30&page=${page}`)
        .then((res) => res.json())
        .then(loadingHandler(true))
        .then((json) => setArticle(json.hits))
        .catch((err) => alert(err))
    },[search, page])

    // Handles the click on the search-button - L. 45
    const handleSearch = (e) => {
      e.preventDefault();
      setSearch(input); // First put it into "input", then into search
    }

    // Slicing the dateString from API into day, month, year - L. 58
    const dateFormatHandler = (dateString) => {
      const day = dateString.substr(8, 2);
      const month = dateString.substr(5, 2);
      const year = dateString.substr(0, 4);

      return `${day}.${month}.${year}`;
    }

    return (
      <>
        {loading && <div className="loading-overlay"><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
        <div className="header">
          <form className="search" onSubmit={handleSearch}>
            <input type="search" id="searchInput" onChange={(e) => setInput(e.target.value)}/>
            <input type="submit" value="Search"/>
          </form>
        </div>
        <div className="container">
          <ul>
            {article.map((i) => 
              <li className="list-item">
                {<a href="{i.link}">{i.title}</a>} <br/>
                <ul className="sub-list">
                  <li>Author: {i.author} | </li>
                  <li>Created: {dateFormatHandler(i.created_at)} | </li>
                  <li>topic: {search}</li>
                </ul>
              </li>
            )}
          </ul>
          <div className="pagination">
            {(page <= 1) && (
              <span className="page-down">◀️</span>
            )}
            {(page > 1) && (
              <span className="page-down" onClick={() => setPage(page - 1)}>◀️</span>
            )}
            
            <div className="pagination-count"> {page} </div>
            <span className="page-up" onClick={() => setPage(page + 1)}>▶️</span>
          </div>
        </div>
      </>
    )
}

export default NewsArticle
