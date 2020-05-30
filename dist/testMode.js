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
var numOfNotes = 2;
var rights = 0;
var wrongs = 0;
function computeEnabledNotes() {
    var result = [];
    for (var i = 0; i < noteLearningOrder.length; i++) {
        result[noteLearningOrder[i].rank] = i < numOfNotes;
    }
    return result;
}
function updateStats() {
    document.getElementById("rightCount").innerText = rights + "";
    document.getElementById("wrongCount").innerText = wrongs + "";
    document.getElementById("percent").innerText = calcPercent(rights, rights + wrongs);
}
function testModeGuessCallBack(right) {
    if (right) {
        rights++;
    }
    else {
        wrongs++;
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
