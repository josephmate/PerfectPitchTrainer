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
function isSame(note, randomNote) {
    return randomNote.absoluteNote.note.rank === note.rank;
}
function clearStatuses() {
    var statusSpans = document.getElementsByClassName("guessStatus");
    for (var i = 0; i < statusSpans.length; i++) {
        var statusSpan = statusSpans[i];
        statusSpan.innerHTML = "";
    }
}
function guess(note, statusSpan) {
    if (isSame(note, currentRandomNote)) {
        statusSpan.innerText = ", was correct!";
        var topStatusSpan = document.getElementById("statusSpan");
        topStatusSpan.innerText = "Previous note was " + displayName(currentRandomNote.absoluteNote);
        currentRandomNote = randomNote();
        playRandomNote();
        setTimeout(function () {
            clearStatuses();
        }, 2000);
    }
    else {
        statusSpan.innerText = ", is not the correct note.";
    }
}
var guesses = document.getElementById("guesses");
notesByRank.forEach(function (note) {
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    var statusSpan = document.createElement("span");
    statusSpan.className = "guessStatus";
    button.innerText = note.name;
    button.addEventListener("click", function (e) { return guess(note, statusSpan); });
    listItem.appendChild(button);
    listItem.appendChild(statusSpan);
    guesses.appendChild(listItem);
});
