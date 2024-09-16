import "./Home.scss";
import homeImage from "../../Assets/woman-listening-to-music-with-headphones.avif"

const Home = ()=> {


    return (
        <div 
            style={{backgroundImage: `url(${homeImage})`}} 
            className="home">

        </div>
    )
};

export default Home;