var SETTING_NUMBER_OF_TESTS_NOTES = "numberOfTestNotes";
var DEFAULT_NUMBER_OF_NOTES = 2;
/**
 * String array will record the dates with stats:
 * [ "YYYY-MM-DD-NUMOFNOTES" ... "YYYY-MM-DD-NUMOFNOTES" ]
 *
 * Then localStorage will look like
 * save(YYYY-MM-DD-NUMOFNOTES",
 *     "{rights: 1,
 *      wrongs: 2}""
 * );
 */
var DailyStats = /** @class */ (function () {
    function DailyStats(rights, wrongs) {
        this.rights = rights;
        this.wrongs = wrongs;
    }
    return DailyStats;
}());
/**
 * I want to put as much distance between the notes to make them easier to learn.
 * That way added a new note is incrementally harder.
 * For instance, I believe it should be able to identifier the difference between
 * C and F versus C and C#.
 *
 * C    0-----
 * C#   1 \  3\
 * D    2  |  /
 * D#   3 6|--
 * E    4  |  \
 * F    5 /  3/
 * F#   6-----
 * G    7 \  3\
 * G#   8  |  /
 * A    9 6|--
 * A#  10  |  \
 * B   11 /  3/
 * C    0-----
 */
var noteLearningOrder = [
    NOTES["C"],
    NOTES["F#"],
    NOTES["D#"],
    NOTES["A"],
    NOTES["C#"],
    NOTES["G#"],
    NOTES["E"],
    NOTES["A#"],
    NOTES["D"],
    NOTES["G"],
    NOTES["F"],
    NOTES["B"],
];
var numOfNotes = DEFAULT_NUMBER_OF_NOTES;
var rights = 0;
var wrongs = 0;
function computeEnabledNotes() {
    var result = [];
    for (var i = 0; i < noteLearningOrder.length; i++) {
        result[noteLearningOrder[i].rank] = i < numOfNotes;
    }
    return result;
}
function calculateNoteString() {
    var enabledNotes = computeEnabledNotes();
    var notesToWrite = [];
    for (var i = 0; i < enabledNotes.length; i++) {
        if (enabledNotes[i]) {
            notesToWrite.push(notesByRank[i].name);
        }
    }
    var result = "";
    for (var i = 0; i < notesToWrite.length; i++) {
        if (i > 0) {
            result += ", ";
        }
        if (i == notesToWrite.length - 1) {
            result += " and ";
        }
        result += notesToWrite[i];
    }
    return result;
}
function updateStats() {
    document.getElementById("rightCount").innerText = rights + "";
    document.getElementById("wrongCount").innerText = wrongs + "";
    document.getElementById("percent").innerText = calcPercent(rights, rights + wrongs);
}
function resetStats() {
    rights = 0;
    wrongs = 0;
    updateStats();
}
function formatTwoDigits(num) {
    if (num <= 9) {
        return "0" + num;
    }
    return "" + num;
}
function currentDateAsString() {
    var currentDate = new Date();
    return currentDate.getFullYear() + "-" + formatTwoDigits(currentDate.getMonth()) + "-" + formatTwoDigits(currentDate.getDay());
}
function getDailyStatPosition() {
    return "DailyStats:" + currentDateAsString() + ":Notes:" + numOfNotes;
}
function incrementRights() {
    rights++;
    var prevDailyStats = loadDailyStats(getDailyStatPosition());
    if (prevDailyStats == undefined) {
        prevDailyStats = new DailyStats(0, 0);
    }
    saveDailyStats(getDailyStatPosition(), new DailyStats(prevDailyStats.rights + 1, prevDailyStats.wrongs));
}
function incrementWrongs() {
    wrongs++;
    var prevDailyStats = loadDailyStats(getDailyStatPosition());
    if (prevDailyStats == undefined) {
        prevDailyStats = new DailyStats(0, 0);
    }
    saveDailyStats(getDailyStatPosition(), new DailyStats(prevDailyStats.rights, prevDailyStats.wrongs + 1));
}
function testModeGuessCallBack(right) {
    if (right) {
        incrementRights();
        if (rights >= 10 && rights / (rights + wrongs) > 0.9) {
            addANote();
        }
        else if (rights >= 10 && rights / (rights + wrongs) < 0.5) {
            removeANote();
        }
    }
    else {
        incrementWrongs();
    }
    updateStats();
}
function calcPercent(numerator, denominator) {
    if (denominator == 0) {
        return "N/A";
    }
    else {
        return 100 * numerator / denominator + "%";
    }
}
function enableTestMode() {
    disableFreeMode();
    document.getElementById("mode").innerText = "Test";
    document.getElementById("testModeSettingsDiv").hidden = false;
    document.getElementById("testExplanation").hidden = false;
    document.getElementById("todaysStats").hidden = false;
    document.getElementById("testNotes").innerText = calculateNoteString();
    updateStats();
    guessCallback = testModeGuessCallBack;
    applySettings(computeEnabledNotes());
}
function disableTestMode() {
    document.getElementById("testModeSettingsDiv").hidden = true;
    document.getElementById("testExplanation").hidden = true;
    document.getElementById("todaysStats").hidden = true;
    guessCallback = undefined;
}
/**
 * Adds a note if there are more notes available.
 */
function addANote() {
    if (numOfNotes < 12) {
        numOfNotes++;
        saveNumber(SETTING_NUMBER_OF_TESTS_NOTES, numOfNotes);
        resetStats();
        enableTestMode();
        // new note was added
        return true;
    }
    // new note was not added
    return false;
}
/**
 * Removes a note if there are more than two notes.
 */
function removeANote() {
    if (numOfNotes > 2) {
        numOfNotes--;
        saveNumber(SETTING_NUMBER_OF_TESTS_NOTES, numOfNotes);
        resetStats();
        enableTestMode();
        // new note was removed
        return true;
    }
    // new note was not removed
    return false;
}
function loadTestModeDailyStats() {
    var numberOfTestNotes = loadNumber(SETTING_NUMBER_OF_TESTS_NOTES);
    if (numberOfTestNotes != undefined) {
        numOfNotes = numberOfTestNotes;
    }
    else {
        saveNumber(SETTING_NUMBER_OF_TESTS_NOTES, numOfNotes);
    }
}
loadTestModeDailyStats();
