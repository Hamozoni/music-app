import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { useNavigate } from 'react-router-dom';
import "./Footer.scss";

const Footer = ()=> {

    const navigate = useNavigate();
    const date = new Date();
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-logo">
                    <span> <MusicNoteRoundedIcon /></span>  
                    <h1 onClick={()=> navigate("/")}>MYH</h1>
                </div>
                <div className="copy-right">
                    &copy; Copyright  { date.getFullYear() } <a href="http://www.maiyahia.com" target="_blank" rel="noopener noreferrer">Mohamed Yahia</a>  All rights reserved
                </div>
            </div>
        </footer>
    )
};

export default Footer;