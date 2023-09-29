import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shazamData } from "../../FetchData/Fetch";
import { shazamData1 } from "../../FetchData/Fetch";
import "../Artest/Artest.scss";
import "./Song.scss";
import img1 from "../../Images/audio-2.jpg";
import AudiotrackRoundedIcon from "@mui/icons-material/AudiotrackRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import Loading from "../../Components/Loading/Loading";
import ReactPlayer from "react-player";
import TopSongsByAtrest from "../../Components/TopSongsByArtest/TopSongsByArtest";
import { globalSates } from "../../App";
import AudioPlayer from "../../Components/AudioPlayer/AudioPlayer";
import { setCurrentSong } from "../../App";
import Error from "../../Components/Error/Error";


const Song = ()=> {

    const navigate = useNavigate();

    const [state,setState] = useContext(globalSates);
    const { id } = useParams();
    
    const [isLoading,setIsloading] = useState(true);
    const [songDetails,setSongDetainls] = useState([]);
    const [songData,setSongData] = useState([]);
    const [songDetails2,setSongDetainls2] = useState([]);
    const [songData2,setSongData2] = useState([]);
    const [isShowLyr,setIsShowlyr] = useState(false);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");

    useEffect(()=>{
        setIsloading(true);
        setIsError(false);
        setSongData([])
        shazamData(`songs/get-details?key=${id}`)
        .then(data => {
            if(data){
                setSongDetainls(data?.data);
                setSongData([
                    {
                        artestImg: data?.data?.images?.background,
                        artestName: data?.data?.subtitle,
                        songTitle: data?.data?.title,
                        audioSrc  : data?.data?.hub?.actions ? data?.data?.hub?.actions[1]?.uri : "unknown",
                        songKey: data?.data?.key,
                        artists : data?.data?.artists[0]?.adamid,
                    }
                ])
                setIsloading(false);
            }
        })
        .catch( error => {
            setIsError(true);
            setError(error);
        });
        
        setSongData2([])
        shazamData1(`songs/v2/get-details?id=${id}`)
        .then(data => {
            if(!data?.data?.errors){
                setSongDetainls2(data?.data?.data[0]);
                setSongData2([
                    {
                        artestImg:  data?.data?.data[0]?.attributes?.artwork?.url?.replace("{w}x{h}","400x400"),
                        artestName: data?.data?.data[0]?.attributes?.artistName,
                        songTitle:  data?.data?.data[0]?.attributes?.name,
                        audioSrc  : data?.data?.data[0]?.attributes?.previews[0]?.url,
                        songKey:    data?.data?.data[0]?.attributes?.id                    ,
                        artists  :  data?.data?.data[0]?.relationships?.artists?.data[0]?.id,
                    }
                ])
                setIsloading(false);
            }
        })
        .catch( error => {
            setIsError(true);
            setError(error);
        })

    },[id]);

    return (
        isError ? <Error error={error} /> :
        <div className="artest">
            {
                isLoading ? <Loading /> : (
                <div
                    className="artest-page" 
                    style={{backgroundColor: `#${songDetails2?.attributes?.artwork?.bgColor}`,
                        color : `#${songDetails2?.attributes?.artwork?.textColor1}`}}
                    >
                    <div className="container">
                        <div className="artest-img-box">
                            <img 
                                src={ songData.length ? songData[0].artestImg : songData2.length ? songData2[0]?.artestImg : img1}
                                alt={ songData.length  ? songData[0]?.songTitle : songData2[0]?.songTitle } 
                            />
                            <div className="overlay">
                                <div className="icon" onClick={ ()=> setCurrentSong(setState,state,songData.length ? songData : songData2 ,0,"song") } >
                                    {
                                        state.isPause ?   <PlayArrowRoundedIcon /> : <PauseRoundedIcon />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="artest-info" >
                            <div className="top-info" >
                                <h4 className="artest-name" onClick={()=> navigate(`/artest/${songData.length ? songData[0].artists : songData2[0].artists}`)}>
                                    { songData.length  ? songData[0]?.artestName : songData2[0]?.artestName}
                                </h4>
                                <h4 className="ar-genr"> 
                                    {songData.length ? songData[0]?.songTitle : songData2[0]?.songTitle}
                                </h4>
                                <h5>
                                    { songDetails.length ? songDetails?.genres?.primary : songDetails2?.attributes?.genreNames[0]}
                                </h5>
                            </div>
                            <div className="view-share">
                                <div
                                    className="view" 
                                    style={{backgroundColor: `#${songDetails2?.attributes?.artwork?.bgColor}`,
                                        color : `#${songDetails2?.attributes?.artwork?.textColor1}`
                                    }}
                                >
                                    <div className="icon">
                                        <AudiotrackRoundedIcon />
                                    </div>
                                    <h5 className="vie-t">play full song</h5>
                                </div>
                                <div
                                    className="share"
                                    style={{backgroundColor: `#${songDetails2?.attributes?.artwork?.textColor1 }`,
                                        color : `#${songDetails2?.attributes?.artwork?.bgColor}`
                                    }}
                                >
                                    <ShareRoundedIcon />
                                    <h5 className="shar-t">shares</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> )
            }
            {   songData.length  ?
                <div className="nav-video-lyr">
                    { isLoading ? <Loading /> :
                    <div className="container">
                        <nav className="song-nav">
                            <div className={!isShowLyr ? "active vid" : "vid"} onClick={()=> setIsShowlyr(false)}>
                                <h4>music video</h4>
                            </div>
                            <div className={isShowLyr ? "active lyr" : "lyr"} onClick={()=> setIsShowlyr(true)}>
                                <h4>lyrics</h4>
                            </div>
                        </nav>
                        <div className="music-video" >  
                            <div className={isShowLyr ? "active video" : "video"} >
                            {
                                songDetails?.sections?.map((vid,i) => (
                                    vid.type.toUpperCase() === "VIDEO" ? 
                                    <div key={i}   className="video-container" >
                                        <ReactPlayer
                                            height="100%" width="100%"
                                            url={ vid?.youtubeurl?.actions[0]?.uri}
                                            autoPlay controls
                                        /> 
                                    </div> : ""    
                                )) 
                                }
                            </div> 
                            <div className="lyr-container">
                                {
                                    songDetails?.sections?.some(val=> val.type.toUpperCase()  === "LYRICS" ) ? 
                                    songDetails?.sections?.map((lyr,i) => (
                                        lyr.type.toUpperCase() === "LYRICS" &&
                                        <div key={i} className="lyrics">
                                            <ul>
                                                { 
                                                    lyr?.text?.map((lyric,i) => (
                                                        <li key={i} className={lyric === "" ? "space" : ""}>{lyric}</li>
                                                    ))
                                                }
                                            </ul>
                                            <footer>
                                                <p>{lyr?.footer ? lyr?.footer : ""}</p>
                                            </footer>
                                        </div>                               
                                    ))
                                    : 
                                    <div className="not-found-lyr">
                                    <h5>no lyrics to show</h5>
                                    </div>
                                } 
                            </div>  
                        </div>
                    </div>
                    }
                </div>  
                : ""
            }  
            <div className="container">
                {
                    isLoading ? <Loading /> :
                    <TopSongsByAtrest id={ songData.length ? songData[0]?.artists : songData2[0]?.artists }/>
                }
                {
                  state?.isSongPlaying ?
                    <AudioPlayer /> : ''
                }
            </div>
        </div>    
    )
};

export default Song;