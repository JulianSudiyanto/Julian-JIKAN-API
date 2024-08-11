import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import {AnimeList} from "./components/AnimeList";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState([]);

  const GetTopAnime = async () => {
      const temp = await fetch(`https://api.jikan.moe/v4/top/anime`)
        .then(response => response.json());
      SetTopAnime(temp.data.slice(0, 5));
  };

  
useEffect(() => {
  GetTopAnime();

  
},[]);

  const HandleSearch = e =>{
    e.preventDefault();

    FetchAnime(search);
  }

  const FetchAnime = async(query) => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc&limit=10`)
    .then(response => response.json());

    SetAnimeList(temp);
  
  }

  return (
    <div className="App">
      <Header />
      <div className='content-wrap'> 
        <Sidebar topAnime={topAnime} />
        <MainContent 
          HandleSearch = {HandleSearch}
          search = {search}
          SetSearch = {SetSearch}
          animeList = {animeList} />
      </div>
    </div>
  )
};

export default App;