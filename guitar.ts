class GuitarNote {
    constructor(public guitarString: string, public fretNumber: number, public absoluteNote: AbsoluteNote) { }
}

function increaseGuitarPitch(guitarNote: GuitarNote): GuitarNote {
    return new GuitarNote(
        guitarNote.guitarString,
        guitarNote.fretNumber + 1,
        increasePitch(guitarNote.absoluteNote));
}

function addNotesFromFret(guitarString: string, startNote: Note, startOctave: number): GuitarNote[] {
    var currentString = new GuitarNote(guitarString, 0, new AbsoluteNote(startNote, startOctave));
    let result = [];
    result.push(currentString);
    for (let i = 0; i < 13; i++) {
        currentString = increaseGuitarPitch(currentString);
        result.push(currentString);
    }
    return result;
}

// I cannot be compressed into a loop because the absolute pitch names follow a complex pattern,
// that's difficult to enumerate. For now
let guitarNotes = []
    .concat(addNotesFromFret("E1", NOTES.E, 4))
    .concat(addNotesFromFret("B", NOTES.B, 3))
    .concat(addNotesFromFret("G", NOTES.G, 3))
    .concat(addNotesFromFret("D", NOTES.D, 3))
    .concat(addNotesFromFret("A", NOTES.A, 2))
    .concat(addNotesFromFret("E2", NOTES.E, 2));

let guitar = document.getElementById("guitar");

function playGuitarNote(guitarString: String, fretNumber: number) {
    new Audio('notes/guitar/' + guitarString + '-Fret' + fretNumber + '.mp3').play()
}

for (let guitarString of ['E1', 'B', 'G', 'D', 'A', "E2"]) {
    let guitarStringRow = document.createElement("tr");
    // create an empty cell
    guitarStringRow.appendChild(document.createElement("td"));
    for(let guitarNote of guitarNotes.filter(guitarNote => guitarNote.guitarString == guitarString)) {
        let noteCell = document.createElement("td");
        noteCell.setAttribute("style", "border: 1px solid black;");
        let notePlayButton;
        if (guitarNote.fretNumber <= 5) {
            notePlayButton = document.createElement("button");
            notePlayButton.addEventListener("click", (e:Event) => playGuitarNote(guitarString, guitarNote.fretNumber));
        } else {
            notePlayButton = document.createElement("div");
        }
        notePlayButton.innerHTML = displayName(guitarNote.absoluteNote);
        noteCell.appendChild(notePlayButton);
        guitarStringRow.appendChild(noteCell);
    }
    guitar.appendChild(guitarStringRow);
}