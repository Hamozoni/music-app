import { useState } from "react";
import "./SearchField.scss";
import { shazamData2 } from "../../Utils/Fetch";
import Loading from "../Loading/Loading"
import { useNavigate } from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import image1 from "../../Assets/no-results.png";
import Error from "../Error/Error";

const SearchField = ()=> {


    const [searchInputValue,setSearchInputValue] = useState("")
    const [showSearchInput,setShowSearchInput] = useState(false);

    const  navigate  = useNavigate();

    const [tracks,setTracks] = useState([]);
    const [artists,setArtists] = useState([]);
    const [isloading,setIsloading] = useState(true);
    const [error,setError] = useState(null);

    const searchHandler = ()=>{
        setError(null);
        setIsloading(true);
        setShowSearchInput(true);
        if (searchInputValue.length > 2){
            setIsloading(true);
            shazamData2(`search?term=${searchInputValue}`)
            .then( data => {
                setTracks(data?.data?.tracks?.hits);
                setArtists(data?.data?.artists?.hits);
            })
            .catch( error => {
                setError(error);
            })
            .finally(()=> {
                setIsloading(false);
            })
        }
    };


     const handleNavigating = (href)=> { 
        navigate(href)
        setShowSearchInput(false);
     };

     const SearchResults = ()=> {
        return (
            error ? <Error error={error} /> :
            <div className="search-field">
                <p onClick={()=> setShowSearchInput(false)}>
                    {/* <RxCross1 /> */}jjjjj
                </p>
                {
                    searchInputValue.length ? 
                 <>
                    <section className="track-field">
                        <h4>songs</h4>
                        {
                            isloading ? <Loading /> :
                            tracks ? 
                            tracks?.map((tr,i)=>(
                                <div
                                    key={i}
                                    className="track-card"
                                    onClick={()=> handleNavigating(`/song/${tr?.track?.key}`)}>
                                    <div className="img">
                                        <img src={tr?.track?.images?.coverart} alt={tr?.track?.title} />
                                    </div>
                                    <div className="track-info">
                                        <h5>
                                            {
                                                tr.track.title.length > 17 ?
                                                `${tr?.track?.title?.slice(0,17)}...`
                                                : tr?.track?.title
                                            }
                                        </h5>
                                        <h5>
                                            { 
                                                tr.track.subtitlelength > 17 ?
                                                `${tr?.track?.subtitle?.slice(0,17)}...`
                                                : tr?.track?.subtitle
                                            }
                                        </h5>
                                    </div>
                                </div>
                            )) : 
                            <div className="no-result">
                                <img src={image1} alt="no result" />
                            </div>
                        }
                    </section>
                    <section className="artist-field">
                        <h4>artists</h4>
                        {
                            isloading ? <Loading /> :
                            artists ?
                            artists?.map((art,i)=>(
                                <div
                                    key={i}
                                    className="artist-card"
                                    onClick={()=> handleNavigating(`/artest/${art?.artist?.adamid}`)}>
                                    <div className="img">
                                        <img src={art?.artist?.avatar} alt={art?.artist?.name} />
                                    </div>
                                    <div className="artist-info">
                                        <h5>
                                            {
                                            art?.artist?.name?.length > 17 ?
                                            `${art?.artist?.name}...` :
                                            art?.artist?.name
                                            }
                                        </h5>
                                    </div>
                                </div>
                            )) :
                            <div className="no-result">
                                <img src={image1} alt="no result" />
                            </div>
                        }
                    </section>
                    </> :
                    <div className="emty-field">
                        < SearchRoundedIcon />
                        <h3>No searches just yet</h3>
                        <h5>Search for your favorite artists or songs</h5>
                    </div>
    
                }
            </div>
        )
     }


    return (
     <div className="search-box">
        <button 
            onClick={searchHandler} 
            >
                <SearchRoundedIcon className='search' />
        </button>
        <input
            className='search'
            type="text"
            placeholder="discover music..."
            onChange={(e)=> setSearchInputValue(e.target.value)}
        />
        {
            showSearchInput ? 
            <SearchResults/> : ""
        }
        
    </div>
    );
};

export default SearchField;