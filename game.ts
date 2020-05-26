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

// map of note rank to the checkbox that enables it
let freeModeNoteSettings = [];
// prepare the guess settings
let freeModeSettingsList = document.getElementById("freeModeSettingsList");
notesByRank.forEach(note => {
    let listItem = document.createElement("li");
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;
    freeModeNoteSettings[note.rank] = check;
    listItem.appendChild(check);
    let span = document.createElement("span");
    span.innerText = note.name;
    listItem.appendChild(span);
    freeModeSettingsList.appendChild(listItem);
});

function getEnabledNotes(): Array<Note> {
    let result = [];

    freeModeNoteSettings.forEach((value, index) => {
        if (value.checked) {
            result.push(notesByRank[index]);
        }
    });

    return result;
}

function getNotesByRankEnabledMap() {
    let enabledNotes = {};
    freeModeNoteSettings.forEach((value, index) => {
        if (value.checked) {
            enabledNotes[index] = true;
        } else {
            false;
        }
    });
    return enabledNotes;
}

function getFilteredGuitarNotes(): Array<GuitarNote> {
    let enabledNotes = getNotesByRankEnabledMap();

    let result = [];
    guitarNotes.forEach(guitarNote => {
        if(enabledNotes[guitarNote.absoluteNote.note.rank]) {
            result.push(guitarNote);
        }
    });
    return result;
}

function getFilteredPianoNotes(): Array<AbsoluteNote> {
    let enabledNotes = getNotesByRankEnabledMap();

    let result = [];
    pianoNotes.forEach(pianoNote => {
        if(enabledNotes[pianoNote.note.rank]) {
            result.push(pianoNote);
        }
    });
    return result;
}

function randomNote(): RandomNote {
    let filteredGuitarNotes = getFilteredGuitarNotes();
    let filteredPianoNotes = getFilteredPianoNotes();

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

var currentRandomNote = randomNote();
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
function applyFreeModeSettings() {
    guesses.innerHTML = "";
    getEnabledNotes().forEach(note => {
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
    currentRandomNote = randomNote();
}

// prepare the guess buttons
applyFreeModeSettings();