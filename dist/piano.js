function generatePianoNotes(startNote, endNote) {
    var result = [];
    var currentNote = startNote;
    while (!currentNote.equals(endNote)) {
        result.push(currentNote);
        currentNote = increasePitch(currentNote);
    }
    return result;
}
var pianoNotes = generatePianoNotes(new AbsoluteNote(NOTES.E, 2), new AbsoluteNote(NOTES.A, 4));
function isNextNoteSharp(notes, index) {
    return false;
}
var piano = document.getElementById("piano");
// Example starting from middle C4
// Cell Splits | | | | | | | | | | | | |  |
// Row 1:      |   | C#| |D# |       | F#|
// Row 2:      | C   |  D  | E   | F   |
var blackKeys = document.createElement("tr");
pianoNotes
    .filter(function (pianoNote) { return pianoNote.note.isSharp; })
    .forEach(function (pianoNote, index) {
    var noteCell = document.createElement("td");
    var notePlayButton = document.createElement("div");
    notePlayButton.setAttribute("style", "color:white; background-color:black");
    notePlayButton.innerHTML = displayName(pianoNote);
    noteCell.appendChild(notePlayButton);
    blackKeys.appendChild(noteCell);
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
    whiteKeys.appendChild(noteCell);
});
piano.appendChild(whiteKeys);
