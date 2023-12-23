import { useContext, useEffect, useRef, useState } from "react";
import ChartCarts from "../../Components/ChartCarts/ChartCarts";
import { shazamData5 } from "../../FetchData/Fetch";
import "./Home.scss";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";

import video1 from "../../videos/particles.mp4";
import ArtestsCard from "../../Components/ArtestsCard/ArtestsCard";

import { globalSates } from "../../App"
import { useNavigate } from "react-router-dom";
import TopNav from "../../Components/TopNav/TopNav";
import Error from "../../Components/Error/Error";

const Home = ()=> {
    const navigate = useNavigate()

    const [state] = useContext(globalSates);

    const title = "Global Top 20 Chart";

    const [chartsData,setChartsData] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");
     
    useEffect(()=> {
            setIsloading(true);
            setIsError(false);
            setChartsData([]);
            shazamData5(`charts/track?listId=${state?.listId}`)
            .then((data)=> {
                    const trackData = data.data.tracks
                    for(let i = 0; i <  trackData.length; i++){
    
                        setChartsData((prev)=>{
                            return [...prev,
                            {
                                artestImg: trackData[i]?.images?.background,
                                artestName: trackData[i]?.subtitle,
                                songTitle: trackData[i]?.title,
                                audioSrc  : trackData[i]?.hub?.actions ? trackData[i]?.hub?.actions[1]?.uri : "unknown",
                                artists: trackData[i]?.artists ? trackData[i]?.artists[0]?.adamid : "unknown",
                                songKey: trackData[i]?.key
                            }]
                        })
                }
                setIsloading(false)
            })
            .catch((error)=>{
                setIsError(true);
                setError(error);
            });

    },[state?.listId]);

    const chartVideo = useRef()

    return (
         isError ? <Error error={error} /> :
            <div className="home">
            {isLoading ? <Loading /> :
            <>
                <HomeSlider data={chartsData} />
                <div className="video-player" 
                    onClick={()=> navigate(`chart/global/all/pop/genre-global-chart-1`)}>
                    <div className="container">
                        <video ref={chartVideo} muted autoPlay  onEnded={()=> chartVideo.current.play()} >
                            <source src={video1} />
                        </video>
                        <div className="view-chart">
                            view chart
                        </div>
                    </div>
                </div>
                <div className="container">
                    <TopNav data={chartsData} />
                    <ArtestsCard data={chartsData}/>
                    <ChartCarts title={title} data={chartsData} pFrom={"chart"}/>
                </div>
            </>
            }
            </div>
    )
};

export default Home;