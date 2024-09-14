import { useContext, useEffect, useState } from "react";
import ChartCarts from "../../Components/ChartCarts/ChartCarts";
import { shazamData5 } from "../../Utils/Fetch";
import "./Home.scss";
import Loading from "../../Components/Loading/Loading";
import ArtestsCard from "../../Components/ArtestsCard/ArtestsCard";

import Error from "../../Components/Error/Error";
import { globalSates } from "../../Context/Context";

const Home = ()=> {

    const {state} = useContext(globalSates);

    const title = "Global Top 200 Chart";

    const [chartsData,setChartsData] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [error,setError] = useState(null);
     
    useEffect(()=> {
            setIsloading(true);
            shazamData5(`charts/list?listId=${state?.listId}`)
            .then((data)=> {
                console.log(data);
                setChartsData(data.data.tracks)
                
            })
            .catch((error)=>{
                setError(error);
            })
            .finally(()=> {
                setIsloading(false)
            })

    },[state?.listId]);


    return (
         error ? <Error error={error} /> :
            <div className="home">
            {isLoading ? <Loading /> :
            <>
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