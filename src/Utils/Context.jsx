import {  useState } from "react";
import { createContext } from "react";

export const globalSates = createContext();

const Context = ({children})=> {


    const setCurrentSong = (setState,state,data,i,from)=> {
        setState({
            ...state,
            songLength : data.length,
            songIndex: i,
            isSongPlaying: true,
            playingFrom: from,
            isPause: false,
            playingSong : data
        })
        if(state.isSongPlaying && 0 === state.songIndex && state.playingFrom ===  from) {
            setState({
                ...state,
                isPause: !state.isPause,
            })
        }
      };

      const [state,setState] = useState({
        isSongPlaying: false,
        playingSong: [],
        songIndex: 0,
        songLength: 0,
        playingFrom: "chart",
        isPause: true,
        listId: "genre-global-chart-2"
      });

    return (
       <globalSates.Provider value={{setCurrentSong, state, setState}}>
          {children}
       </globalSates.Provider>
    )
};

export default Context;

