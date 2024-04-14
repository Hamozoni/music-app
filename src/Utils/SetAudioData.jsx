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

// isSongPlaying: false,
// playingSong: [],
// songIndex: 0,
// songLength: 0,
// playingFrom: "chart",
// isPause: true,
// listId: "genre-global-chart-2"