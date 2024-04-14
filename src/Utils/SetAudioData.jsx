
class AudioData  {

    constructor(isP,plS,sInd,sLen,pFr,isPau,LId) {

        this.isSongPlaying = isP;
        this.playingSong = plS
        this.songIndex = sInd
        this.songLength = sLen
        this.playingFrom = pFr
        this.isPause = isPau
        this.listId = LId
    }

}

export const getAudioData = (setState,isP,plS,sInd,sLen,pFr,isPau,LId)=>{

    const audioData = new AudioData(isP,plS,sInd,sLen,pFr,isPau,LId);

    setState(audioData);

}

// isSongPlaying: false,
// playingSong: [],
// songIndex: 0,
// songLength: 0,
// playingFrom: "chart",
// isPause: true,
// listId: "genre-global-chart-2"