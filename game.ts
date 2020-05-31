class RandomNote {
    constructor(public filepath: string, public absoluteNote: AbsoluteNote) { }
}

/**
 * Returns a random integer from the set [lowerBound, upperBound].
 * 
 * @param lowerBound inclusive
 * @param upperbound inclusive
 */
function randomInteger(lowerBound: number, upperbound: number): number {
    return Math.floor(Math.random() * (upperbound + 1 - lowerBound)) + lowerBound;
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

function getFilteredGuitarNotes(note: Note): Array<GuitarNote> {
    let result = [];
    guitarNotes.forEach(guitarNote => {
        if(note.rank == guitarNote.absoluteNote.note.rank) {
            result.push(guitarNote);
        }
    });
    return result;
}

function getFilteredPianoNotes(note: Note): Array<AbsoluteNote> {
    let result = [];
    pianoNotes.forEach(pianoNote => {
        if(note.rank == pianoNote.note.rank) {
            result.push(pianoNote);
        }
    });
    return result;
}

function calculateRandomNote(enabledNotes: Array<boolean>): Note {
    let notesToPullFrom = [];
    notesByRank.forEach(noteByRank => {
        if(enabledNotes[noteByRank.rank]) {
            notesToPullFrom.push(noteByRank);
        }
    });
    let randomIndex = randomInteger(0, notesToPullFrom.length-1);
    return notesToPullFrom[randomIndex];
}

var gameNoteEnableMap: Array<boolean>;
function randomNoteImpl(): RandomNote {
    if(!gameNoteEnableMap) {
        throw "gameNoteEnableMap not set yet!";
    }
    let randomNote = calculateRandomNote(gameNoteEnableMap);
    let filteredGuitarNotes = getFilteredGuitarNotes(randomNote);
    let filteredPianoNotes = getFilteredPianoNotes(randomNote);

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


let randomnessTracker = {};
function randomNote(): RandomNote {
    let randomNote = randomNoteImpl();
    var currentStat = randomnessTracker[randomNote.absoluteNote.note.name];
    if(!currentStat) {
        randomnessTracker[randomNote.absoluteNote.note.name] = 0
    }
    randomnessTracker[randomNote.absoluteNote.note.name]++;

    console.info(JSON.stringify(randomnessTracker));
    return randomNote;
}

var currentRandomNote: RandomNote;
function playRandomNote() {
    new Audio(currentRandomNote.filepath).play();
}

let guessCallback: (boolean) => void;
function guess(note: Note, statusSpan: HTMLElement) {
    if(isSame(note, currentRandomNote)) {
        statusSpan.innerText = ", was correct!";
        var topStatusSpan = document.getElementById("statusSpan");
        topStatusSpan.innerText = "Previous note was " + displayName(currentRandomNote.absoluteNote);
        currentRandomNote = randomNote();
        if(guessCallback) {
            guessCallback(true);
        }
        playRandomNote();
        setTimeout(() => {
            clearStatuses();
        }, 2000);
    } else {
        statusSpan.innerText = ", is not the correct note.";
        guessCallback(false);
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
