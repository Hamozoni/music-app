import { useEffect, useState } from "react";
import { shazamData4 } from "../../Utils/Fetch";
import Loading from "../Loading/Loading";
import ChartCarts from "../ChartCarts/ChartCarts";
import Error from "../Error/Error";


const TopSongsByAtrest = ({id}) => {

    const [artesTopSongs,setArtesTopSongs] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);
  
    useEffect(() => {
        setError(null);
        setIsLoading(true);
        setArtesTopSongs([]);
        shazamData4(`artists/get-top-songs?id=${id}`)
        .then( data => {
            setArtesTopSongs(data.data.data);
            console.log(data)
        })
        .catch((error)=>{
          setError(error);
        })
        .finally(()=> {
           setIsLoading(false);
        })
    }, [id]);

  return (
    error ? <Error error={error} /> :
    <>
      {
        isLoading ? <Loading /> : 
        <ChartCarts
          data={artesTopSongs}
          title={`top songs by ${artesTopSongs[0]?.artestName}`}
          pFrom={"artestTopS"}
      />
      }
    </>  
  );
};

export default TopSongsByAtrest;
