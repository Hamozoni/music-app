import { useNavigate } from "react-router-dom";
import img1 from "../../Assets/audio-2.jpg";
import "./ArtestsCard.scss";

const ArtestsCard = ({ data })=> {

    
    const navigate = useNavigate();

    return (
        <section className="artests-card">
             <h4 className="art-t">
                top 200 artests
             </h4>
            <div className="artests-info">
                <div className="artest-container">
                    {
                        data?.map((artest,i)=>(
                            <div 
                                key={i} 
                                className="artest-box" 
                                onClick={()=> navigate(`/artest/${artest?.artists}`)}
                                >
                                <div className="artest-avatar">
                                    <img src={artest?.artestImg? artest?.artestImg : img1} alt={artest?.songTitle} />
                                </div>
                                <div className="artest-name">
                                    <h4 className="title">
                                        {artest?.artestName?.length > 14 ? `${artest?.artestName?.slice(0,14)}...`: artest?.artestName}
                                    </h4>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
         </section>   
    )
};
export default ArtestsCard;