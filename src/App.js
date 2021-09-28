
import './App.css';
import Data from './Data/mockData.json'
import NewsArticle from './components/NewsArticle';

function App() {
 

//for(hints elem : title){
  //elem.println();
//}




    return (
    <div className="App">
    {/* <p>Hacker News</p>
    <input />
    <button >Search</button>
    
{Data.hits.map((article) =>  <div><a href = {article.url}>{article.title}</a></div>)} */}
    <NewsArticle/>
    </div>
  );
}

export default App;
