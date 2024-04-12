import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import './Header.scss'
import { useNavigate } from 'react-router-dom';
import SearchField from '../../Components/SearchField/SearchField';
import { useEffect, useRef, useState } from 'react';

const Header = ()=> {

    const navigate = useNavigate();
    const [searchInputValue,setSearchInputValue] = useState("")
    const [showSearchInput,setShowSearchInput] = useState(false);

    const searchInput = useRef();
    const header = useRef();

    const searchHandler = ()=>{
        searchInput.current.focus();
    };

    useEffect(()=>{

        const handleScroll = ()=> {
            if(window?.scrollY < 20 ) {
                header.current.classList.add("trans");
             }else{
                header.current.classList.remove("trans");
             }
        };

        window.addEventListener("scroll",handleScroll);
        return ()=> window.removeEventListener("scroll",handleScroll);

    },[]);


    return (
        <header id="header" ref={header}>
            <div className="container">
                <div className="logo">
                    <span> <MusicNoteRoundedIcon /></span>  
                    <h1 onClick={()=> navigate("/")}>MYH</h1>
                </div>
                <div className="search-box">
                    <button onClick={searchHandler} ><SearchRoundedIcon className='search' /></button>
                    <input
                       ref={searchInput}
                        className='search'
                        type="text"
                        placeholder="search..."
                        onFocus={()=> setShowSearchInput(true)}
                        onBlur={()=> {
                            setTimeout(()=>{
                                setShowSearchInput(false)
                            },400)
                        }}
                        onChange={(e)=> setSearchInputValue(e.target.value)}
                    />
                    {
                        showSearchInput ? 
                        <SearchField setShowSearchInput={setShowSearchInput} searchInput={searchInputValue}/> : ""
                    }
                    
                </div>
            </div>
        </header>
    )
};

export default Header;