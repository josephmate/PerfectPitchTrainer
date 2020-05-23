var GuitarNote = /** @class */ (function () {
    function GuitarNote(guitarString, fretNumber, absoluteNote) {
        this.guitarString = guitarString;
        this.fretNumber = fretNumber;
        this.absoluteNote = absoluteNote;
    }
    return GuitarNote;
}());
function increaseGuitarPitch(guitarNote) {
    return new GuitarNote(guitarNote.guitarString, guitarNote.fretNumber + 1, increasePitch(guitarNote.absoluteNote));
}
function addNotesFromFret(guitarString, startNote, startOctave) {
    var currentString = new GuitarNote(guitarString, 0, new AbsoluteNote(startNote, startOctave));
    var result = [];
    result.push(currentString);
    for (var i = 0; i < 13; i++) {
        currentString = increaseGuitarPitch(currentString);
        result.push(currentString);
    }
    return result;
}
// I cannot be compressed into a loop because the absolute pitch names follow a complex pattern,
// that's difficult to enumerate. For now
var guitarNotes = []
    .concat(addNotesFromFret("E1", NOTES.E, 4))
    .concat(addNotesFromFret("B", NOTES.B, 3))
    .concat(addNotesFromFret("G", NOTES.G, 3))
    .concat(addNotesFromFret("D", NOTES.D, 3))
    .concat(addNotesFromFret("A", NOTES.A, 2))
    .concat(addNotesFromFret("E2", NOTES.E, 2));
var guitar = document.getElementById("guitar");
function playGuitarNote(guitarString, fretNumber) {
    new Audio('notes/' + guitarString + '-Fret' + fretNumber + '.mp3').play();
}
var _loop_1 = function (guitarString) {
    var guitarStringRow = document.createElement("tr");
    // create an empty cell
    guitarStringRow.appendChild(document.createElement("td"));
    var _loop_2 = function (guitarNote) {
        var noteCell = document.createElement("td");
        noteCell.setAttribute("style", "border: 1px solid black;");
        var notePlayButton = void 0;
        if (guitarNote.fretNumber <= 5) {
            notePlayButton = document.createElement("button");
            notePlayButton.addEventListener("click", function (e) { return playGuitarNote(guitarString, guitarNote.fretNumber); });
        }
        else {
            notePlayButton = document.createElement("div");
        }
        notePlayButton.innerHTML = displayName(guitarNote.absoluteNote);
        noteCell.appendChild(notePlayButton);
        guitarStringRow.appendChild(noteCell);
    };
    for (var _i = 0, _a = guitarNotes.filter(function (guitarNote) { return guitarNote.guitarString == guitarString; }); _i < _a.length; _i++) {
        var guitarNote = _a[_i];
        _loop_2(guitarNote);
    }
    guitar.appendChild(guitarStringRow);
};
for (var _i = 0, _a = ['E1', 'B', 'G', 'D', 'A', "E2"]; _i < _a.length; _i++) {
    var guitarString = _a[_i];
    _loop_1(guitarString);
}
