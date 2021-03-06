
let SETTING_NUMBER_OF_TESTS_NOTES = "numberOfTestNotes";
let DEFAULT_NUMBER_OF_NOTES = 2;

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
let noteLearningOrder = [
    NOTES["C"],
    NOTES["F#"],  // distance of 6
    NOTES["D#"],  // distance of 3
    NOTES["A"],   // distance of 3
    NOTES["C#"],   // distance of 1 and 2
    NOTES["G#"],   // distance of 1 and 2
    NOTES["E"],   // distance of 1 and 2
    NOTES["A#"],   // distance of 1 and 2
    NOTES["D"],   // distance of 1 and 1
    NOTES["G"],   // distance of 1 and 1
    NOTES["F"],   // distance of 1 and 1
    NOTES["B"],   // distance of 1 and 1
];
var numOfNotes: number = DEFAULT_NUMBER_OF_NOTES;
var rights: number = 0;
var wrongs: number = 0;


function computeEnabledNotes(): Array<boolean> {
    let result = [];
    for(var i = 0; i < noteLearningOrder.length; i++) {
        result[noteLearningOrder[i].rank] = i < numOfNotes;
    }
    return result;
}

function calculateNoteString(): string {
    let enabledNotes = computeEnabledNotes();
    let notesToWrite = [];
    for(var i = 0; i < enabledNotes.length; i++) {
        if(enabledNotes[i]){
            notesToWrite.push(notesByRank[i].name);
        }
    }
    var result = "";
    for(var i = 0; i < notesToWrite.length; i++) {
        if(i > 0) {
            result += ", ";
        }
        if(i == notesToWrite.length -1) {
            result += " and ";
        }
        result += notesToWrite[i];
    }
    return result;
}

function updateStats() {
    document.getElementById("rightCount").innerText = rights + "";
    document.getElementById("wrongCount").innerText = wrongs + "";
    document.getElementById("percent").innerText = calcPercentString(rights, rights + wrongs);
}

function resetStats() {
    rights = 0;
    wrongs = 0;
    updateStats();
}

function incrementRights() {
    rights++;
    incrementDailyRights(numOfNotes);
}

function incrementWrongs() {
    wrongs++;
    incrementDailyWrongs(numOfNotes);
}

function testModeGuessCallBack(right: boolean) {
    if(right) {
        incrementRights();
        if(rights >= 10 && rights / (rights + wrongs) > 0.9) {
            addANote();
        } else if(rights >= 10 && rights / (rights + wrongs) < 0.5) {
            removeANote();
        }
    } else {
        incrementWrongs();
    }
    updateStats();
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
function addANote(): boolean {
    if(numOfNotes < 12) {
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
    if(numOfNotes > 2) {
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

function loadTestModeSettings() {
    let numberOfTestNotes = loadNumber(SETTING_NUMBER_OF_TESTS_NOTES);
    if (numberOfTestNotes != undefined) {
        numOfNotes = numberOfTestNotes;
    } else {
        saveNumber(SETTING_NUMBER_OF_TESTS_NOTES, numOfNotes);
    }
}

loadTestModeSettings();