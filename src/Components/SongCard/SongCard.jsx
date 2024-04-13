import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { globalSates } from "../../Context/Context";
import "../ChartCarts/ChartCarts.scss"

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import img1 from "../../Assets/audio-2.jpg"

const SongCard = ({data,title,pFrom,artistId}) => {

    const navigate = useNavigate();
    const {state, setState, setCurrentSong} = useContext(globalSates);

  return (
    <section className="chart-carts">
        <h5 className="chart-title">
        { title }
        </h5>
        <div className="chart-container">
            {data?.map((song,i)=>(
                <div key={i} 
                    className={state.playingFrom === pFrom &&
                    state?.isSongPlaying && i === state.songIndex ? 
                    "chart-box active " :"chart-box" } >
                    <div className="counter">
                        {i + 1}
                    </div>
                    <div className="chart-image"  
                        onClick={()=> setCurrentSong(setState,state,data,i,pFrom)} 
                        >
                        <img src={song?.attributes.artwork?.url ? song?.attributes.artwork?.url.replace('{w}x{h}','100x100') : img1} alt={song?.attributes?.artistName} />
                        <div
                            className={state.playingFrom === pFrom &&
                            state?.isSongPlaying && i === state.songIndex ? 
                            "play-icon active " :"play-icon" }
                        >
                        { i === state.songIndex &&
                            state.playingFrom === pFrom &&
                            state.isSongPlaying &&
                            !state.isPause ? 
                            < PauseRoundedIcon /> :
                            <PlayArrowRoundedIcon />
                            }
                        </div>
                    </div>
                    <div className="chart-titles">
                        <h4 className="title" 
                            onClick={()=> navigate(`/song/${song?.id}`)}
                        >
                            {song?.attributes?.name }
                        </h4>
                        <h4 className="subtitle"
                            onClick={()=> navigate(song.artists !== null && `/artest/${artistId}`)}
                        >
                            {song?.attributes?.artistName}
                        </h4>
                    </div>
                </div>
            ))}
            </div>
    </section>
  )
}

export default SongCard