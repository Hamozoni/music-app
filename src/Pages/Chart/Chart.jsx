import TopNav from "../../Components/TopNav/TopNav";
import "./Chart.scss";
import ChartCarts from "../../Components/ChartCarts/ChartCarts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import {shazamData4 }from "../../Utils/Fetch";
import Error from "../../Components/Error/Error";

const Chart = ()=> {

    const {country, id } = useParams();

    const [chartsData,setChartsData] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [error,setError] = useState("");


    useEffect(()=> {
            setIsloading(true);
            setError(null);
            shazamData4(`charts/track?listId=${id}`)
            .then((data)=> {
               
                setChartsData(data.data.tracks);
                console.log(data);
            })
            .catch((error)=>{
                setError(error);
            })
            .finally(()=> {
                setIsloading(false)
            })
    },[id]);

    return (
        error ? <Error error={error} /> :
        <div className="chart-p">
            <TopNav data={ chartsData } />
            {
                isLoading ? <Loading /> :
                ( 
                   <div className="container">
                       <ChartCarts title={`the must track in ${country}`} data={chartsData} pFrom={"chart"}/>
                    </div>
                )
                
            }
        </div>
    );
};

export default Chart;