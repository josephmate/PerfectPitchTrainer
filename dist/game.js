var RandomNote = /** @class */ (function () {
    function RandomNote(filepath, absoluteNote) {
        this.filepath = filepath;
        this.absoluteNote = absoluteNote;
    }
    return RandomNote;
}());
/**
 * Returns a random integer from the set [lowerBound, upperBound].
 *
 * @param lowerBound inclusive
 * @param upperbound inclusive
 */
function randomInteger(lowerBound, upperbound) {
    return Math.floor(Math.random() * (upperbound + 1 - lowerBound)) + lowerBound;
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
function getFilteredGuitarNotes(note) {
    var result = [];
    guitarNotes.forEach(function (guitarNote) {
        if (note.rank == guitarNote.absoluteNote.note.rank) {
            result.push(guitarNote);
        }
    });
    return result;
}
function getFilteredPianoNotes(note) {
    var result = [];
    pianoNotes.forEach(function (pianoNote) {
        if (note.rank == pianoNote.note.rank) {
            result.push(pianoNote);
        }
    });
    return result;
}
function calculateRandomNote(enabledNotes) {
    var notesToPullFrom = [];
    notesByRank.forEach(function (noteByRank) {
        if (enabledNotes[noteByRank.rank]) {
            notesToPullFrom.push(noteByRank);
        }
    });
    var randomIndex = randomInteger(0, notesToPullFrom.length - 1);
    return notesToPullFrom[randomIndex];
}
var gameNoteEnableMap;
function randomNoteImpl() {
    if (!gameNoteEnableMap) {
        throw "gameNoteEnableMap not set yet!";
    }
    var randomNote = calculateRandomNote(gameNoteEnableMap);
    var filteredGuitarNotes = getFilteredGuitarNotes(randomNote);
    var filteredPianoNotes = getFilteredPianoNotes(randomNote);
    var totalNotes = filteredGuitarNotes.length + filteredPianoNotes.length;
    var randomIndex = randomInteger(0, totalNotes - 1);
    if (randomIndex < filteredGuitarNotes.length) {
        var guitarIndex = randomIndex;
        var guitarNote = filteredGuitarNotes[guitarIndex];
        return new RandomNote(getGuitarFilepath(guitarNote), guitarNote.absoluteNote);
    }
    else {
        var pianoIndex = randomIndex - filteredGuitarNotes.length;
        var pianoNote = filteredPianoNotes[pianoIndex];
        return new RandomNote(getPianoFilepath(pianoNote), pianoNote);
    }
}
var randomnessTracker = {};
function randomNote() {
    var randomNote = randomNoteImpl();
    var currentStat = randomnessTracker[randomNote.absoluteNote.note.name];
    if (!currentStat) {
        randomnessTracker[randomNote.absoluteNote.note.name] = 0;
    }
    randomnessTracker[randomNote.absoluteNote.note.name]++;
    console.info(JSON.stringify(randomnessTracker));
    return randomNote;
}
var currentRandomNote;
function playRandomNote() {
    new Audio(currentRandomNote.filepath).play();
}
var guessCallback;
function guess(note, statusSpan) {
    if (isSame(note, currentRandomNote)) {
        statusSpan.innerText = ", was correct!";
        var topStatusSpan = document.getElementById("statusSpan");
        topStatusSpan.innerText = "Previous note was " + displayName(currentRandomNote.absoluteNote);
        currentRandomNote = randomNote();
        if (guessCallback) {
            guessCallback(true);
        }
        playRandomNote();
        setTimeout(function () {
            clearStatuses();
        }, 2000);
    }
    else {
        statusSpan.innerText = ", is not the correct note.";
        guessCallback(false);
    }
}
var guesses = document.getElementById("guesses");
function applySettings(enabledNotes) {
    guesses.innerHTML = "";
    notesByRank.forEach(function (note) {
        if (enabledNotes[note.rank]) {
            var listItem = document.createElement("li");
            var button = document.createElement("button");
            var statusSpan_1 = document.createElement("span");
            statusSpan_1.className = "guessStatus";
            button.innerText = note.name;
            button.addEventListener("click", function (e) { return guess(note, statusSpan_1); });
            listItem.appendChild(button);
            listItem.appendChild(statusSpan_1);
            guesses.appendChild(listItem);
        }
    });
    gameNoteEnableMap = enabledNotes;
    currentRandomNote = randomNote();
}
