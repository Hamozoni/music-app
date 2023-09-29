import { useEffect, useState } from "react";
import { shazamData4 } from "../../FetchData/Fetch";
import Loading from "../Loading/Loading";
import ChartCarts from "../ChartCarts/ChartCarts";
import Error from "../Error/Error";


const TopSongsByAtrest = ({id}) => {

    const [artesTopSongs,setArtesTopSongs] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");
  
    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        setArtesTopSongs([]);
        shazamData4(`artists/get-top-songs?id=${id}`)
        .then( data => {
            const trackData = data.data.data;
            for(let i = 0; i <  trackData.length; i++){
              setArtesTopSongs((prev)=>{
                    return [...prev,
                    {
                        artestImg: trackData[i]?.attributes?.artwork?.url.replace("{w}x{h}","200x200"),
                        artestName: trackData[i]?.attributes?.artistName,
                        songTitle: trackData[i]?.attributes?.name,
                        audioSrc  : trackData[i]?.attributes?.previews ? trackData[i]?.attributes?.previews[0]?.url : "unknown",
                        songKey: trackData[i]?.id,
                        artists: id,
                    }]
                })
            }
            setIsLoading(false);
        })
        .catch((error)=>{
          setIsError(true);
          setError(error);
        })
    }, [id]);

  return (
    isError ? <Error error={error} /> :
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
