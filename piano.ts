function generatePianoNotes(startNote: AbsoluteNote, endNote: AbsoluteNote) {
    let result = [];
    var currentNote = startNote;
    while(true) {
        result.push(currentNote);
        if(currentNote.equals(endNote)) {
            break;
        }
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

function getPianoFilepath(absoluteNote: AbsoluteNote): string {
    return 'notes/piano/' + encodeURIComponent(absoluteNote.note.name) + absoluteNote.octave + '.mp3';
}

function playPianoNote(absoluteNote: AbsoluteNote) {
    new Audio(getPianoFilepath(absoluteNote)).play()
}

let piano = document.getElementById("piano");

// Assume we always start from a white key.
if(pianoNotes[0].note.isSharp) {
    throw "Cannot start from a sharp note";
}

// Example starting from middle C4
// Cell Splits | | | | | | | | | | | | |  |
// Row 1:      |   | C#| |D# |       | F#|
// Row 2:      | C   |  D  | E   | F   |

// Example starting from E2
// Cell Splits | | | | | | | | | | | | | | | | | | | | | | | | | | | |
// Row 1:      |     |   | F#| | G#| | A#|   |   | C#| | D#|   |
// Row 2:      | E   | F   |  G  |  A  |  B  |  C  |  D  |  E  | F

let blackKeys = document.createElement("tr");
var colspan = 1;
pianoNotes
    .forEach((pianoNote, index) => {
        var cell = document.createElement("td");
        if (!pianoNote.note.isSharp) {
            let colspan;
            if(index == pianoNotes.length -1) {
                if(pianoNotes[index-1].note.isSharp) {
                    colspan = "2";
                } else {
                    colspan = "3";
                }
            } else if(pianoNotes[index+1].note.isSharp) {
                if(index == 0) {
                    colspan = "2";
                } else {
                    if(pianoNotes[index-1].note.isSharp) {
                        colspan = "1";
                    } else {
                        colspan = "2";
                    }
                }
            } else {
                if(index == 0) {
                    colspan = "3";
                } else {
                    colspan = "2";
                }
            }
            cell.setAttribute("colspan", colspan);
            cell.appendChild(document.createElement("div"));
        } else {
            let notePlayButton = document.createElement("div");
            cell.setAttribute("colspan", "2");
            notePlayButton.setAttribute("style",  "border: 1px solid black; color:white; background-color:black");
            notePlayButton.innerHTML = displayName(pianoNote);
            cell.addEventListener("click", (e:Event) => playPianoNote(pianoNote));
            cell.appendChild(notePlayButton);
        }
        blackKeys.append(cell);
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
        noteCell.setAttribute("colspan", "3");
        noteCell.setAttribute("style", "border: 1px solid black;");
        noteCell.addEventListener("click", (e:Event) => playPianoNote(pianoNote));
        whiteKeys.appendChild(noteCell);
    });
piano.appendChild(whiteKeys);