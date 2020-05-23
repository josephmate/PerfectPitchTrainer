function generatePianoNotes(startNote, endNote) {
    var result = [];
    var currentNote = startNote;
    while (true) {
        result.push(currentNote);
        if (currentNote.equals(endNote)) {
            break;
        }
        currentNote = increasePitch(currentNote);
    }
    return result;
}
var pianoNotes = generatePianoNotes(new AbsoluteNote(NOTES.E, 2), new AbsoluteNote(NOTES.C, 4));
function isNextNoteSharp(notes, index) {
    return false;
}
function playPianoNote(absoluteNote) {
    new Audio('notes/piano/' + encodeURIComponent(absoluteNote.note.name) + absoluteNote.octave + '.mp3').play();
}
var piano = document.getElementById("piano");
// Assume we always start from a white key.
if (pianoNotes[0].note.isSharp) {
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
var blackKeys = document.createElement("tr");
var colspan = 1;
pianoNotes
    .forEach(function (pianoNote, index) {
    var cell = document.createElement("td");
    if (!pianoNote.note.isSharp) {
        var colspan_1;
        if (index == pianoNotes.length - 1) {
            if (pianoNotes[index - 1].note.isSharp) {
                colspan_1 = "2";
            }
            else {
                colspan_1 = "3";
            }
        }
        else if (pianoNotes[index + 1].note.isSharp) {
            if (index == 0) {
                colspan_1 = "2";
            }
            else {
                if (pianoNotes[index - 1].note.isSharp) {
                    colspan_1 = "1";
                }
                else {
                    colspan_1 = "2";
                }
            }
        }
        else {
            if (index == 0) {
                colspan_1 = "3";
            }
            else {
                colspan_1 = "2";
            }
        }
        cell.setAttribute("colspan", colspan_1);
        cell.appendChild(document.createElement("div"));
    }
    else {
        var notePlayButton = document.createElement("div");
        cell.setAttribute("colspan", "2");
        notePlayButton.setAttribute("style", "border: 1px solid black; color:white; background-color:black");
        notePlayButton.innerHTML = displayName(pianoNote);
        cell.addEventListener("click", function (e) { return playPianoNote(pianoNote); });
        cell.appendChild(notePlayButton);
    }
    blackKeys.append(cell);
});
piano.appendChild(blackKeys);
var whiteKeys = document.createElement("tr");
pianoNotes
    .filter(function (pianoNote) { return !pianoNote.note.isSharp; })
    .forEach(function (pianoNote, index) {
    var noteCell = document.createElement("td");
    var notePlayButton = document.createElement("div");
    notePlayButton.innerHTML = displayName(pianoNote);
    noteCell.appendChild(notePlayButton);
    noteCell.setAttribute("colspan", "3");
    noteCell.setAttribute("style", "border: 1px solid black;");
    noteCell.addEventListener("click", function (e) { return playPianoNote(pianoNote); });
    whiteKeys.appendChild(noteCell);
});
piano.appendChild(whiteKeys);
