

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
notesByRank.forEach(note => {
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    let statusSpan = document.createElement("span");
    statusSpan.className = "guessStatus";
    button.innerText = note.name;
    button.addEventListener("click", (e:Event) => guess(note, statusSpan));
    listItem.appendChild(button);
    listItem.appendChild(statusSpan);
    guesses.appendChild(listItem);
});