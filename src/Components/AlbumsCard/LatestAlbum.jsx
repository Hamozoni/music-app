import "./AlbumsCard.scss";
import img1 from "../../Images/audio-2.jpg";
import { useNavigate } from "react-router-dom";

const LatestAlbum = ({data, data2, artistId})=> {

    const navgate = useNavigate();

    return (
        <section className="albums">
        <h4 className="alb-title">
           latest albums
        </h4>
        <div className="alm-container">
        {
           data?.map((alb,i)=>(
                <div key={i} className="albums-card" onClick={()=> navgate(`/artest/${artistId}/albums/${alb?.id}`,{ state : data2})}>
                    <div className="alb-img latest">
                       <img src={alb?.attributes  ? alb?.attributes?.artwork?.url?.replace("{w}x{h}","200x200") : img1} alt={alb?.attributes ?alb?.attributes?.name : ""} />
                       <div className="al-s-cont"
                           style={{backgroundColor: "#" + alb?.attributes?.artwork?.bgColor,
                           color: "#" + alb?.attributes?.artwork?.textColor1
                        }}
                       >
                            <h5> {alb?.attributes?.trackCount}</h5>
                            <p>tracks</p>
                       </div>
                    </div>
                    <div className="alb-info">
                        <h5 className="title">
                            {alb?.attributes?.name?.length > 24 ? alb?.attributes?.name?.slice(0,23) + '...' : alb?.attributes?.name }
                        </h5>
                        <h5 className="rel-year">
                           {alb?.attributes?.releaseDate}
                        </h5>
                    </div>
                </div>
            ))
        }
        </div>  
    </section>
    );
};

export default LatestAlbum;