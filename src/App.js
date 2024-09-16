import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Artest from './Pages/Artest/Artest'
import Song from './Pages/Song/Song';
import Footer from './Layouts/Footer/Footer';
import Header from './Layouts/Header/Header';
import { useContext} from 'react';
import ArtestAlbums from './Pages/ArtestAlbums/ArtestAlbums';
import AudioPlayer from './Layouts/AudioPlayer/AudioPlayer';
import { globalSates } from './Context/Context';


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
