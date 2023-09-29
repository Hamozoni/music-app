import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { shazamData3 } from "../../FetchData/Fetch"
import Loading from "../../Components/Loading/Loading";
import ChartCarts from "../../Components/ChartCarts/ChartCarts";
import { globalSates } from "../../App";
import AudioPlayer from "../../Components/AudioPlayer/AudioPlayer";

import "./ArtestAlbums.scss";
import EditorP from "./EditorP/EditorP";
import AlbumsCard from "../../Components/AlbumsCard/AlbumsCard";
import Error from "../../Components/Error/Error";


const ArtestAlbums = ()=> {

    const location = useLocation();
    const navigate = useNavigate();

    const [state] = useContext(globalSates)

    const { id, artistId }= useParams();
    const [isLoading,setIsloading] = useState(true);
    const [albumTracks,setAlbumTracks] = useState([]);
    const [albumInfo,setAlbumInfo] = useState({});
    const [isAlbumNote,setIsAlbumNote] = useState(false);
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");

    useEffect(()=>{
                setAlbumTracks([])
                setIsloading(true)
                setIsError(false);
                shazamData3(`albums/get-details?id=${id}`)
                .then((data)=> {
                    setAlbumInfo(data?.data?.data[0]?.attributes)
                        const trackData = data?.data?.data[0]?.relationships?.tracks?.data
                        for(let i = 0; i <  trackData.length; i++){
        
                            setAlbumTracks((prev)=>{
                                return [...prev,
                                {
                                    artestImg: trackData[i]?.attributes?.artwork?.url.replace("{w}x{h}","400x200"),
                                    artestName: trackData[i]?.attributes?.artistName,
                                    songTitle: trackData[i]?.attributes?.name,
                                    audioSrc : trackData[i]?.attributes?.previews[0]?.url,
                                    artists: artistId,
                                    songKey: trackData[i]?.id
                                }]
                            })
                    }
                    setIsloading(false)
                })
                .catch((error)=>{
                    setIsError(true);
                    setError(error);
                });

    },[id])

    return(
        isError ? <Error error={error} /> :
        <div className="artest-albums">
            {
                isLoading ? <Loading /> : 
                <>
                {isAlbumNote ? <EditorP data={albumInfo} setIsAlbumNote={setIsAlbumNote}/> : ""} 
                <div className="album-pa">
                    <div className="about-alb" style={{backgroundColor: "#" + albumInfo?.artwork?.bgColor}}>
                        <div className="container">
                            <div className="img-box">
                                <img src={albumInfo?.artwork?.url?.replace("{w}x{h}","300x300")} alt={albumInfo?.artistName} />
                            </div>
                            <div className="alb-info">
                                <div className="alb-n-ar-n">
                                     <h4 className="alb-n"
                                        style={{color: "#" + albumInfo?.artwork?.textColor1}}>
                                        {albumInfo?.name}
                                     </h4>
                                     <h5 className="art-n" 
                                     onClick={()=> navigate(`/artest/${artistId}`)}
                                     style={{color: "#" + albumInfo?.artwork?.textColor3}}>
                                        {albumInfo?.artistName}
                                     </h5>

                                     <div className="genres"  style={{color: "#" + albumInfo?.artwork?.textColor4}}>
                                        {albumInfo?.genreNames?.map((genr,i)=>(
                                            <span key={i}>{genr}</span>
                                        ))}
                                     </div>
                                     <div className="editorialNotes"
                                         style={{color: "#" + albumInfo?.artwork?.textColor4}}
                                        >
                                            {albumInfo?.editorialNotes?.short}...
                                            <span style={{color: "#" + albumInfo?.artwork?.textColor1}} onClick={()=> setIsAlbumNote(true)}>show more</span>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <ChartCarts title={`${albumInfo?.name} album tracks by ${albumInfo?.artistName}`} data={albumTracks} pFrom={"albTracks"}/>
                        <AlbumsCard data={location?.state} />
                    </div>
                </div>
                </>
            }
           {state?.isSongPlaying ?
            <AudioPlayer /> : ''}
        </div>
    );
};

export default ArtestAlbums;