import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Artest from './Pages/Artest/Artest'
import Song from './Pages/Song/Song';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { useContext} from 'react';
import ArtestAlbums from './Pages/ArtestAlbums/ArtestAlbums';
import Chart from './Pages/Chart/Chart';
import AudioPlayer from './Components/AudioPlayer/AudioPlayer';
import { globalSates } from './Utils/Context';


const App = ()=> {
  
  const {state} = useContext(globalSates);

  return (
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
  );
}

export default App;
