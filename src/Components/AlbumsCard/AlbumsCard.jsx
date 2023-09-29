
import Loading from "../Loading/Loading";
import "./AlbumsCard.scss";
import { useNavigate } from "react-router-dom";

const AlbumsCard = ( { data, artistId })=> {

    const navgate = useNavigate()

    return (
        <section className="albums">
            <h4 className="alb-title">
                albums
            </h4>
            <div className="alm-container">
            {  data ? 
                Object.values(data)?.map((albId,i)=>(
                    <div key={i} className="albums-card" onClick={()=> navgate(`/artest/${artistId}/albums/${albId.id}`,{state :data})}>
                        <div className="alb-img">
                           <img src={albId?.attributes?.artwork?.url?.replace("{w}x{h}","200x200")} alt={albId?.attributes?.name} />
                           <div className="al-s-cont"
                               style={{backgroundColor: "#" + albId?.attributes?.artwork?.bgColor,
                               color: "#" + albId.attributes?.artwork?.textColor1
                            }}
                           >
                                <h5> {albId?.attributes?.trackCount}</h5>
                                <p>tracks</p>
                           </div>
                        </div>
                        <div className="alb-info">
                            <h5 className="title">
                                {albId?.attributes?.name?.length > 20 ? albId?.attributes?.name?.slice(0,20) + '...' : albId?.attributes?.name }
                            </h5>
                            <h5 className="rel-year">
                               {albId?.attributes?.releaseDate}
                            </h5>
                        </div>
                    </div>
                )) : 
                <Loading />
            }
            </div>  
        </section>
    );
};

export default AlbumsCard;