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

let blackKeys = document.createElement("tr");
let whiteKeys = document.createElement("tr");
pianoNotes.forEach((pianoNote, index) => {
    let noteCell = document.createElement("td");
    let notePlayButton = document.createElement("div");
    notePlayButton.innerHTML = displayName(pianoNote);
    noteCell.appendChild(notePlayButton);
    whiteKeys.appendChild(noteCell);
});
piano.appendChild(blackKeys);
piano.appendChild(whiteKeys);