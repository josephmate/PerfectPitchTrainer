class RandomNote {
    constructor(public filepath: string, public absoluteNote: AbsoluteNote) { }
}

function randomInteger(lowerBound: number, upperbound: number): number {
    return Math.floor(Math.random() * (upperbound-lowerBound)) + lowerBound;
}

function isSame(note: Note, randomNote: RandomNote): boolean {
    return randomNote.absoluteNote.note.rank === note.rank;
}

function clearStatuses() {
    let statusSpans = document.getElementsByClassName("guessStatus");
    for(let i = 0; i < statusSpans.length; i++) {
        let statusSpan = statusSpans[i];
        statusSpan.innerHTML = "";
    }
}

function getFilteredGuitarNotes(enabledNotes: Array<boolean>): Array<GuitarNote> {
    let result = [];
    guitarNotes.forEach(guitarNote => {
        if(enabledNotes[guitarNote.absoluteNote.note.rank]) {
            result.push(guitarNote);
        }
    });
    return result;
}

function getFilteredPianoNotes(enabledNotes: Array<boolean>): Array<AbsoluteNote> {
    let result = [];
    pianoNotes.forEach(pianoNote => {
        if(enabledNotes[pianoNote.note.rank]) {
            result.push(pianoNote);
        }
    });
    return result;
}

var gameNoteEnableMap: Array<boolean>;
function randomNote(): RandomNote {
    if(!gameNoteEnableMap) {
        throw "gameNoteEnableMap not set yet!";
    }
    let filteredGuitarNotes = getFilteredGuitarNotes(gameNoteEnableMap);
    let filteredPianoNotes = getFilteredPianoNotes(gameNoteEnableMap);

    let totalNotes = filteredGuitarNotes.length + filteredPianoNotes.length;
    let randomIndex = randomInteger(0, totalNotes-1);
    if(randomIndex < filteredGuitarNotes.length) {
        let guitarIndex = randomIndex;
        let guitarNote = filteredGuitarNotes[guitarIndex];
        return new RandomNote(getGuitarFilepath(guitarNote), guitarNote.absoluteNote);
    } else {
        let pianoIndex = randomIndex - filteredGuitarNotes.length;
        let pianoNote = filteredPianoNotes[pianoIndex]
        return new RandomNote(getPianoFilepath(pianoNote), pianoNote);
    }
}

var currentRandomNote: RandomNote;
function playRandomNote() {
    new Audio(currentRandomNote.filepath).play();
}

function guess(note: Note, statusSpan: HTMLElement) {
    if(isSame(note, currentRandomNote)) {
        statusSpan.innerText = ", was correct!";
        var topStatusSpan = document.getElementById("statusSpan");
        topStatusSpan.innerText = "Previous note was " + displayName(currentRandomNote.absoluteNote);
        currentRandomNote = randomNote();
        playRandomNote();
        setTimeout(() => {
            clearStatuses();
        }, 2000);
    } else {
        statusSpan.innerText = ", is not the correct note.";
    }
}

let guesses = document.getElementById("guesses");
function applySettings(enabledNotes: Array<boolean>) {
    guesses.innerHTML = "";
    notesByRank.forEach(note => {
        if (enabledNotes[note.rank]) {
            let listItem = document.createElement("li");
            let button = document.createElement("button");
            let statusSpan = document.createElement("span");
            statusSpan.className = "guessStatus";
            button.innerText = note.name;
            button.addEventListener("click", (e:Event) => guess(note, statusSpan));
            listItem.appendChild(button);
            listItem.appendChild(statusSpan);
            guesses.appendChild(listItem);
        }
    });
    gameNoteEnableMap = enabledNotes;
    currentRandomNote = randomNote();
}
