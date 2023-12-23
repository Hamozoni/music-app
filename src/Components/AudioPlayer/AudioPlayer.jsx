import './AudioPlayer.scss';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import Replay5RoundedIcon from '@mui/icons-material/Replay5Rounded';
import Forward5RoundedIcon from '@mui/icons-material/Forward5Rounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalSates } from '../../Utils/Context';

const AudioPlayer = () => {
    const navigate = useNavigate();


    const { state, setState } = useContext(globalSates);

    const audioSource = useRef();
    const durationValue = useRef();
    const soundVolume = useRef();
    const [isPlaying,setIsPlaying] = useState(true);
    const [duration,setDuration] = useState();
    const [currentTimeIs,setCurrentTimeIs] = useState();
    const [valumeLevel,setValumeLevel] = useState(10);
    const [showAudio,setShowAudio] = useState(true);

    useEffect(()=> {
        if(state.playingSong[state.songIndex]?.audioSrc && audioSource) {
            audioSource.current.src = state.playingSong[state.songIndex]?.audioSrc;
            audioSource.current.currentTime = 0;
            setIsPlaying(true)
        }else {
            audioSource.current.src = '';
        }
    },[state.playingSong,state.songIndex]);

    const getDuration = ()=> {
        setDuration(audioSource?.current?.duration)
        setCurrentTimeIs(audioSource?.current?.currentTime);
        durationValue.current.value = audioSource.current.currentTime;
        audioSource.current.volume = +valumeLevel / 100;
        soundVolume.current.value = +valumeLevel;

    };

    useEffect(()=> {
        if(!state.isPause) {
            const intervalId = setInterval(()=> {
                setCurrentTimeIs(audioSource.current.currentTime);
                durationValue.current.value = audioSource.current.currentTime;
                console.log("yes")
            },1000)            
           return ()=> clearInterval(intervalId);
        }
    },[currentTimeIs, state.isPause]);

    const pauseBtn = ()=> {
        audioSource.current.pause();
        setState({
            ...state,
            isPause: true,
        })
        setIsPlaying(false); 
    };

    const playBtn  = ()=> {
        audioSource.current.play();
        setState({
            ...state,
            isPause: false,
        })
        setIsPlaying(true); 
    };

    useEffect(()=>{
        if(!state.isPause){
            playBtn();
        }else {
            pauseBtn();    
        }
    },[state.isPause]);

    const getCurrentTimeValue = ()=> {
        audioSource.current.currentTime = durationValue.current.value ;
    }

    const getVolume = (e)=> {
        setValumeLevel(e.target.value);
        audioSource.current.volume = +e.target.value / 100;
    }

    const prevSong = ()=> {
        if(state.songIndex > 0) {
            setState({
                ...state,
                songIndex: state.songIndex -1,
                isPause: false,
            })
        } else {
            setState({
                ...state,
                songIndex: state.songLength - 1,
                isPause: false,
            })
        }
    };

    const nextSong = ()=> {
        if(state.songIndex < state.songLength - 1) {
            setState({
                ...state,
                songIndex: state.songIndex +1,
                isPause: false,
            })
        } else {
            setState({
                ...state,
                songIndex: 0,
                isPause: false,
            })
        }
    };

    const muteVal =()=> {
      
        if(+valumeLevel === 0) {
            setValumeLevel(30);
            audioSource.current.volume = 30 / 100;
            soundVolume.current.value = 30;
        }else {
            setValumeLevel(0);
            audioSource.current.volume = 0 / 100;
            soundVolume.current.value = 0;

        }
    }

    return (
        <div className={showAudio ? "active audio-player" : "audio-player"}>
                <div className="container">
                <div className="show-hide" onClick={()=> setShowAudio(!showAudio) }>
                   {
                    showAudio ? <KeyboardDoubleArrowDownRoundedIcon /> :
                    <KeyboardDoubleArrowUpRoundedIcon />
                   }
                </div>
                <div className="artest">
                    <div className="song-cover" >
                        <img
                            src={state.playingSong[state.songIndex]?.artestImg}
                            alt={state.playingSong[state.songIndex]?.songTitle}
                        />
                    </div>
                    <div className="song-content">
                        <h4 className="tite"
                            onClick={()=> navigate(`/song/${state.playingSong[state.songIndex]?.songKey}`)}
                        >
                            {state.playingSong[state.songIndex]?.songTitle}
                        </h4>
                        <h4 className="artest-name"
                            onClick={()=> navigate(state.playingSong[state.songIndex]?.artists && `/artest/${state.playingSong[state.songIndex]?.artists}`)}
                        >
                            {state.playingSong[state.songIndex].artestName}
                        </h4>
                </div>

                </div>
                <div className="controls">
                    <div className="counter">
                        <h5>{state.songIndex + 1} / {state.songLength}</h5>
                    </div>
                    <div className="duration">
                        <input type="range" 
                            className="dur-rang"
                            ref={durationValue}
                            max={duration}
                            onChange={getCurrentTimeValue}
                        />
                        <div className="min-max">
                            <span>{ parseInt(currentTimeIs / 60)  < 9 ? `0${parseInt(currentTimeIs / 60)}` :
                                parseInt(currentTimeIs / 60) || 0}:{parseInt(currentTimeIs % 60)|| 0 }
                            </span>
                            <span> {parseInt(duration / 60) < 9 ? `0${parseInt(duration / 60)}` :
                                parseInt(duration / 60) || 0}: {parseInt(duration % 60) || 0}
                            </span>
                        </div>

                    </div>
                    <div className="icons">
                        <div className="replay-5" onClick={()=> {
                            audioSource.current.currentTime -= 5;
                            durationValue.current.value = audioSource.current.currentTime;
                            }}>
                            <Replay5RoundedIcon />
                        </div>
                        <div className="prev-icon" onClick={prevSong}>
                            <SkipPreviousRoundedIcon />
                        </div>
                        <div className={isPlaying ? "active play-pause" : "play-pause"}>
                            { isPlaying ?
                            <div className="pause-icon" onClick={pauseBtn} >
                                    <PauseRoundedIcon /> 
                            </div> : 
                                <div className="play-icon" onClick={playBtn}>
                                    <PlayArrowRoundedIcon />     
                            </div>
                            }
                        </div>
                        <div className="next-icon" onClick={nextSong}>
                            <SkipNextRoundedIcon />
                        </div>
                        <div className="replay-5" onClick={()=> {
                            audioSource.current.currentTime += 5;
                            durationValue.current.value = audioSource.current.currentTime;
                            }}>
                            <Forward5RoundedIcon />
                        </div>
                    </div>
                </div>
                <audio
                    autoPlay
                    ref={ audioSource }
                    onLoadedMetadata={ getDuration }
                    onPlaying={(e)=> setCurrentTimeIs(e.target.currentTime) }
                    onEnded={ nextSong }
                >
                    <source
                        src={state.playingSong[state.songIndex]?.audioSrc ?
                            state.playingSong[state.songIndex]?.audioSrc : ''}
                    />
                </audio>
                <div className="valume">
                    <div className="level-icons" onClick={ muteVal }>
                        {
                            +valumeLevel === 0 ? 
                            <VolumeOffRoundedIcon /> : 
                            +valumeLevel > 0 && +valumeLevel < 50 ?
                            <VolumeDownRoundedIcon /> :
                            <VolumeUpRoundedIcon />
                        }
                    </div>
                    <input
                        className="volume-rang"
                        type="range"
                        min="0"
                        max="100"
                        onChange={(e)=> getVolume(e)}
                        ref={soundVolume}
                    />
                    <span>{valumeLevel}%</span>
                </div>
                <div className="close-player" onClick={()=>  {
                        setState({
                            ...state,
                            isSongPlaying : false,
                            isPause: true
                        })
                    }
                    }>
                    <CloseRoundedIcon />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;