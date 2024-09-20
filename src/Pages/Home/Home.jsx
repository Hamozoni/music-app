import "./Home.scss";
import homeImage from "../../Assets/equalizer.png"
import SearchField from "../../Components/SearchField/SearchField";

const Home = ()=> {


    return (
        <div 
            style={{backgroundImage: `url(${homeImage})`}} 
            className="home"
            >
                <div className="content">
                    <h3 >discover music, tracks, and artists easily with our search tool. </h3>
                    <p>find your favorittes or explore new sounds - the music world is at your fingertips.</p>
                    <SearchField />
                </div>

        </div>
    )
};

export default Home;