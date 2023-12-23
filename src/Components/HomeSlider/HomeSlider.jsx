import "./HomeSlider.scss";
import image1 from "../../Images/audio-2.jpg";

const HomeSlider = ({ data })=> {

    return (
        <div className="home-slider">
           <div className="container">
             <div className="silder-info overlay flex-box">
                <h4 className="slid-t">
                    global top 200
                </h4>
                <p className="slid-p">
                   Top songs being discovered around the world right now
                </p>
                <p className="slid-s-p">
                  See who made it on the list of the most MHY songs worldwide
                </p>
             </div>
             <div className="img-box flex-box">
                {data?.map((img,i)=>(
                   <div key={img?.i} className={i % 2 === 0 ? "active img-container" : "img-container" }>
                        <img src={img?.artestImg ? img?.artestImg : image1} alt={img?.songTitle}/> 
                    </div> 
                 
                ))
                }
             </div>
           </div>
        </div>
    );
};

export default HomeSlider;