function generatePianoNotes(startNote: AbsoluteNote, endNote: AbsoluteNote) {
    let result = [];
    var currentNote = startNote;
    while(!currentNote.equals(endNote)) {
        result.push(currentNote);
        currentNote = increasePitch(currentNote);
    }

    return result;
}

let pianoNotes = generatePianoNotes(
    new AbsoluteNote(NOTES.E, 2),
    new AbsoluteNote(NOTES.A, 4)
);

function isNextNoteSharp(notes: Array<AbsoluteNote>, index: number): boolean {
    return false;
}

let piano = document.getElementById("piano");

// Example starting from middle C4
// Cell Splits | | | | | | | | | | | | |  |
// Row 1:      |   | C#| |D# |       | F#|
// Row 2:      | C   |  D  | E   | F   |

let blackKeys = document.createElement("tr");
pianoNotes
    .filter(pianoNote => pianoNote.note.isSharp)
    .forEach((pianoNote, index) => {
        let noteCell = document.createElement("td");
        let notePlayButton = document.createElement("div");
        notePlayButton.setAttribute("style",  "color:white; background-color:black");
        notePlayButton.innerHTML = displayName(pianoNote);
        noteCell.appendChild(notePlayButton);
        blackKeys.appendChild(noteCell);
    });
piano.appendChild(blackKeys);

let whiteKeys = document.createElement("tr");
pianoNotes
    .filter(pianoNote => !pianoNote.note.isSharp)
    .forEach((pianoNote, index) => {
        let noteCell = document.createElement("td");
        let notePlayButton = document.createElement("div");
        notePlayButton.innerHTML = displayName(pianoNote);
        noteCell.appendChild(notePlayButton);
        whiteKeys.appendChild(noteCell);
    });
piano.appendChild(whiteKeys);