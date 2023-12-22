import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Artest from './Pages/Artest/Artest'
import Song from './Pages/Song/Song';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { createContext,  useState } from 'react';
import ArtestAlbums from './Pages/ArtestAlbums/ArtestAlbums';
import Chart from './Pages/Chart/Chart';
import AudioPlayer from './Components/AudioPlayer/AudioPlayer';


export const globalSates = createContext();

export const setCurrentSong = (setState,state,data,i,from)=> {
  setState({
      ...state,
      songLength : data.length,
      songIndex: i,
      isSongPlaying: true,
      playingFrom: from,
      isPause: false,
      playingSong : data
  })
  if(state.isSongPlaying && 0 === state.songIndex && state.playingFrom ===  from) {
      setState({
          ...state,
          isPause: !state.isPause,
      })
  }
};

const App = ()=> {

window.addEventListener("scroll",()=>{
    if(window?.scrollY < 20 ) {
      document.getElementById("header").classList.add("trans");
     }else{
      document.getElementById("header").classList.remove("trans");
     }
})

  const [state,setState] = useState({
    isSongPlaying: false,
    playingSong: [],
    songIndex: 0,
    songLength: 0,
    playingFrom: "chart",
    isPause: true,
    listId: "genre-global-chart-2"
  });

  return (
    <globalSates.Provider value={[state,setState]}>

      <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/artest/:id' element={<Artest />}/>
            <Route path='/artest/:artistId/albums/:id' element={<ArtestAlbums />}/>
            <Route path='/song/:id' element={<Song />}/>
            <Route path='/chart/:country/:city/:genres/:id' element={<Chart />}/>
        </Routes>
          <Footer />
          { 
            state?.isSongPlaying ?
            <AudioPlayer /> : ''
          }
      </BrowserRouter>
       {/* <RouterProvider router={router} /> */}

    </globalSates.Provider>
  );
}

export default App;
