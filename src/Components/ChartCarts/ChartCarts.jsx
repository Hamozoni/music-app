import "./ChartCarts.scss";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import img1 from "../../Assets/audio-2.jpg"

import { useContext} from "react";
import { useNavigate } from "react-router-dom";

import { globalSates } from "../../Context/Context";


const Chart = ({ title, data , pFrom })=> {

    const navigate = useNavigate();
    const {state, setState, setCurrentSong} = useContext(globalSates);

    return (
        <section className="chart-carts">
            <h5 className="chart-title">
              { title }
            </h5>
            <div className="chart-container">
                {data?.map((chart,i)=>(
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
                            <img src={chart?.images?.background ? chart?.images?.background : img1} alt={chart?.title} />
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
                                onClick={()=> navigate(`/song/${chart?.key}`)}
                             >
                                {chart?.title }
                            </h4>
                            <h4 className="subtitle"
                                onClick={()=> navigate(chart.artists !== null && `/artest/${chart.artists[0].adamid}`)}
                            >
                                {chart?.subtitle}
                            </h4>
                        </div>
                    </div>
                ))}
                </div>
        </section>
    );
};

export default Chart;