

class RandomNote {
    constructor(public filepath: string, public absoluteNote: AbsoluteNote) { }
}

function randomInteger(lowerBound: number, upperbound: number): number {
    return Math.floor(Math.random() * (upperbound-lowerBound)) + lowerBound;
}

function randomNote(): RandomNote {
    let totalNotes = guitarNotes.length + pianoNotes.length;
    let randomIndex = randomInteger(0, totalNotes-1);
    if(randomIndex < guitarNotes.length) {
        let guitarIndex = randomIndex;
        let guitarNote = guitarNotes[guitarIndex];
        return new RandomNote(getGuitarFilepath(guitarNote), guitarNote.absoluteNote);
    } else {
        let pianoIndex = randomIndex - guitarNotes.length;
        let pianoNote = pianoNotes[pianoIndex]
        return new RandomNote(getPianoFilepath(pianoNote), pianoNote);
    }
}

var currentRandomNote = randomNote();

function playRandomNote() {
    new Audio(currentRandomNote.filepath).play();
}