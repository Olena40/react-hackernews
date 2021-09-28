import React, {useState, useEffect} from 'react'

function NewsArticle() {

    const [search, setSearch] = useState('linux');
    const [article, setArticle] = useState([]);
    const [input, setInput] = useState();


console.log(article)
    useEffect(() => {
      fetch(`http://hn.algolia.com/api/v1/search?query=${search}`)
        .then((res) => res.json())
        .then((json) => setArticle(json.hits))
        .catch((err) => console.log('Error!: ', err))
    },[])

    const handleSearch = (e) => {
      e.preventDefault()
      setSearch(input)
    }



    return (
      <>
        <div className="app">
          <form onSubmit={handleSearch}>
            <input type="search" id="searchInput" onChange={(e) => setInput(e.target.value)}/>
            <input type="submit" value="Search"/>
          </form>
        </div>
        <div className="container">
          <ul>
            {article.map((i) =>  <li>{i.title}</li>)}
          </ul>
        </div>
      </>
    )
}

export default NewsArticle
