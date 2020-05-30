

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
var numOfNotes = 2;

function computeEnabledNotes(): Array<boolean> {
    let result = [];
    for(var i = 0; i < noteLearningOrder.length; i++) {
        result[noteLearningOrder[i].rank] = i < numOfNotes;
    }
    return result;
}

function enableTestMode() {
    disableFreeMode();
    document.getElementById("mode").innerText = "Test";
    document.getElementById("testModeSettingsDiv").hidden = false;
    document.getElementById("testExplanation").hidden = false;
    applySettings(computeEnabledNotes());
}

function disableTestMode() {
    document.getElementById("testModeSettingsDiv").hidden = true;
    document.getElementById("testExplanation").hidden = true;
}