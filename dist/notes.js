var Note = /** @class */ (function () {
    function Note(name, isSharp, rank) {
        this.name = name;
        this.isSharp = isSharp;
        this.rank = rank;
    }
    return Note;
}());
var notesByRank = [
    new Note("C", false, 0),
    new Note("C#", true, 1),
    new Note("D", false, 2),
    new Note("D#", true, 3),
    new Note("E", false, 4),
    new Note("F", false, 5),
    new Note("F#", true, 6),
    new Note("G", false, 7),
    new Note("G#", true, 8),
    new Note("A", false, 9),
    new Note("A#", true, 10),
    new Note("B", false, 11),
];
var NOTES = {
    "C": notesByRank[0],
    "C#": notesByRank[1],
    "D": notesByRank[2],
    "D#": notesByRank[3],
    "E": notesByRank[4],
    "F": notesByRank[5],
    "F#": notesByRank[6],
    "G": notesByRank[7],
    "G#": notesByRank[8],
    "A": notesByRank[9],
    "A#": notesByRank[10],
    "B": notesByRank[11]
};
var AbsoluteNote = /** @class */ (function () {
    function AbsoluteNote(note, octave) {
        this.note = note;
        this.octave = octave;
    }
    AbsoluteNote.prototype.equals = function (other) {
        return this.note.rank == other.note.rank
            && this.octave == other.octave;
    };
    return AbsoluteNote;
}());
function increasePitch(absoluteNote) {
    if (absoluteNote.note.rank == 11) {
        return new AbsoluteNote(notesByRank[0], absoluteNote.octave + 1);
    }
    return new AbsoluteNote(notesByRank[absoluteNote.note.rank + 1], absoluteNote.octave);
}
function displayName(absoluteNote) {
    return absoluteNote.note.name + " " + absoluteNote.octave;
}
