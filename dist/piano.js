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
var blackKeys = document.createElement("tr");
var whiteKeys = document.createElement("tr");
pianoNotes.forEach(function (pianoNote, index) {
    var noteCell = document.createElement("td");
    var notePlayButton = document.createElement("div");
    notePlayButton.innerHTML = displayName(pianoNote);
    noteCell.appendChild(notePlayButton);
    whiteKeys.appendChild(noteCell);
});
piano.appendChild(blackKeys);
piano.appendChild(whiteKeys);
