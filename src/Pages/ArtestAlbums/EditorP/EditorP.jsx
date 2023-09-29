import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./EditorP.scss";

const EditorP = ({ data, setIsAlbumNote })=>{


    const hideNotes = (e)=>{
        e.stopPropagation();
        setIsAlbumNote(false)
    }
    return (
        <article className="more-notes overlay" onClick={hideNotes}>
            <div className="more-container"
                style={{backgroundColor: "#" + data?.artwork?.textColor4,
                color: "#" + data?.artwork?.bgColor
                }} >
                <header className="note-header">
                    <div className="close" onClick={()=> setIsAlbumNote(false)}>
                        <CloseRoundedIcon/>
                    </div>
                    <div className="note-artist-info">
                        <h4 className="title">
                            {data?.artistName} 
                        </h4>
                        <h5 className="genr">
                        {data?.genreNames[0]} {data?.releaseDate}
                        </h5>
                    </div>
                </header>
                <div className="note-body">
                    <div className="container">
                        <article className="content" dangerouslySetInnerHTML={{__html : data?.editorialNotes?.standard}}>
                        </article>
                    </div>
                </div>
                <footer className='note-footer'>
                    <div className="container">
                        <h5 className="name">
                                {data?.name}
                        </h5>
                        <p>relaesed: {data?.releaseDate}</p>
                        <p>{data?.copyright}</p>
                    </div>
                </footer>
             </div>                                   
        </article>
    )
};

export default EditorP;