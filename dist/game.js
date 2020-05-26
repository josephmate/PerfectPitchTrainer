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
// map of note rank to the checkbox that enables it
var freeModeNoteSettings = [];
// prepare the guess settings
var freeModeSettingsList = document.getElementById("freeModeSettingsList");
notesByRank.forEach(function (note) {
    var listItem = document.createElement("li");
    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;
    freeModeNoteSettings[note.rank] = check;
    listItem.appendChild(check);
    var span = document.createElement("span");
    span.innerText = note.name;
    listItem.appendChild(span);
    freeModeSettingsList.appendChild(listItem);
});
function getEnabledNotes() {
    var result = [];
    freeModeNoteSettings.forEach(function (value, index) {
        if (value.checked) {
            result.push(notesByRank[index]);
        }
    });
    return result;
}
function getNotesByRankEnabledMap() {
    var enabledNotes = {};
    freeModeNoteSettings.forEach(function (value, index) {
        if (value.checked) {
            enabledNotes[index] = true;
        }
        else {
            false;
        }
    });
    return enabledNotes;
}
function getFilteredGuitarNotes() {
    var enabledNotes = getNotesByRankEnabledMap();
    var result = [];
    guitarNotes.forEach(function (guitarNote) {
        if (enabledNotes[guitarNote.absoluteNote.note.rank]) {
            result.push(guitarNote);
        }
    });
    return result;
}
function getFilteredPianoNotes() {
    var enabledNotes = getNotesByRankEnabledMap();
    var result = [];
    pianoNotes.forEach(function (pianoNote) {
        if (enabledNotes[pianoNote.note.rank]) {
            result.push(pianoNote);
        }
    });
    return result;
}
function randomNote() {
    var filteredGuitarNotes = getFilteredGuitarNotes();
    var filteredPianoNotes = getFilteredPianoNotes();
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
var currentRandomNote = randomNote();
function playRandomNote() {
    new Audio(currentRandomNote.filepath).play();
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
function applyFreeModeSettings() {
    guesses.innerHTML = "";
    getEnabledNotes().forEach(function (note) {
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
    currentRandomNote = randomNote();
}
// prepare the guess buttons
applyFreeModeSettings();
