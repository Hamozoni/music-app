import "./TopNav.scss";
import Loading from "../Loading/Loading";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useContext, useEffect, useState } from "react";
import { shazamData3 } from "../../Utils/Fetch";
import CountryForm from "./CountriesForm/CountryForm";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../Assets/audio-2.jpg"
import Error from "../Error/Error";
import { globalSates } from "../../Context/Context";

const TopNav = ({ data })=> {
    console.log(data)
    const {state,setState} = useContext(globalSates);
    const [error,setError] = useState(null);

    const navigate = useNavigate();
    const {country = "global", city = "all", genres = "all"} = useParams();
    const [setting,setSetting] = useState({
        chartList: null,
        counteryList: null,
        filteredCountryList: null,
        chartCities : null,
        filteredChartCities: null,
        genresList: [],
        showGenres: false,
        showchartCountry : false,
        showChartCities : false,
        isLoading: true, 
    });

    useEffect(()=>{;
        setSetting({...setting,isLoading: true});
        shazamData3(`charts/list`)
        .then((data)=>{
       
            setSetting({
                ...setting,
                counteryList: data?.data?.countries,
                filteredCountryList :  data?.data?.countries,
                chartList :  data?.data,
                genresList : data?.data?.global?.genres,
            });
        })
        .catch(error => {
            setError(error);
        })
        .finally(()=> {
            setSetting({...setting,isLoading: false});
        })
    },[]);

    const getGenrListId = (genr)=> {
        navigate(`/chart/${country}/${city}/${genr.name.replace("/","-")}/${genr.listid}`);
        setSetting({
            ...setting,
            showGenres: false, 
        });
    };
    
    const filterCities = (e)=> {
        if(e.target.value.length) {
         let fillteredList = setting.filteredChartCities.filter((el)=>{
          return  el.name.toLowerCase().includes(e.target.value.toLowerCase())    
         })
           setSetting({
            ...setting,
            chartCities: [...fillteredList] 
           })
        }else {
            setSetting({
                ...setting,
                chartCities: [...setting.filteredChartCities] 
            });
        };
    };

    const setCityIp = (city)=> {
        navigate(`/chart/${country}/${city.name}/all/${city.listid}`);
        setSetting({
            ...setting,
            showChartCities: false, 
        });
    };

    document.getElementById("root").addEventListener("click", e => {
        if(setting.showchartCountry){
            if(!e.target.classList.contains("c-cancel")){
                setSetting(
                    {
                        ...setting,
                        showchartCountry : false,
                        showChartCities : false,
                        showGenres: false
                    });
            }
        }
    })

    return (
        error ? <Error error={error} /> :
        <nav className="top-nav">
            <div className="container">       
                <div className="nav-container">
                <div className="counries-opations">
                        <div className="current-cou c-cancel" 
                            onClick={()=> setSetting({...setting, showchartCountry : !setting.showchartCountry})}>
                            <h5 className="c-name">
                                {country}
                            </h5>
                            <KeyboardArrowDownRoundedIcon className="hid" />
                        </div>
                    { setting.showchartCountry ? 
                        <CountryForm
                            setting={setting}
                            setSetting={setSetting}
                        /> : "" }
                    </div>
                    <div className="top-tracks">
                        <div className="top-box">
                            <div className="play-icon"
                                onClick={ ()=> setState({
                                    ...state,
                                    isSongPlaying : true,
                                    playingFrom: "chart",
                                    playingSong : [...data],
                                    isPause : !state.isPause })
                                }
                            >
                                {
                                    state.isPause ?
                                    < PlayArrowRoundedIcon /> :
                                    <PauseRoundedIcon />
                                }

                            </div>
                                <div className="top-ch-info">
                                    <h5 className="ch-title">
                                    {city === "all" ? country : city}
                                    </h5>
                                    {
                                    genres === "all" ?
                                    <>
                                    <h5 className="t-200">top 20</h5>
                                    <p>the most MYH tracks in {city === "all" ? country : city } this weak</p>
                                    </>  : 
                                    <div className="genr-type">
                                        <h5 className="t-200">{genres}</h5>
                                    </div>
                                }
                                </div>     
                        </div>
                    </div>
                    <div className="cities-genres">
                        { setting.chartCities &&
                            <div className="cities-name c-cancel" 
                                onClick={()=> setSetting({...setting, showChartCities: !setting.showChartCities})}>
                                <h5 className="c-cancel">{city === "all" ? "cities" : city.length > 12 ? `${city.slice(0,10)}...` : city }</h5>
                                <KeyboardArrowDownRoundedIcon className="c-cancel" />
                            </div>
                        }

                        {
                            setting.genresList.length ?
                            ( 
                               <div className="genres gen c-cancel" 
                                    onClick={()=> setSetting({...setting, showGenres: !setting.showGenres})}>
                                    <h5 className="c-cancel">
                                        { genres === "all" ? "genres" : genres.length > 12 ?  genres.slice(0,10) + "..." :  genres }
                                    </h5>
                                    <KeyboardArrowDownRoundedIcon className="c-cancel" />
                                    <div className={setting.showGenres ? "active genres-list"  : "genres-list" }>
                                        <ul className="gen myh-country-list">
                                            {setting.genresList?.map((genr,i)=>(
                                                <li
                                                    key={i} 
                                                    onClick={()=> getGenrListId(genr)}
                                                    className={genres === genr.name.replace("/","-") ? "active" : ""}
                                                >
                                                    {genr?.name}
                                                    { genres === genr.name.replace("/","-") &&  <span><CheckRoundedIcon /></span>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                               </div>
                            ) : ""
                        }

                        {  setting.showChartCities &&
                        ( <div className="myh-country-menu">
                                <div className="search-box">
                                    <div className="search">
                                    <input
                                        className="sh"
                                        list="country-id"
                                        placeholder="Search Country"
                                        onInput={ (e)=> filterCities(e) }
                                    />
                                    <button className="s-icon"><SearchRoundedIcon /></button>
                                    </div>

                                </div>
                                <ul className="myh-country-list">
                                    { 
                                    setting.isLoading ? <Loading />:
                                    setting.chartCities?.map((cit,i)=>(
                                        <li
                                            className={city === cit.name ? "active": ""} 
                                            key={i} 
                                            onClick={()=> setCityIp(cit)}
                                            >
                                            {cit?.name}
                                            { city === cit.name &&  (<span><CheckRoundedIcon /></span>)} 
                                        </li>
                                    ))
                                    }

                                </ul>
                            </div> )
                        }
                    </div>
                </div>
                <div className="images-holder">
                    {
                        data?.map((img,i)=>(
                            <div key={i} className="img-box">
                                <img src={img.images.background ? img.images.background : image} alt={img?.title} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </nav>
    );
};

export default TopNav;