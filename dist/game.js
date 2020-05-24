var RandomNote = /** @class */ (function () {
    function RandomNote(filepath, absoluteNote) {
        this.filepath = filepath;
        this.absoluteNote = absoluteNote;
    }
    return RandomNote;
}());
function randomInteger(lowerBound, upperbound) {
    return Math.floor(Math.random() * (upperbound - lowerBound)) + lowerBound;
}
function randomNote() {
    var totalNotes = guitarNotes.length + pianoNotes.length;
    var randomIndex = randomInteger(0, totalNotes - 1);
    if (randomIndex < guitarNotes.length) {
        var guitarIndex = randomIndex;
        var guitarNote = guitarNotes[guitarIndex];
        return new RandomNote(getGuitarFilepath(guitarNote), guitarNote.absoluteNote);
    }
    else {
        var pianoIndex = randomIndex - guitarNotes.length;
        var pianoNote = pianoNotes[pianoIndex];
        return new RandomNote(getPianoFilepath(pianoNote), pianoNote);
    }
}
var currentRandomNote = randomNote();
function playRandomNote() {
    new Audio(currentRandomNote.filepath).play();
}
