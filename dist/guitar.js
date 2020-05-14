var Note;
(function (Note) {
    Note[Note["C"] = 0] = "C";
    Note[Note["C_SHARP"] = 1] = "C_SHARP";
    Note[Note["D"] = 2] = "D";
    Note[Note["D_SHARP"] = 3] = "D_SHARP";
    Note[Note["E"] = 4] = "E";
    Note[Note["F"] = 5] = "F";
    Note[Note["F_SHARP"] = 6] = "F_SHARP";
    Note[Note["G"] = 7] = "G";
    Note[Note["G_SHARP"] = 8] = "G_SHARP";
    Note[Note["A"] = 9] = "A";
    Note[Note["A_SHARP"] = 10] = "A_SHARP";
    Note[Note["B"] = 11] = "B";
})(Note || (Note = {}));
var AbsoluteNote = /** @class */ (function () {
    function AbsoluteNote(note, octave) {
        this.note = note;
        this.octave = octave;
    }
    return AbsoluteNote;
}());
var GuitarNote = /** @class */ (function () {
    function GuitarNote(guitarString, fretNumber, absoluteNote) {
        this.guitarString = guitarString;
        this.fretNumber = fretNumber;
        this.absoluteNote = absoluteNote;
    }
    return GuitarNote;
}());
function increasePitch(guitarNote) {
    if (guitarNote.absoluteNote.note == Note.B) {
        return new GuitarNote(guitarNote.guitarString, guitarNote.fretNumber + 1, new AbsoluteNote(Note.C, guitarNote.absoluteNote.octave + 1));
    }
    return new GuitarNote(guitarNote.guitarString, guitarNote.fretNumber + 1, 
    // https://stackoverflow.com/questions/39427542/how-do-i-access-typescript-enum-by-ordinal
    new AbsoluteNote(Note[Note[guitarNote.absoluteNote.note + 1]], guitarNote.absoluteNote.octave));
}
function addNotesFromFret(guitarString, startNote, startOctave) {
    var currentString = new GuitarNote(guitarString, 0, new AbsoluteNote(startNote, startOctave));
    var result = [];
    result.push(currentString);
    for (var i = 0; i < 13; i++) {
        currentString = increasePitch(currentString);
        result.push(currentString);
    }
    return result;
}
// I cannot be compressed into a loop because the absolute pitch names follow a complex pattern,
// that's difficult to enumerate. For now
var guitarNotes = []
    .concat(addNotesFromFret("E1", Note.E, 4))
    .concat(addNotesFromFret("B", Note.B, 3))
    .concat(addNotesFromFret("G", Note.G, 3))
    .concat(addNotesFromFret("D", Note.D, 3))
    .concat(addNotesFromFret("A", Note.A, 2))
    .concat(addNotesFromFret("E2", Note.E, 2));
var noteToStringMap = {};
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
function displayName(absoluteNote) {
    return noteToStringMap[absoluteNote.note] + " " + absoluteNote.octave;
}
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
        var notePlayButton = document.createElement("button");
        notePlayButton.addEventListener("click", function (e) { return playGuitarNote(guitarString, guitarNote.fretNumber); });
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
