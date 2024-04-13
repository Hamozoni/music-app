import { useContext, useEffect, useRef, useState } from "react";
import ChartCarts from "../../Components/ChartCarts/ChartCarts";
import { shazamData5 } from "../../Utils/Fetch";
import "./Home.scss";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";

import video1 from "../../Assets/dj-1258.mp4";
import ArtestsCard from "../../Components/ArtestsCard/ArtestsCard";

import { useNavigate } from "react-router-dom";
import Error from "../../Components/Error/Error";
import { globalSates } from "../../Context/Context";

const Home = ()=> {
    const navigate = useNavigate()

    const {state} = useContext(globalSates);

    const title = "Global Top 200 Chart";

    const [chartsData,setChartsData] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [error,setError] = useState(null);
     
    useEffect(()=> {
            setIsloading(true);
            shazamData5(`charts/track?listId=${state?.listId}`)
            .then((data)=> {
                console.log(data?.data?.tracks);
                setChartsData(data.data.tracks)
                
            })
            .catch((error)=>{
                setError(error);
            })
            .finally(()=> {
                setIsloading(false)
            })

    },[state?.listId]);

    const chartVideo = useRef()

    return (
         error ? <Error error={error} /> :
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
                        <div className="view-chart overlay">
                            view chart
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ArtestsCard data={chartsData}/>
                    <ChartCarts title={title} data={chartsData} pFrom={"chart"}/>
                </div>
            </>
            }
            </div>
    )
};

export default Home;