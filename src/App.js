import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Artest from './Pages/Artest/Artest'
import Song from './Pages/Song/Song';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { createContext,  useState } from 'react';
import ArtestAlbums from './Pages/ArtestAlbums/ArtestAlbums';
import Chart from './Pages/Chart/Chart';

const Layout = ()=> {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children : [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/artest/:id',
        element: <Artest />
      },
      {
        path: '/artest/:artistId/albums/:id',
        element: <ArtestAlbums />
      },
      {
        path: '/song/:id',
        element: <Song />
      },
      {
        path: '/chart/:country/:city/:genres/:id',
        element: <Chart />
      },
    ]
  }
]);

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

function App() {

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
       <RouterProvider router={router} />
    </globalSates.Provider>
  );
}

export default App;
