import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import './Header.scss'
import { useNavigate } from 'react-router-dom';
import SearchField from '../SearchField/SearchField';
import { useState } from 'react';

const Header = ()=> {

    const navigate = useNavigate();
    const [searchInput,setSearchInput] = useState("")
    const [showSearchInput,setShowSearchInput] = useState(false);

    document.getElementById("root").addEventListener("click",(e)=>{
        if(e.target.classList.contains("search")){
            setShowSearchInput(true);
        } else {
            setShowSearchInput(false);
        }
    })

    return (
        <header id="header">
            <div className="container">
                <div className="logo">
                    <span> <MusicNoteRoundedIcon /></span>  
                    <h1 onClick={()=> navigate("/")}>MYH</h1>
                </div>
                <div className="search-box">
                    <button ><SearchRoundedIcon className='search' /></button>
                    <input
                        className='search'
                        type="text"
                        placeholder="search..."
                        onBlur={(e)=>{ setSearchInput(e.target.value) }} 
                    />
                    {
                        showSearchInput ? 
                        <SearchField searchInput={searchInput}/> : ""
                    }
                    
                </div>
            </div>
        </header>
    )
};

export default Header;