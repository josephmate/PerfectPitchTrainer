enum Note {
    C = 0,
    C_SHARP,
    D,
    D_SHARP,
    E,
    F,
    F_SHARP,
    G,
    G_SHARP,
    A,
    A_SHARP,
    B,
}

class AbsoluteNote {
    constructor(public note: Note, public octave: number) { }
}

class GuitarNote {
    constructor(public guitarString: string, public fretNumber: number, public absoluteNote: AbsoluteNote) { }
}

function increasePitch(guitarNote: GuitarNote): GuitarNote {
    if (guitarNote.absoluteNote.note == Note.B) {
        return new GuitarNote(
            guitarNote.guitarString,
            guitarNote.fretNumber + 1, 
            new AbsoluteNote(Note.C,
                guitarNote.absoluteNote.octave + 1));
    }
    return new GuitarNote(
        guitarNote.guitarString,
        guitarNote.fretNumber + 1,
        // https://stackoverflow.com/questions/39427542/how-do-i-access-typescript-enum-by-ordinal
        new AbsoluteNote(Note[Note[guitarNote.absoluteNote.note + 1]],
            guitarNote.absoluteNote.octave));
}

function addNotesFromFret(guitarString: string, startNote: Note, startOctave: number): GuitarNote[] {
    var currentString = new GuitarNote(guitarString, 0, new AbsoluteNote(startNote, startOctave));
    let result = [];
    result.push(currentString);
    for (let i = 0; i < 13; i++) {
        currentString = increasePitch(currentString);
        result.push(currentString);
    }
    return result;
}

// I cannot be compressed into a loop because the absolute pitch names follow a complex pattern,
// that's difficult to enumerate. For now
let guitarNotes = []
    .concat(addNotesFromFret("E1", Note.E, 4))
    .concat(addNotesFromFret("B", Note.B, 3))
    .concat(addNotesFromFret("G", Note.G, 3))
    .concat(addNotesFromFret("D", Note.D, 3))
    .concat(addNotesFromFret("A", Note.A, 2))
    .concat(addNotesFromFret("E2", Note.E, 2));

let noteToStringMap = {};
noteToStringMap[Note.C] = "C";
noteToStringMap[Note.C_SHARP] = "C_SHARP";
noteToStringMap[Note.D] = "D";
noteToStringMap[Note.D_SHARP] = "D_SHARP";
noteToStringMap[Note.E] = "E";
noteToStringMap[Note.F] = "F";
noteToStringMap[Note.F_SHARP] = "F_SHARP";
noteToStringMap[Note.G] = "G";
noteToStringMap[Note.G_SHARP] = "G_SHARP";
noteToStringMap[Note.A] = "A";
noteToStringMap[Note.A_SHARP] = "A_SHARP";
noteToStringMap[Note.B] = "B";

function displayName(absoluteNote: AbsoluteNote): string {
    return noteToStringMap[absoluteNote.note] + " " + absoluteNote.octave;
}

let guitar = document.getElementById("guitar");

function playGuitarNote(guitarString: String, fretNumber: number) {
    new Audio('notes/' + guitarString + '-Fret' + fretNumber + '.mp3').play()
}

for (let guitarString of ['E1', 'B', 'G', 'D', 'A', "E2"]) {
    let guitarStringRow = document.createElement("tr");
    // create an empty cell
    guitarStringRow.appendChild(document.createElement("td"));
    for(let guitarNote of guitarNotes.filter(guitarNote => guitarNote.guitarString == guitarString)) {
        let noteCell = document.createElement("td");
        let notePlayButton = document.createElement("button");
        notePlayButton.addEventListener("click", (e:Event) => playGuitarNote(guitarString, guitarNote.fretNumber));
        notePlayButton.innerHTML = displayName(guitarNote.absoluteNote);
        noteCell.appendChild(notePlayButton);
        guitarStringRow.appendChild(noteCell);
    }
    guitar.appendChild(guitarStringRow);
}