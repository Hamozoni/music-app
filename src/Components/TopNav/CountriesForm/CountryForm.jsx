
import "./CountryForm.scss";
import "../TopNav.scss";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import Loading from "../../Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

const CountryForm = ({setting, setSetting})=> {

    const  navngate  = useNavigate();
    const { country } = useParams();

    const getGlobalListId = (id) => {
        setSetting({
            ...setting,
            chartCities: null,
            genresList: setting.chartList.global.genres,
            showchartCountry : false,
        });
        navngate(`/chart/global/all/pop/${id}`)
    };

    const getListId = (cou)=> {
        setSetting({
            ...setting,
            countryName: cou.name,
            chartCities: cou.cities,
            filteredChartCities: cou.cities,
            genresList: [...cou.genres],
            showchartCountry : false,
        });
       navngate(`/chart/${cou.name}/all/all/${cou.listid}`)
    };


    const fillterList = (e)=> {
        if(e.target.value.length) {
            let fillteredList = setting.filteredCountryList.filter((el)=>{
            return  el.name.toLowerCase().includes(e.target.value.toLowerCase())    
            });

           setSetting({
            ...setting,
           counteryList: [...fillteredList]
           })
        }else {
            setSetting({
                ...setting,
                counteryList: [...setting.chartList.countries]
            });
        };
    };

    return (
        <div className="myh-country-menu">
            <div className="search-box">
                <div className="search">
                    <input
                        className="input"
                        placeholder="Search Country"
                        onKeyUp={fillterList}
                    />
                    <button className="s-icon"><SearchRoundedIcon /></button>
                </div>
            </div>
            <ul className="myh-country-list">
                { 
                    setting.isLoading ? <Loading />:
                    <>
                    <li
                    className={country === "global" ? "active" : ""}
                    onClick={()=> getGlobalListId("genre-global-chart-1")} >
                        Global
                        {country ===  "global" ?  <span><CheckRoundedIcon /></span> : "" } 
                    </li>
                    {setting?.counteryList?.map((countr,i)=>(
                        <li
                            className={country === countr.name ? "active": ""} 
                            key={i} 
                            onClick={()=> getListId(countr)}
                        >
                            {countr?.name}
                            {country === countr.name ?  <span><CheckRoundedIcon /></span> : "" } 
                        </li>
                    ))}
                    </>   
                }
            </ul>
        </div>
    );
};

export default CountryForm;