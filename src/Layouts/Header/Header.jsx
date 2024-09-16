import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';

import SearchField  from "../../Components/SearchField/SearchField"
import './Header.scss'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ()=> {



    const header = useRef();
    const  navigate  = useNavigate();


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
                <SearchField />
            </div>
        </header>
    )
};

export default Header;