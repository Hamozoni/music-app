import { useEffect, useState } from "react";
import { shazamData,shazamData1,shazamData2} from "../../Utils/Fetch";
import AudiotrackRoundedIcon from "@mui/icons-material/AudiotrackRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import "./Artest.scss";
import img1 from "../../Assets/audio-2.jpg";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import AlbumsCard from "../../Components/AlbumsCard/AlbumsCard";
import LatestAlbum from "../../Components/AlbumsCard/LatestAlbum";
import TopSongsByAtrest from "../../Components/TopSongsByArtest/TopSongsByArtest";
import Error from "../../Components/Error/Error";

const Artest = () => {

  const { id } = useParams();

  const [artestDetails, setArtestDetails] = useState({});
  const [latestSongs, setLatestSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [albumId,setAlbumId] = useState(null);
  const [isError,setIsError] = useState(false);
  const [error,setError] = useState("");


  useEffect(()=>{
    setIsLoading(true);
    setIsError(false);
    shazamData(`artists/get-details?id=${id}`)
    .then((data)=>{
        setAlbumId(data?.data?.data[0]);
        setIsLoading(false);
    })
    .catch((error)=>{
      setIsError(true);
      setError(error);
    });

    shazamData1(`artists/get-latest-release?id=${id}`)
    .then( data => {
      setLatestSongs(data.data.data)
      setIsLoading(false);
    })
    .catch((error)=>{
      setIsError(true);
      setError(error);
    });

    shazamData2(`artists/get-summary?id=${id}`)
    .then((data) => {
      setArtestDetails(data?.data?.resources);
      setIsLoading(false);
    })
    .catch((error)=>{
      setIsError(true);
      setError(error);
    });

  },[id]);

  return (
    isError ? <Error error={error} /> :
    <div className="artest">
      {
        isLoading ? <Loading /> :
        <>
        <div className="artest-page"
              style={{
                  backgroundColor: `#${albumId?.attributes?.artwork?.bgColor}`,
                  color: `#${albumId?.attributes?.artwork?.textColor1}`,
              }}
        >
          <div className="container">
              <div className="artest-img-box">
                <img 
                  src={albumId?.attributes?.artwork?.url ? albumId?.attributes?.artwork?.url?.replace("{w}x{h}","200x200") : img1 }
                  alt={albumId?.attributes?.name}
                />
              </div>
              <div className="artest-info">
              <div className="top-info">
                  <h4 className="artest-name">{albumId?.attributes?.name}</h4>
                  <h4 className="ar-genr">{albumId?.attributes?.genreNames[0]}</h4>
              </div>
              <div className="view-share">
                  <div
                    className="view"
                    style={{backgroundColor: `#${albumId?.attributes?.artwork?.bgColor}`,
                        color : `#${albumId?.attributes?.artwork?.textColor1}`
                    }}
                  >
                    <div className="icon">
                        <AudiotrackRoundedIcon />
                    </div>
                    <h5 className="vie-t">view artest</h5>
                  </div>
                  <div
                    className="share"
                    style={{backgroundColor: `#${albumId?.attributes?.artwork?.textColor1 }`,
                        color : `#${albumId?.attributes?.artwork?.bgColor}`
                    }}
                  >
                    <ShareRoundedIcon />
                    <h5 className="shar-t">shares</h5>
                  </div>
              </div>
              </div>
          </div>
        </div>
        <div className="container">
           <TopSongsByAtrest id={id} />
          <div className="latest-song">
            <LatestAlbum data={latestSongs} data2={artestDetails?.albums} artistId={id} />
          </div>
          <AlbumsCard data={artestDetails?.albums} artistId={id} />
        </div>
        </>}
    </div>
  );
};

export default Artest;
