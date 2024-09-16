import "./Home.scss";
import homeImage from "../../Assets/woman-listening-to-music-with-headphones.avif"

const Home = ()=> {


    return (
        <div 
            style={{backgroundImage: `url(${homeImage})`}} 
            className="home"
            >
                <div className="content">
                    <h3 >discover music, tracks, and artists easily with our search tool. </h3>
                    <p>find your favorittes or explore new sounds - the music world is at your fingertips.</p>

                </div>

        </div>
    )
};

export default Home;